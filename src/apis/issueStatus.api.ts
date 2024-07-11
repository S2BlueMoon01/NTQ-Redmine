import http from "src/utils/http";
import { IssueStatus } from "~/types/issue.type";
import { SuccessResponse } from "~/types/utils.type";

const issueStatusesApi = {
  // Get all issue statuses
  getIssueStatuses() {
    return http.get<SuccessResponse<IssueStatus[]>>("/issue_statuses.json");
  },
};

export default issueStatusesApi;
