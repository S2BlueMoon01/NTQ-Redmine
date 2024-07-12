import http from "~/utils/http";
import { ListDataResponse } from "./../types/utils.type";

interface User {
  login: string;
  firstname: string;
  lastname: string;
  password?: string;
  mail: string;
  auth_source_id?: number;
  mail_notification?: string;
  must_change_passwd?: boolean;
  generate_password?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  custom_fields?: Record<string, any>;
}

export const URL_USERS = "users";

const usersApi = {
  getAllUsers(status?: number, name?: string, group_id?: number) {
    const params = { status, name, group_id };
    return http.get<ListDataResponse<User[]>>(`${URL_USERS}.json`, { params });
  },

  createUser(user: User) {
    return http.post(`${URL_USERS}.json`, { user });
  },

  getUserById(id: number, include?: string) {
    const params = include ? { include } : {};
    return http.get<User>(`${URL_USERS}/${id}.json`, { params });
  },

  updateUser(id: number, user: User) {
    return http.put(`${URL_USERS}/${id}.json`, { user });
  },

  deleteUser(id: number) {
    return http.delete(`${URL_USERS}/${id}.json`);
  },
};

export default usersApi;
