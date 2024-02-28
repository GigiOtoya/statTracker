import axios from "axios";

type tokenFunction = () => Promise<string | null>;

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const configToken = async (getToken: tokenFunction) => {
  const sessionToken = await getToken();
  apiClient.interceptors.request.use(
    (config) => {
      if (sessionToken) {
        config.headers.Authorization = `Bearer ${sessionToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default apiClient;
