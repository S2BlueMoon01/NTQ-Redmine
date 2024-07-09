/* eslint-disable indent */
import axios, { AxiosError, type AxiosInstance } from "axios";
import { toast } from "react-toastify";
import config from "~/constants/config";
import HttpStatusCode from "~/constants/httpStatusCode.enum";

const apiKey = import.meta.env.VITE_API_ACCESS_KEY as string;
class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "X-Redmine-API-Key": apiKey,
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        // Chỉ toast lỗi không phải 422 và 401
        if (![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data;
          const message = data?.message || error.message;
          toast.error(message);
        }
        return Promise.reject(error);
      },
    );
  }
}
const http = new Http().instance;
export default http;
