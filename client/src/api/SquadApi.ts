import api from "./Api";

export const getAllSquads = () => {
  return api.get("/squad");
};

export const getSquadData = (id: number) => {
  return api.get(`/squad/${id}`);
};
