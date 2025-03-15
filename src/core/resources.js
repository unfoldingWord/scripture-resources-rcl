import path from 'path';
import YAML from 'js-yaml-parser';
import { decodeBase64ToUtf8, get } from 'gitea-react-toolkit';
import usfmJS from 'usfm-js';

export const resourcesFromResourceLinks = async ({
  resourceLinks,
  reference,
  config,
}) => {
  const promises = resourceLinks.map((resourceLink) =>
    resourceFromResourceLink({
      resourceLink,
      reference,
      config,
    }),
  );
  // Filter invalid resources (those that did not parse)
  const resources = await (await Promise.all(promises)).filter(
    (parsedResource) => parsedResource != null,
  );
  return resources;
};

export const resourceFromResourceLink = async ({
  resourceLink,
  reference,
  config,
}) => {
  let manifestHttpResponse = null;
  // Create a resource request ID for tracing
  const resourceRequestId = `res_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

  // Log the resource request
  console.log(`[${resourceRequestId}] 🔍 RESOURCE REQUEST:`, {
    resourceLink,
    reference,
    config: {
      server: config?.server,
      timeout: config?.timeout,
      // Don't log sensitive information
      token: config?.token ? '[REDACTED]' : undefined,
    },
    timestamp: new Date().toISOString(),
  });

  try {
    const resource = parseResourceLink({
      resourceLink,
      config,
      reference,
    });
    resource.fullResponse = true;
    const { manifest, response } = await getResourceManifest(resource);
    manifestHttpResponse = response;
    
    // Check if we got an error response from getResourceManifest
    if (response && response.error) {
      const errorDetails = {
        resourceRequestId,
        timestamp: new Date().toISOString(),
        type: 'manifest_fetch_error',
        status: response.status,
        statusText: response.statusText,
        message: response.message,
        resourceLink,
        requestId: response.requestId, // Include the original request ID if available
        request: {
          resourceLink,
          reference,
        },
        response: {
          ...response,
          // Don't include large data objects
          data: response.data ? '[DATA OBJECT]' : undefined,
        }
      };
      
      // Log the detailed error information
      console.group(`[${resourceRequestId}] 🔴 RESOURCE MANIFEST ERROR`);
      console.error(`Error fetching manifest: ${response.message || 'Unknown error'}`);
      console.error(`Resource Link: ${resourceLink}`);
      console.error(`Status: ${response.status || 'Unknown'}`);
      console.error(`Status Text: ${response.statusText || 'Unknown'}`);
      console.error('Complete error details:', errorDetails);
      console.groupEnd();
      
      return {
        manifestHttpResponse: response,
        error: true,
        errorDetails: {
          type: 'manifest_fetch_error',
          status: response.status,
          statusText: response.statusText,
          message: response.message,
          resourceLink,
          resourceRequestId,
          requestId: response.requestId // Include the original request ID
        }
      };
    }
    
    const projects = manifest.projects.map((project) =>
      extendProject({
        project,
        resource,
        reference,
      }),
    );
    const projectId = reference ? reference.projectId || reference.bookId : '';
    const project = await projectFromProjects({
      reference,
      projectId,
      projects,
    });
    const _resource = {
      ...resource,
      reference,
      manifest,
      projects,
      project,
      manifestHttpResponse,
    };
    
    // Log successful resource loading
    console.log(`[${resourceRequestId}] ✅ RESOURCE LOADED SUCCESSFULLY:`, {
      resourceLink,
      projectId,
      projectsCount: projects.length,
      timestamp: new Date().toISOString(),
    });
    
    return _resource;
  } catch (e) {
    const errorMessage =
      'scripture-resources-rcl: resources.js: Cannot load resource [' +
      resourceLink +
      ']';
    
    const errorDetails = {
      resourceRequestId,
      timestamp: new Date().toISOString(),
      type: 'resource_load_error',
      message: errorMessage,
      originalError: e.message,
      resourceLink,
      stack: e.stack,
      manifestHttpResponse: manifestHttpResponse ? {
        status: manifestHttpResponse.status,
        statusText: manifestHttpResponse.statusText,
        message: manifestHttpResponse.message,
        requestId: manifestHttpResponse.requestId,
      } : undefined
    };
    
    // Log the detailed error information
    console.group(`[${resourceRequestId}] 🔴 RESOURCE LOAD ERROR`);
    console.error(`Error loading resource: ${e.message}`);
    console.error(`Resource Link: ${resourceLink}`);
    console.error(`Original Error: ${errorMessage}`);
    console.error('Complete error details:', errorDetails);
    console.error('Error stack trace:', e.stack);
    console.groupEnd();
    
    // Return a more detailed error object
    return { 
      manifestHttpResponse,
      error: true,
      errorDetails: {
        type: 'resource_load_error',
        message: errorMessage,
        originalError: e.message,
        resourceLink,
        stack: e.stack,
        resourceRequestId,
        requestId: manifestHttpResponse?.requestId // Include the original request ID if available
      }
    };
  }
};

export const parseResourceLink = ({
  resourceLink, config, reference = {},
}) => {
  let parsedArray,
    username,
    repository,
    languageId,
    resourceId,
    projectId = reference.projectId || reference.bookId,
    tag,
    ref,
    matched;
  ref = ref || tag || 'master'; // fallback to using tag if ref not given
  const versionHttpMatch = /https?:\/\/.*org\/api\/v1\/repos\/([^/]*)\/([^/]*)\/([^/]*)([/][^/]*)*\?ref=([^/]+)/;
  const versionLinkMatch = /\/api\/v1\/repos\/([^/]*)\/([^/]*)\/([^/]*)([/][^/]*)*\?ref=([^/]+)/;

  if (matched = resourceLink.match(versionHttpMatch)) {
    //https://git.door43.org/api/v1/repos/ru_gl/ru_rlob/contents?ref=v0.9
    //https://git.door43.org/api/v1/repos/ru_gl/ru_rlob/contents/manifest.yaml?ref=v0.9
    [, username, repository, , , ref] = matched;
    [languageId, resourceId] = repository.split('_');
  } else if (matched = resourceLink.match(versionLinkMatch)) {
    // /api/v1/repos/ru_gl/ru_rlob/contents?ref=v0.9
    // /api/v1/repos/ru_gl/ru_rlob/contents/manifest.yaml?ref=v0.9
    [, username, repository, , , ref] = matched;
    [languageId, resourceId] = repository.split('_');
  } else if (matched = resourceLink.match(/https?:\/\/.*org\/([^/]*)\/([^/]*).git/)) {
    // https://git.door43.org/Door43-Catalog/en_ust.git
    [, username, repository] = matched;
    [languageId, resourceId] = repository.split('_');
  } else if (resourceLink.includes('/u/')) {
    // https://door43.org/u/unfoldingWord/en_ult/
    parsedArray = resourceLink.match(/https?:\/\/.*org\/u\/([^/]*)\/([^/]*)/);
    [, username, repository] = parsedArray;
    [languageId, resourceId] = repository.split('_');
  } else if (resourceLink.includes('src/branch') ||
    resourceLink.includes('src/tag') ||
    resourceLink.includes('raw/branch') ||
    resourceLink.includes('raw/tag')){
    //https://git.door43.org/ru_gl/ru_rlob/src/branch/master
    //https://git.door43.org/ru_gl/ru_rlob/src/tag/v1.1.1
    //https://git.door43.org/ru_gl/ru_rlob/raw/tag/v1.1.1
    //https://git.door43.org/ru_gl/ru_rlob/src/branch/master/3jn
    parsedArray = resourceLink.match(
      /https?:\/\/.*org\/([^/]*)\/([^/]*)\/([^/]*)\/([^/]*)\/([^/]*)/
    );
    [, username, repository, , , ref] = parsedArray;
    [languageId, resourceId] = repository.split('_');
  } else if (resourceLink.includes('http')) {
    //https://git.door43.org/ru_gl/ru_rlob
    //https://git.door43.org/ru_gl/ru_rlob/3jn
    parsedArray = resourceLink.match(/https?:\/\/.*org\/([^/]*)\/([^/]*)/);
    [, username, repository] = parsedArray;
    [languageId, resourceId] = repository.split('_');
  } else if (resourceLink.match(/^\/?([^/]*)\/([^/]*)\/?\/?([^/]*)?\/?$/)) {
    // /ru_gl/ru_rlob
    // /ru_gl/ru_rlob/3jn
    parsedArray = resourceLink.match(/^\/?([^/]*)\/([^/]*)\/?\/?([^/]*)?\/?$/);
    [
      ,
      username,
      repository,
      projectId = reference.projectId || reference.bookId,
    ] = parsedArray;
    [languageId, resourceId] = repository.split('_');
  } else {
    //ru_gl/ru/rlob/master/
    //ru_gl/ru/rlob/master/tit
    parsedArray = resourceLink.split('/');
    [username, languageId, resourceId, ref = 'master', projectId] = parsedArray;
    repository = `${languageId}_${resourceId}`;
  }

  if (!projectId || projectId == '' || projectId.length == 0) {
    projectId = reference.projectId || reference.bookId;
  }
  resourceLink = `${username}/${languageId}/${resourceId}/${ref}/${projectId}`;

  return {
    resourceLink,
    username,
    repository,
    languageId,
    resourceId,
    tag: ref,
    ref,
    projectId,
    config,
  };
};

export const getResourceManifest = async ({
  username,
  languageId,
  resourceId,
  tag,
  ref,
  config,
  fullResponse,
  doRefFetch,
}) => {
  ref = ref || tag; // fallback to using tag if ref not given
  const repository = `${languageId}_${resourceId}`;
  const path = 'manifest.yaml';
  
  // Create a manifest request ID for tracing
  const manifestRequestId = `manifest_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
  
  // Log the manifest request
  console.log(`[${manifestRequestId}] 🔍 MANIFEST REQUEST:`, {
    username,
    repository,
    path,
    ref,
    config: {
      server: config?.server,
      timeout: config?.timeout,
      // Don't log sensitive information
      token: config?.token ? '[REDACTED]' : undefined,
    },
    timestamp: new Date().toISOString(),
  });
  
  const response = await getFile({
    username,
    repository,
    path,
    ref,
    config,
    fullResponse,
    doRefFetch,
  });
  
  // Check if we got an error response from getFile
  if (response && response.error) {
    const errorDetails = {
      manifestRequestId,
      timestamp: new Date().toISOString(),
      type: 'manifest_fetch_error',
      status: response.status,
      statusText: response.statusText,
      message: response.message,
      repository,
      languageId,
      resourceId,
      requestId: response.requestId, // Include the original request ID if available
      request: {
        username,
        repository,
        path,
        ref,
      },
      response: {
        ...response,
        // Don't include large data objects
        data: response.data ? '[DATA OBJECT]' : undefined,
      }
    };
    
    // Log the detailed error information
    console.group(`[${manifestRequestId}] 🔴 MANIFEST FETCH ERROR`);
    console.error(`Error fetching manifest: ${response.message || 'Unknown error'}`);
    console.error(`Repository: ${repository}`);
    console.error(`Status: ${response.status || 'Unknown'}`);
    console.error(`Status Text: ${response.statusText || 'Unknown'}`);
    console.error('Complete error details:', errorDetails);
    console.groupEnd();
    
    return fullResponse ? { 
      manifest: null, 
      response: {
        ...response,
        repository,
        languageId,
        resourceId,
        manifestRequestId,
      } 
    } : null;
  }
  
  const yaml = getResponseData(response);
  
  // Check if we couldn't parse the YAML
  if (!yaml) {
    const errorDetails = {
      manifestRequestId,
      timestamp: new Date().toISOString(),
      type: 'manifest_parse_error',
      status: response.status || 0,
      statusText: 'Invalid manifest format',
      message: 'Could not parse manifest YAML',
      repository,
      languageId,
      resourceId,
      requestId: response.requestId, // Include the original request ID if available
    };
    
    // Log the detailed error information
    console.group(`[${manifestRequestId}] 🔴 MANIFEST PARSE ERROR`);
    console.error(`Error parsing manifest YAML`);
    console.error(`Repository: ${repository}`);
    console.error('Complete error details:', errorDetails);
    console.groupEnd();
    
    const errorResponse = {
      error: true,
      status: response.status || 0,
      statusText: 'Invalid manifest format',
      message: 'Could not parse manifest YAML',
      repository,
      languageId,
      resourceId,
      manifestRequestId,
      requestId: response.requestId, // Include the original request ID
    };
    return fullResponse ? { manifest: null, response: errorResponse } : null;
  }
  
  try {
    const manifest = YAML.safeLoad(yaml);
    
    // Log successful manifest loading
    console.log(`[${manifestRequestId}] ✅ MANIFEST LOADED SUCCESSFULLY:`, {
      repository,
      timestamp: new Date().toISOString(),
    });
    
    return fullResponse ? { manifest, response } : manifest;
  } catch (error) {
    const errorDetails = {
      manifestRequestId,
      timestamp: new Date().toISOString(),
      type: 'yaml_parse_error',
      message: error.message || 'Failed to parse manifest YAML',
      repository,
      languageId,
      resourceId,
      stack: error.stack,
      requestId: response.requestId, // Include the original request ID if available
    };
    
    // Log the detailed error information
    console.group(`[${manifestRequestId}] 🔴 YAML PARSE ERROR`);
    console.error(`Error parsing manifest YAML: ${error.message}`);
    console.error(`Repository: ${repository}`);
    console.error('Complete error details:', errorDetails);
    console.error('Error stack trace:', error.stack);
    console.groupEnd();
    
    const errorResponse = {
      error: true,
      status: response.status || 0,
      statusText: 'YAML parse error',
      message: error.message || 'Failed to parse manifest YAML',
      repository,
      languageId,
      resourceId,
      manifestRequestId,
      requestId: response.requestId, // Include the original request ID
    };
    return fullResponse ? { manifest: null, response: errorResponse } : null;
  }
};

export const getResourceProjectFile = async ({
  username,
  languageId,
  resourceId,
  ref,
  tag,
  project: { path: projectPath },
  config,
  filePath,
  doRefFetch,
}) => {
  const repository = `${languageId}_${resourceId}`;
  projectPath = filePath && filePath.length ? path.join(projectPath, filePath) : projectPath;

  const file = await getFile({
    username,
    repository,
    path: projectPath,
    ref,
    tag,
    config,
    fullResponse: true,
    doRefFetch,
  });
  return file;
};

export const projectFromProjects = ({
  reference, projectId, projects,
}) => {
  const identifier = reference ? (reference?.projectId || reference?.bookId) : projectId;
  const project = projects.filter(
    (project) => project.identifier === identifier,
  )[0];
  return project;
};

export const extendProject = ({
  project, resource, reference,
}) => {
  let _project = { ...project };
  const { projectId, resourceLink } = resource;

  // eslint-disable-next-line require-await
  _project.file = async () =>
    getResourceProjectFile({
      ...resource,
      project,
      filePath: reference?.filePath,
    });

  if (project.path.match(/\.usfm$/)) {
    _project.parseUsfm = async () => {
      const start = performance.now();
      let results;

      if (reference && (reference.chapter || reference.bcvQuery)) {
        results = await parseChapters({ project: _project, reference });
      } else {
        results = await parseBook({ project: _project });
      }

      const { json, response } = results || {};
      const end = performance.now();
      let identifier =
        reference && reference.bookId
          ? reference?.projectId || reference.bookId
          : projectId;

      console.log(
        `extendProject() - fetch & parse ${resourceLink} ${identifier}: ${(end - start).toFixed(
          3,
        )}ms`,
      );
      return { json, response };
    };
  }
  return _project;
};

/**
 * get data from http response and decode data in base64 format
 * @param {object} response - http response
 * @return {*} - response data decoded
 */
export function getResponseData(response) {
  let data = response?.data;

  if (!data?.errors) { // make sure was not a fetch error
    data = (data?.encoding === 'base64') ? decodeBase64ToUtf8(data.content) : data;
    return data;
  }
  return null;
}

export const parseBook = async ({ project }) => {
  // console.log('parseBook usfmJS.toJSON', project);
  const response = (await project.file()) || '';
  const usfm = getResponseData(response);

  if (usfm) {
    const json = usfmJS.toJSON(usfm);
    // embed the fetch url and file name in returned data so response can be verified as related to the latest request
    const { name, url } = response?.data || {};
    json.name = name;
    json.url = url;
    return {json, response};
  } else {
    console.warn(`resources.parseBook() - empty usfm`, response);
  }
};

export const chapterListFromBcvQuery = (bcvQuery) => {
  const resArray = []
  if (bcvQuery?.book) {
    Object.entries(bcvQuery?.book).forEach(([bookKey, { ch }]) => {
      Object.entries(ch).forEach(([chNum, { v }]) => {
        resArray.push(chNum);
      })
    })
  }
  return resArray
}

export const parseChapters = async ({ project, reference }) => {
  const response = await project.file();
  const usfm = getResponseData(response);

  if (usfm) {
    let chapterText = '';
    const chList = reference?.bcvQuery ? chapterListFromBcvQuery(reference?.bcvQuery) : [reference?.chapter]

    chList?.forEach(ch => {
      const nextChapter = ch + 1;
      const regexpString =
        '(\\\\c\\s*' +
        ch +
        '\\s*(.*?\n?)*?)(?:(\\\\c\\s*' +
        nextChapter +
        '|$))';
      const regexp = new RegExp(regexpString, '');
      const matches = usfm.match(regexp);
      if (matches) {
        chapterText += matches[1];
      }
    })

    const json = usfmJS.toJSON(chapterText);
    return { json, response };
  }
};

// https://git.door43.org/unfoldingword/en_ult/raw/branch/master/manifest.yaml
export const getFile = async ({
  username,
  repository,
  path: urlPath = '',
  tag,
  ref,
  config,
  fullResponse,
}) => {
  let url;
  const serverUrl = config?.server || '';

  if (ref) {
    url = path.join('api/v1/repos', username, repository, 'contents', urlPath) + `?ref=${ref}`;
  } else if (tag && tag !== 'master') {
    url = path.join(username, repository, 'raw/tag', tag, urlPath);
  } else { // default to master
    url = path.join(username, repository, 'raw/branch/master', urlPath);
  }

  // Create a request ID for tracing this specific request
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
  
  // Log the request details
  console.log(`[${requestId}] 🔍 REQUEST DETAILS:`, {
    url: `${serverUrl}/${url}`,
    method: 'GET',
    username,
    repository,
    path: urlPath,
    tag,
    ref,
    config: {
      server: config?.server,
      timeout: config?.timeout,
      // Don't log sensitive information like tokens
      token: config?.token ? '[REDACTED]' : undefined,
    },
    timestamp: new Date().toISOString(),
  });

  try {
    const _config = { ...config }; // prevents gitea-react-toolkit from modifying object
    const fullUrl = `${serverUrl}/${url}`;
    
    // Log that we're making the request
    console.log(`[${requestId}] Making request to: ${fullUrl}`);
    
    const response = await get({
      url,
      config: _config,
      fullResponse,
    });
    
    // Log successful response (but not the full data which could be large)
    console.log(`[${requestId}] ✅ RESPONSE SUCCESS:`, {
      status: response?.status || 200,
      statusText: response?.statusText || 'OK',
      dataSize: response?.data ? JSON.stringify(response.data).length : 0,
      headers: response?.headers,
    });
    
    return response;
  } catch (error) {
    // Create a detailed error log with all request and response information
    const errorDetails = {
      requestId,
      timestamp: new Date().toISOString(),
      request: {
        url: `${serverUrl}/${url}`,
        method: 'GET',
        username,
        repository,
        path: urlPath,
        tag,
        ref,
      },
      response: {
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers,
        data: error.response?.data,
      },
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      }
    };
    
    // Log the detailed error information
    console.group(`[${requestId}] 🔴 DETAILED REQUEST ERROR`);
    console.error(`Error fetching file: ${error.message}`);
    console.error(`Request URL: ${serverUrl}/${url}`);
    console.error(`Status: ${error.response?.status || 'Unknown'}`);
    console.error(`Status Text: ${error.response?.statusText || 'Unknown'}`);
    console.error('Complete error details:', errorDetails);
    console.groupEnd();
    
    // Return a structured error object with HTTP status information and request details
    return { 
      error: true, 
      status: error.response?.status || 0,
      statusText: error.response?.statusText || 'Unknown error',
      message: error.message || 'Failed to fetch file',
      url: `${serverUrl}/${url}`,
      repository,
      path: urlPath,
      requestId, // Include the request ID for tracing in logs
      requestDetails: {
        username,
        repository,
        path: urlPath,
        tag,
        ref,
        timestamp: new Date().toISOString(),
      },
      responseDetails: error.response ? {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
      } : undefined
    };
  }
};
