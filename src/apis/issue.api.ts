/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "src/utils/http";
import { Issue } from "~/types/issue.type";
import { SuccessResponse } from "~/types/utils.type";

export const URL_ISSUES = "issues";

const issuesApi = {
  listIssues(format: string, params?: Record<string, any>) {
    return http.get<SuccessResponse<Issue[]>>(`${URL_ISSUES}.${format}`, { params });
  },

  getIssueById(id: number, format: string, include?: string) {
    const params = include ? { include } : {};
    return http.get<SuccessResponse<Issue>>(`${URL_ISSUES}/${id}.${format}`, { params });
  },

  createIssue(issue: Partial<Issue>, format: string) {
    return http.post(`${URL_ISSUES}.${format}`, { issue });
  },

  updateIssue(id: number, updates: Partial<Issue>, format: string) {
    return http.put(`${URL_ISSUES}/${id}.${format}`, { issue: updates });
  },

  deleteIssue(id: number, format: string) {
    return http.delete(`${URL_ISSUES}/${id}.${format}`);
  },
};

export default issuesApi;
