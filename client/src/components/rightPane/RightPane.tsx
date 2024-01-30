import { Player, MutablePlayerProperties } from "../../types/teamTypes";
import { Field } from "../Field";
import { PlayerPicker } from "../playerPicker/PlayerPicker";
import { DropDown } from "../dropdown/DropDown";
import { useEffect, useState } from "react";
import { Formations, formationList } from "../../types/formations";

interface RightPaneProps {
  players: Player[];
  updatePlayerProperties: (playerId: number, updatedProperties: MutablePlayerProperties) => void;
}

export const RightPane = ({ players, updatePlayerProperties }: RightPaneProps) => {
  const starters = players.filter((player) => player.starter).sort((a, b) => a.number - b.number);
  const reserves = players.filter((player) => !player.starter).sort((a, b) => a.number - b.number);
  const items: string[] = formationList.map((formation) => formation);
  const [formation, setFormation] = useState<Formations>("4-4-2");

  useEffect(() => {
    const storedFormation = localStorage.getItem("selectedFormation");
    if (storedFormation) {
      setFormation(JSON.parse(storedFormation));
    }
  }, []);

  useEffect(() => {
    const selectedFormation = JSON.stringify(formation);
    localStorage.setItem("selectedFormation", selectedFormation);
  }, [formation]);

  const changeSelectedFormation = (index: number) => {
    setFormation(formationList[index]);
  };

  return (
    <>
      <DropDown
        items={items}
        selected={`Formation: ${formation}`}
        placeHolder={"Formation"}
        switchItem={changeSelectedFormation}
      />
      <Field players={starters} formationName={formation} />
      <PlayerPicker
        starters={starters}
        reserves={reserves}
        updatePlayerProperties={updatePlayerProperties}
      />
    </>
  );
};
