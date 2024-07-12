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
  created_on: string;
  updated_on: string;
}
