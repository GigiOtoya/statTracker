import apiClient from "./Api";

export const getPlayerData = () => {
  return apiClient.get("/player");
};
