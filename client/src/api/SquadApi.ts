import { AxiosResponse } from "axios";
import { Squad } from "../types/teamTypes";
import apiClient from "./Api";

export const getAllSquads = (): Promise<AxiosResponse<Squad[]>> => {
  return apiClient.get("/squads");
};

export const getSquad = (id: number): Promise<Squad> => {
  return apiClient.get(`/squads/id/${id}`);
};

export const getSquadList = () => {
  return apiClient.get("/squads/identifiers");
};

export const getSquadNames = (): Promise<AxiosResponse<string[]>> => {
  return apiClient.get("/squads/names");
};

export const addSquad = (squad: Squad) => {
  return apiClient.post("/squads", squad);
};
