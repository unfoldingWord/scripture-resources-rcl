import { get } from 'gitea-react-toolkit';

/**
 * query server for list of branches on repo
 * @param {string} server such as https://git.door43.org
 * @param {string} repoOwner
 * @param {string} repoName
 * @param {string} branchUser - optional username to filter branches on
 * @return {Promise<array>} returns list of branches for repo
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

/**
 * query server for list of branches on repo.  Will return user edit branch name `${branchUser}${userExtension}` if exists or 'master'
 * @param {string} server such as https://git.door43.org
 * @param {string} repoOwner
 * @param {string} repoName
 * @param {string} branchUser - username for user doing edits
 * @param {string} userExtension - extension for user branch
 * @return {Promise<string>} working extension for branch
 */
export async function getUsersWorkingBranch(server, repoOwner, repoName, branchUser, userExtension) {
  const response = await getBranchesForRepo(server, repoOwner, repoName, branchUser);
  const userEditBranch = `${branchUser}${userExtension}`;
  const found = response.find(branch => (branch.name === userEditBranch));
  return found ? userEditBranch : 'master';
}