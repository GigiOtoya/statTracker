import apiClient from "./Api";

export const getAllSquads = () => {
  return apiClient.get("/squad");
};

export const getSquadData = (id: number) => {
  return apiClient.get(`/squad/id/${id}`);
};

export const getSquadNames = () => {
  return apiClient.get("/squad/names");
};

export const addSquad = (name: string) => {
  return apiClient.post("/squad");
};
