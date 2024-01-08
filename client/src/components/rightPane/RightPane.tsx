import { Player, UpdatePlayerProperties } from "../../types/teamTypes";
import { Field } from "../Field";
import { PlayerPicker } from "../playerPicker/PlayerPicker";
import { DropDown } from "../dropdown/DropDown";

interface RightPaneProps {
  players: Player[];
  updatePlayerProperties: (playerId: number, updatedProperties: UpdatePlayerProperties) => void;
}

export const RightPane = ({ players, updatePlayerProperties }: RightPaneProps) => {
  const starters = players.filter((player) => player.starter).sort((a, b) => a.number - b.number);
  const reserves = players.filter((player) => !player.starter).sort((a, b) => a.number - b.number);

  return (
    <>
      {/* <DropDown items={["3-4-3", "4-3-3", "4-4-2", "5-3-2"]} placeHolder={"Formation"} /> */}
      <Field players={starters} />
      <PlayerPicker
        starters={starters}
        reserves={reserves}
        updatePlayerProperties={updatePlayerProperties}
      />
    </>
  );
};
