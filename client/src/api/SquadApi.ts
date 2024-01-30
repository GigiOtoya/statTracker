import { AxiosResponse } from "axios";
import { Squad, NewSquad } from "../types/teamTypes";
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

export const addSquad = (newSquad: NewSquad): Promise<AxiosResponse> => {
  return apiClient.post("/squads", newSquad);
};

export const editSquad = (id: number, newSquad: NewSquad): Promise<AxiosResponse> => {
  return apiClient.put(`/squads/id/${id}`, newSquad);
};

export const deleteSquad = (id: number): Promise<AxiosResponse> => {
  return apiClient.delete(`/squads/id/${id}`);
};
