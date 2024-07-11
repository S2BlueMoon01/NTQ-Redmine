export interface Issue {
  id: number;
  project: { name: string; id: number };
  tracker: { name: string; id: number };
  status: { name: string; id: number };
  priority: { name: string; id: number };
  author: { name: string; id: number };
  category: { name: string; id: number };
  subject: string;
  description?: string;
  start_date?: string;
  due_date?: string;
  done_ratio: number;
  estimated_hours?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  custom_fields: { name: string; id: number; value: any }[];
  created_on: string;
  updated_on: string;
}

// Interface for the issue category
export interface IssueCategory {
  id: number;
  project: {
    name: string;
    id: number;
  };
  name: string;
  assigned_to?: {
    name: string;
    id: number;
  };
}

// Interface for creating or updating an issue category
export interface IssueCategoryPayload {
  name: string;
  assigned_to_id?: number;
}

// Interface for the issue status
export interface IssueStatus {
  id: number;
  name: string;
  is_closed: boolean;
}
