import { useAuth } from "@clerk/clerk-react";
import apiClient from "../api/Api";

export const useAuthenticatedApiClient = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();

  apiClient.interceptors.request.use(
    async (config) => {
      if (isLoaded && isSignedIn) {
        const sessionToken = await getToken();
        config.headers.Authorization = `Bearer ${sessionToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
