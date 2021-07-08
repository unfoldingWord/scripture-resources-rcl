import { get } from 'gitea-react-toolkit';

/**
 * do http fetch.  If error checks for that we have connection to server
 * @return {Promise<object>} returns http response or throws exception if
 * @param {string} server
 * @param {string} repoOwner
 * @param {string} repoName
 * @param {string} branchUser - optional, if given then filter branches by branchUser
 */
export async function getBranchesForRepo(server, repoOwner, repoName, branchUser = null) {
  let response = await get({
    url: `${server}/api/v1/repos/${repoOwner}/${repoName}/branches`,
    config: {
      server,
    },
    noCache: true,
  });

  if (branchUser) {
    response = response.filter(branch => (branch?.commit?.author?.username === branchUser))
  }

  return response;
}
