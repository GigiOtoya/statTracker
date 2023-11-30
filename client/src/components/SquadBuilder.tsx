import { Player, buttonTypes } from "../types/types";
import { DropDown } from "./DropDown";
import { Field } from "./Field";
import { Table } from "./table/Table";
import { SplitScreen } from "../Layouts/SplitScreen";
import { ActionButton } from "./actionButton/ActionButton";
import { Modal } from "./modals/Modal";
import mockData from "../utils/MOCK_DATA.json";
import addIcon from "../assets/add.svg";
import deleteIcon from "../assets/delete.svg";
import { useEffect, useState } from "react";
import { getSquadData, getAllSquads, getSquadNames } from "../api/SquadApi";

export const SquadBuilder = () => {
  const [data, setData] = useState<Player[]>(mockData);
  const [squadNames, setSquadNames] = useState<String[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    getSquadNames()
      .then((res) => {
        setSquadNames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <SplitScreen>
      <>
        <DropDown items={squadNames} />
        <Modal visible={isVisible} setVisible={toggleModal}></Modal>
        <Table data={data}>
          <ActionButton
            text={"Add New Squad"}
            icon={addIcon}
            type={buttonTypes[0]}
            fn={toggleModal}
          />
          <ActionButton text={"Delete"} icon={deleteIcon} type={buttonTypes[1]} />
        </Table>
      </>
      <>
        <DropDown items={["3-4-3", "4-3-3", "4-4-2", "5-3-2"]} placeHolder={"Formation"} />
        <Field />
      </>
    </SplitScreen>
  );
};
