import Path from 'path';
import YAML from 'js-yaml-parser';
import {get} from 'gitea-react-toolkit';
import usfmJS from 'usfm-js';

export const resourcesFromResourceLinks = async ({resourceLinks, reference, config}) => {
  const promises = resourceLinks.map(resourceLink => {
    return resourceFromResourceLink({resourceLink, reference, config});
  });
  const resources = await Promise.all(promises);
  return resources;
};

export const resourceFromResourceLink = async ({resourceLink, reference, config}) => {
  let resource = parseResourceLink({resourceLink, config});
  resource.manifest = await getResourceManifest(resource);
  resource.reference = reference;
  if ((resource.projectId || reference.bookId) && (resource.manifest && resource.manifest.projects)) {
    resource.project = projectFromProjects(resource);
  }
  return resource;
};

export const parseResourceLink = ({resourceLink, config}) => {
  const parsed = resourceLink.split('/').filter(string => string.length > 0);
  const [username, languageId, resourceId, tag, projectId] = parsed;
  const resource = {resourceLink, username, languageId, resourceId, tag, projectId, config};
  return resource;
};

export const getResourceManifest = async ({username, languageId, resourceId, tag, config}) => {
  const repository = `${languageId}_${resourceId}`;
  const path = 'manifest.yaml';
  const yaml = await getFile({username, repository, path, tag, config});
  const json = (yaml) ? YAML.safeLoad(yaml) : null;
  return json;
};

export const getResourceProjectFile = async (
  {username, languageId, resourceId, tag, project: {path}, config}
) => {
  const repository = `${languageId}_${resourceId}`;
  const file = await getFile({username, repository, path, tag, config});
  return file;
};

export const projectFromProjects = (resource) => {
  const {resourceLink, reference, projectId, manifest: {projects}} = resource;
  let identifier = (reference && reference.bookId) ? reference.bookId : projectId;
  const project = projects.filter(project => project.identifier === identifier)[0];
  project.file = async () => getResourceProjectFile(resource);
  if (project.path.match(/\.usfm$/)) {
    project.json = async () => {
      const start = performance.now();
      const chapter = parseChapter({project, reference});
      const end = performance.now();
      console.log(`fetch & parse ${resourceLink} ${identifier}: ${(end - start).toFixed(3)}ms`);
      return chapter;
    };
  }
  return project;
};

export const parseChapter = async ({project, reference}) => {
  const usfm = await project.file();
  const thisChapter = parseInt(reference.chapter);
  const nextChapter = thisChapter + 1;
  const regexpString = '(\\\\c\\s*'+ thisChapter +'\n(.*?\n?)*?)(?:\\\\c\\s*'+ nextChapter +'\n)(?:$)?';
  const regexp = new RegExp(regexpString, 'm');
  const matches = usfm.match(regexp);
  const chapter = matches[1];
  const json = usfmJS.toJSON(chapter);
  return json;
};

// https://git.door43.org/unfoldingword/en_ult/raw/branch/master/manifest.yaml
export const getFile = async ({username, repository, path, tag, config}) => {
  let url;
  if (tag && tag !== 'master')
    url = Path.join(username, repository, 'raw/tag', tag, path);
  else
    url = Path.join(username, repository, 'raw/branch/master', path);
  try {
    const _config = {...config}; // prevents gitea-react-toolkit from modifying object
    const data = await get({url, config: _config});
    return data;
  }
  catch(error) {
    console.error(error);
    return null;
  }
};
