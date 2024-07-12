import { Project, ProjectResponse } from "~/types/project.type";
import { SuccessResponse } from "~/types/utils.type";
import http from "~/utils/http";

export const URL_PROJECTS = "projects";

const projectsApi = {
  getAllProjects(include?: string) {
    const params = include ? { include } : {};
    return http.get<ProjectResponse>(`${URL_PROJECTS}.json`, { params });
  },

  getProjectById(id: number, include?: string) {
    const params = include ? { include } : {};
    return http.get<SuccessResponse<Project>>(`${URL_PROJECTS}/${id}.json`, { params });
  },

  createProject(project: Project) {
    return http.post(`${URL_PROJECTS}.json`, { project });
  },

  updateProject(id: number, project: Project) {
    return http.put(`${URL_PROJECTS}/${id}.json`, { project });
  },

  archiveProject(id: number) {
    return http.put(`${URL_PROJECTS}/${id}/archive.json`);
  },

  unarchiveProject(id: number) {
    return http.put(`${URL_PROJECTS}/${id}/unarchive.json`);
  },

  deleteProject(id: number) {
    return http.delete(`${URL_PROJECTS}/${id}.json`);
  },
};

export default projectsApi;
