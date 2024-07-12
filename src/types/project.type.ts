export interface Project {
  name: string;
  identifier: string;
  description?: string;
  homepage?: string;
  is_public?: boolean;
  parent_id?: number;
  inherit_members?: boolean;
  default_assigned_to_id?: number;
  default_version_id?: number;
  tracker_ids?: number[];
  enabled_module_names?: string[];
  issue_custom_field_ids?: number[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  custom_field_values?: Record<number, any>;
}

export interface DataProject {
  id: number | string;
  name: string;
  identifier?: string;
  description?: string;
  custom_fields?: CustomFields[];
  created_on?: string;
  updated_on?: string;
}

export interface CustomFields {
  id: number | string;
  name: string;
  value?: string;
}

export interface ProjectResponse {
  limit?: number;
  offset?: number;
  projects: DataProject[];
  total_count: number;
}
