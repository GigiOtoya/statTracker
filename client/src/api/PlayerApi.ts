import { AxiosResponse } from "axios";
import { Player } from "../types/teamTypes";
import apiClient from "./Api";

export const getAllPlayers = (): Promise<AxiosResponse<Player[]>> => {
  return apiClient.get("/players");
};

export const getSquadPlayers = (id: number): Promise<AxiosResponse<Player[]>> => {
  return apiClient.get(`/players/squad/${id}`);
};

export const addPlayer = (player: Player, squadId: number): Promise<AxiosResponse> => {
  return apiClient.post("/players", player, { params: { squadId } });
};

export const editStarters = (playerNumbers: number[], squadId: number): Promise<AxiosResponse> => {
  return apiClient.put(`/players/squad/${squadId}`, playerNumbers, { params: { squadId } });
};

export const editPlayer = (player: Player): Promise<AxiosResponse> => {
  console.log(player);
  return apiClient.put(`/players/id/${player.id}`, player);
};

export const deletePlayer = (id: number): Promise<AxiosResponse> => {
  return apiClient.delete(`/players/id/${id}`);
};
