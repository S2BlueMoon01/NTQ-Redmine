/* eslint-disable indent */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import config from "~/constants/config";
import HttpStatusCode from "~/constants/httpStatusCode.enum";

const apiKey = import.meta.env.VITE_API_ACCESS_KEY as string;

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  retry?: boolean;
  __retryCount?: number;
}

class Http {
  instance: AxiosInstance;
  retryCount: number = 3;
  retryDelay: number = 1000;

  constructor() {
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 500,
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

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError<CustomAxiosRequestConfig>) => {
        // Chỉ toast lỗi không phải 422 và 401
        if (![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data;
          const message = data?.message || error.message;
          toast.error(message);
        }

        // Nếu timeout hoặc lỗi mạng thì retry lại
        const config = error.config as CustomAxiosRequestConfig;
        if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK" || !error.response) {
          // If config does not exist or the retry option is not set, reject
          if (!config || config.retry === false) {
            return Promise.reject(error);
          }

          // Set the variable for keeping track of the retry count
          config.__retryCount = config.__retryCount || 0;

          // Check if we've maxed out the total number of retries
          if (config.__retryCount >= this.retryCount) {
            // Reject with the error
            return Promise.reject(error);
          }

          // Increase the retry count
          config.__retryCount += 1;

          // Create new promise to handle exponential backoff
          const backoff = new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, this.retryDelay);
          });

          // Return the promise in which recalls axios to retry the request
          return backoff.then(() => {
            return this.instance(config);
          });
        }

        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;
export default http;
