import { Tracker } from "~/apis/tracker.api";

export interface CustomField {
  id: number;
  name: string;
  value: string;
}

export interface Project {
  id: number;
  name: string;
  identifier: string;
  description: string;
  status: number;
  custom_fields: CustomField[];
  trackers?: Tracker[];
  created_on: string;
  updated_on: string;
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
