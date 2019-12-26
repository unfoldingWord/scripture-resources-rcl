import path from 'path';
import YAML from 'js-yaml-parser';
import {get, getFullTree} from 'gitea-react-toolkit';
import usfmJS from 'usfm-js';

export const resourcesFromResourceLinks = async ({resourceLinks, reference, config}) => {
  const promises = resourceLinks.map(resourceLink => {
    return resourceFromResourceLink({ resourceLink, reference, config });
  });
  const resources = await Promise.all(promises);
  return resources;
};

export const resourceFromResourceLink = async ({ resourceLink, reference, config }) => {
  const resource = parseResourceLink({ resourceLink, config });
  const {projectId, username, repository, tag} = resource;
  const manifest = await getResourceManifest(resource);
  const projects = manifest.projects.map(project => extendProject({project, resource}));
  const project = projectFromProjects({reference, projectId, projects});
  const getTree = () => getFullTree({owner: username, repository, sha: tag, config});
  const _resource = {...resource, reference, manifest, projects, project, getTree};
  return _resource;
};

export const parseResourceLink = ({ resourceLink, config }) => {
  const parsed = resourceLink.split('/').filter(string => string.length > 0);
  const [username, languageId, resourceId, tag, projectId] = parsed;
  const repository = `${languageId}_${resourceId}`;
  const resource = { resourceLink, username, repository, languageId, resourceId, tag, projectId, config };
  return resource;
};

export const getResourceManifest = async ({ username, languageId, resourceId, tag, config }) => {
  const repository = `${languageId}_${resourceId}`;
  const path = 'manifest.yaml';
  const yaml = await getFile({ username, repository, path, tag, config });
  const json = (yaml) ? YAML.safeLoad(yaml) : null;
  return json;
};

export const getResourceProjectFile = async (
  { username, languageId, resourceId, tag, project: { path }, config }
) => {
  const repository = `${languageId}_${resourceId}`;
  const file = await getFile({ username, repository, path, tag, config });
  return file;
};

export const projectFromProjects = ({ reference, projectId, projects }) => {
  let identifier = (reference && reference.bookId) ? reference.bookId : projectId;
  const project = projects.filter(project => project.identifier === identifier)[0];
  return project;
};

export const extendProject = ({ project, resource }) => {
  let _project = { ...project };
  const { reference, projectId, resourceLink } = resource;
  _project.file = async () => getResourceProjectFile({ ...resource, project });
  if (project.path.match(/\.usfm$/)) {
    _project.json = async () => {
      const start = performance.now();
      let json;
      if (reference && reference.chapter) json = parseChapter({ project: _project, reference });
      else
        json = parseBook({ project: _project });
      const end = performance.now();
      let identifier = (reference && reference.bookId) ? reference.bookId : projectId;
      console.log(`fetch & parse ${resourceLink} ${identifier}: ${(end - start).toFixed(3)}ms`);
      return json;
    };
  }
  return _project;
};

export const parseBook = async ({ project }) => {
  const usfm = await project.file();
  const json = usfmJS.toJSON(usfm);
  return json;
};

export const parseChapter = async ({ project, reference }) => {
  const usfm = await project.file();
  const thisChapter = parseInt(reference.chapter);
  const nextChapter = thisChapter + 1;
  const regexpString = '(\\\\c\\s*' + thisChapter + '\\s*(.*?\n?)*?)(?:(\\\\c\\s*' + nextChapter + '|$))';
  const regexp = new RegExp(regexpString, '');
  const matches = usfm.match(regexp);
  const chapter = matches[1];
  const json = usfmJS.toJSON(chapter);
  return json;
};

// https://git.door43.org/unfoldingword/en_ult/raw/branch/master/manifest.yaml
export const getFile = async ({ username, repository, path: urlPath = '', tag, config }) => {
  let url;
  if (tag && tag !== 'master' && urlPath) {
    url = path.join(username, repository, 'raw/tag', tag, urlPath);
  }
  else {
    url = path.join(username, repository, 'raw/branch/master', urlPath);
  }
  try {
    const _config = { ...config }; // prevents gitea-react-toolkit from modifying object
    const data = await get({ url, config: _config });
    return data;
  }
  catch (error) {
    console.error(error);
    return null;
  }
};
