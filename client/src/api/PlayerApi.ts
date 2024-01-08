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

export const patchPlayers = (players: Player[]): Promise<AxiosResponse> => {
  return apiClient.post("/players", players);
};
