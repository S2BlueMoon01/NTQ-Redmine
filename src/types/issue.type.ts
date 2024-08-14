interface Project {
  id: number;
  name: string;
}

interface Tracker {
  id: number;
  name: string;
}

interface Status {
  id: number;
  name: string;
}

interface Priority {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
}

interface CustomField {
  id: number;
  name: string;
  value: string | string[];
  multiple?: boolean;
}

export interface Issue {
  id: number;
  project: Project;
  tracker: Tracker;
  status: Status;
  priority: Priority;
  author: User;
  assigned_to?: User;
  subject?: string;
  description: string;
  start_date?: string;
  done_ratio: number;
  due_date?: string;
  estimated_hours: number;
  spent_hours?: number;
  custom_fields?: CustomField[];
  created_on: string;
  updated_on?: string;
  fixed_version?: FixVersion;
  BugType?: string;
  Severity?: string;
  QCActivity?: string;
  CauseCategory?: [string];
  "IsDegrade?"?: boolean;
  Reopencounter?: number;
  watchers?: User[];
}

interface FixVersion {
  id: number;
  name: string;
}

export interface IssueStatus {
  id: number;
  name: string;
  is_closed: boolean;
}

export interface CustomFields {
  [key: string]: string | Array<string> | number;
}

export interface GroupedIssueByDay {
  [key: string]: Issue[];
}

export type IssueTable = {
  "#": number;
  project: string | undefined;
  tracker: string | undefined;
  subject: string | undefined;
  [key: string]: string | number | JSX.Element | undefined;
};
