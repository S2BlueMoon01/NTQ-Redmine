/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "src/utils/http";
import { UserAccount } from "~/types/user.type";
import { SuccessResponse } from "~/types/utils.type";

export const URL_MY_ACCOUNT = "my/account";

const myAccountApi = {
  getAccount() {
    return http.get<SuccessResponse<UserAccount>>(`${URL_MY_ACCOUNT}.json`);
  },

  updateAccount(updates: Partial<UserAccount>) {
    return http.put(`${URL_MY_ACCOUNT}`, updates);
  },
};

export default myAccountApi;
