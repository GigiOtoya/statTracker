import api from "./Api";

export const getPlayerData = () => {
  return api.get("/player");
};
