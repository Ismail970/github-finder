import axios from "axios"

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const TIMEOUT_ERROR_SEC = process.env.REACT_APP_TIMEOUT_ERROR_SEC

const github = axios.create({
  baseURL: GITHUB_URL,
})

const timeout = s => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(
        `Request took too long! Maybe try to refrech?`
      ));
    }, s * 1000);
  });
};

// Get search resaults
export const searchUsers = async text => {
  try {
    const params = new URLSearchParams({
      q: text
    })

    const response = await Promise.race([
      github.get(`/search/users?${params}`),
      timeout(TIMEOUT_ERROR_SEC)
    ]);

    return response.data.items
  } catch (err) {
    throw err.message
  }
}

// Get user and repos
export const getUserAndRepos = async login => {
  try {
    const [user, repos] = await Promise.race([
      Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/starred`),
      ]),
      timeout(TIMEOUT_ERROR_SEC)
    ]);

    return { user: user.data, repos: repos.data }
  } catch (err) {
    throw err.message
  }
}