import { DropdownItem, Player, UpdatePlayerProperties } from "../../types/teamTypes";
import { Field } from "../Field";
import { PlayerPicker } from "../playerPicker/PlayerPicker";
import { DropDown } from "../dropdown/DropDown";
import { useState } from "react";
import { Formations, formationList } from "../../types/formations";

interface RightPaneProps {
  players: Player[];
  updatePlayerProperties: (playerId: number, updatedProperties: UpdatePlayerProperties) => void;
}

export const RightPane = ({ players, updatePlayerProperties }: RightPaneProps) => {
  const starters = players.filter((player) => player.starter).sort((a, b) => a.number - b.number);
  const reserves = players.filter((player) => !player.starter).sort((a, b) => a.number - b.number);
  const items: DropdownItem[] = formationList.map((formation, index) => {
    return { id: index, name: formation };
  });

  const [formation, setFormation] = useState<Formations>("4-4-2");

  const changeSelectedFormation = (id: number) => {
    setFormation(formationList[id]);
  };
  return (
    <>
      <DropDown items={items} placeHolder={"Formation"} switchItem={changeSelectedFormation} />
      <Field players={starters} />
      <PlayerPicker
        starters={starters}
        reserves={reserves}
        updatePlayerProperties={updatePlayerProperties}
      />
    </>
  );
};
