import { Project } from "~/types/project.type";
import { ListDataResponse } from "~/types/utils.type";
import { Version } from "~/types/version.type";
import http from "~/utils/http";

export const URL_PROJECTS = "projects";
export const URL_VERSIONS = "versions";

const versionsApi = {
  getAllVersionOfProject(data: { include?: string; idProject: number }) {
    const params = data;
    return http.get<ListDataResponse<Version[], "versions">>(`${URL_PROJECTS}/${data.idProject}/${URL_VERSIONS}.json`, { params });
  },

  getProjectById(data: { id: number; include?: string }) {
    const params = data.include ? { include: data.include } : {};
    return http.get<{ project: Project }>(`${URL_PROJECTS}/${data.id}.json`, { params });
  },
};

export default versionsApi;
