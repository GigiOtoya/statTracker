export {};
const width = 1600;
const height = 2560;
const formations = {
  "4-4-2": {
    name: "4-4-2",
    description: "Standard formation with 4 defenders, 4 midfielders, and 2 forwards",
    positions: {
      GK: { x: width / 2, y: height - 120 },
      RB: { x: width * 0.75, y: height * 0.25 },
      CB1: { x: width * 0.5, y: height * 0.15 },
      CB2: { x: width * 0.25, y: height * 0.15 },
      LB: { x: width * 0.1, y: height * 0.25 },
      RM: { x: width * 0.75, y: height * 0.6 },
      CM1: { x: width * 0.5, y: height * 0.5 },
      CM2: { x: width * 0.25, y: height * 0.5 },
      LM: { x: width * 0.1, y: height * 0.6 },
      FW1: { x: width * 0.4, y: height * 0.85 },
      FW2: { x: width * 0.6, y: height * 0.85 },
    },
  },
  "4-3-3": {
    name: "4-3-3",
    description: "Formation with 4 defenders, 3 midfielders, and 3 forwards",
    positions: {
      GK: { x: 50, y: 50 },
      RB: { x: 150, y: 50 },
      CB: { x: 250, y: 50 },
      LB: { x: 450, y: 50 },
      RM: { x: 150, y: 150 },
      CM: { x: 250, y: 150 },
      LM: { x: 450, y: 150 },
      RW: { x: 200, y: 250 },
      CF: { x: 300, y: 250 },
      LW: { x: 400, y: 250 },
    },
  },
};
