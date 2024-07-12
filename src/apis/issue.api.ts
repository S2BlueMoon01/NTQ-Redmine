/* eslint-disable @typescript-eslint/no-explicit-any */
import { Issue } from "~/types/issue.type";
import { ListDataResponse } from "~/types/utils.type";
import http from "~/utils/http";

export const URL_ISSUES = "issues";

const issuesApi = {
  listIssues(data?: {
    offset?: number;
    limit?: number;
    sort?: string;
    include?: "attachments" | "relations" | "attachments,relations";
    issue_id?: string;
    project_id?: number;
    subproject_id?: number;
    tracker_id?: number;
    status_id?: string;
    assigned_to_id?: string;
    parent_id?: number;
    cf_x?: string;
    created_on?: string;
    updated_on?: string;
  }) {
    const params = data;
    return http.get<ListDataResponse<Issue[]>>(`${URL_ISSUES}.json`, { params });
  },

  getIssueById(data: {
    id: number;
    include?: Array<"attachments" | "relations" | "children" | "changesets" | "journals" | "watchers" | "allowed_statuses">;
  }) {
    const params = data.include && data.include.length > 0 ? { include: data.include.join(",") } : {};
    return http.get<Issue>(`${URL_ISSUES}/${data.id}.json`, { params });
  },

  createIssue(issue: Partial<Issue>) {
    return http.post(`${URL_ISSUES}.json`, { issue });
  },

  updateIssue(id: number, updates: Partial<Issue>) {
    return http.put(`${URL_ISSUES}/${id}.json`, { issue: updates });
  },

  deleteIssue(id: number) {
    return http.delete(`${URL_ISSUES}/${id}.json`);
  },
};

export default issuesApi;
