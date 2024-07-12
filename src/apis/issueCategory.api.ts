import { IssueCategory, IssueCategoryPayload } from "~/types/issue.type";
import { SuccessResponse } from "~/types/utils.type";
import http from "~/utils/http";

const projectIssueCategoriesApi = {
  // Get issue categories for a project
  getIssueCategories(projectId: string | number) {
    return http.get<SuccessResponse<IssueCategory[]>>(`/projects/${projectId}/issue_categories.json`);
  },

  // Get a single issue category by ID
  getIssueCategory(id: number) {
    return http.get<SuccessResponse<IssueCategory>>(`/issue_categories/${id}.json`);
  },

  // Create a new issue category for a project
  createIssueCategory(projectId: string | number, issueCategory: IssueCategoryPayload) {
    return http.post<void>(`/projects/${projectId}/issue_categories.json`, { issue_category: issueCategory });
  },

  // Update an existing issue category by ID
  updateIssueCategory(id: number, issueCategory: IssueCategoryPayload) {
    return http.put<void>(`/issue_categories/${id}.json`, { issue_category: issueCategory });
  },

  // Delete an issue category by ID
  deleteIssueCategory(id: number, reassignToId?: number) {
    const url = reassignToId ? `/issue_categories/${id}.json?reassign_to_id=${reassignToId}` : `/issue_categories/${id}.json`;
    return http.delete(url) as Promise<void>;
  },
};

export default projectIssueCategoriesApi;
