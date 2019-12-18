import path from 'path';
import YAML from 'js-yaml-parser';
import {get, fetchTree} from 'gitea-react-toolkit';
import usfmJS from 'usfm-js';

export const getTree = async ({username, languageId, resourceId, tag, config}) => {
  let tree = [];
  let moreData = true;
  let page = 0;
  while (moreData) {
    const params = {
      recursive: true,
      per_page: 10000,
      page,
    };
    const _config = {...config, params};
    const repository = `${languageId}_${resourceId}`;
    let data = await fetchTree({owner: username, repository, sha: tag, config: _config});
    if (data.truncated) {
      const _tree = data.tree.map(blob => {
        let file = () => get({url: blob.url, config});
        let _blob = {...blob, file};
        return _blob;
      });
      tree = tree.concat(data.tree);
      page ++;
    } 
    else moreData = false;
  }
  return tree;
};

export const resourcesFromResourceLinks = async ({resourceLinks, reference, config}) => {
  const promises = resourceLinks.map(resourceLink => {
    return resourceFromResourceLink({ resourceLink, reference, config });
  });
  const resources = await Promise.all(promises);
  return resources;
};

export const resourceFromResourceLink = async ({ resourceLink, reference, config }) => {
  let resource = parseResourceLink({ resourceLink, config });
  resource.manifest = await getResourceManifest(resource);
  if (reference) resource.reference = reference;
  resource.projects = resource.manifest.projects.map(project => extendProject({project, resource}));
  if ((resource.projectId || reference.bookId) && (resource.manifest && resource.manifest.projects)) {
    resource.project = projectFromProjects(resource);
  }
  return resource;
};

export const parseResourceLink = ({ resourceLink, config }) => {
  const parsed = resourceLink.split('/').filter(string => string.length > 0);
  const [username, languageId, resourceId, tag, projectId] = parsed;
  const resource = { resourceLink, username, languageId, resourceId, tag, projectId, config };
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

export const projectFromProjects = (resource) => {
  const { reference, projectId, projects } = resource;
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
