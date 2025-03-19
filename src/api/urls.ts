import * as dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.GITHUB_API_BASE_URL || 'https://api.github.com';

export interface ApiPath {
  path: string;
  baseUrl?: string;
}

export const API_URLS = {
  REPOS: {
    LIST: { path: '/user/repos', baseUrl: BASE_URL },
    GET: { path: '/repos/{owner}/{repo}', baseUrl: BASE_URL },
    CREATE: { path: '/user/repos', baseUrl: BASE_URL },
    UPDATE: { path: '/repos/{owner}/{repo}', baseUrl: BASE_URL },
    DELETE: { path: '/repos/{owner}/{repo}', baseUrl: BASE_URL }
  },
  
  ISSUES: {
    LIST: { path: '/repos/{owner}/{repo}/issues', baseUrl: BASE_URL },
    GET: { path: '/repos/{owner}/{repo}/issues/{issue_number}', baseUrl: BASE_URL },
    CREATE: { path: '/repos/{owner}/{repo}/issues', baseUrl: BASE_URL },
    UPDATE: { path: '/repos/{owner}/{repo}/issues/{issue_number}', baseUrl: BASE_URL }
  },
  
  PULLS: {
    LIST: { path: '/repos/{owner}/{repo}/pulls', baseUrl: BASE_URL },
    GET: { path: '/repos/{owner}/{repo}/pulls/{pull_number}', baseUrl: BASE_URL },
    CREATE: { path: '/repos/{owner}/{repo}/pulls', baseUrl: BASE_URL },
    UPDATE: { path: '/repos/{owner}/{repo}/pulls/{pull_number}', baseUrl: BASE_URL }
  },
  
  USERS: {
    GET: { path: '/user', baseUrl: BASE_URL },
    GET_BY_USERNAME: { path: '/users/{username}', baseUrl: BASE_URL }
  }
};

export function getFullUrl(apiPath: ApiPath, params?: Record<string, string>): string {
  let url = `${apiPath.baseUrl || BASE_URL}${apiPath.path}`;
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, value);
    });
  }
  
  return url;
} 