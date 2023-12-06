import { Player, buttonTypes } from "../types/types";
import { DropDown } from "./DropDown";
import { Field } from "./Field";
import { Table } from "./table/Table";
import { SplitScreen } from "../Layouts/SplitScreen";
import { ActionButton } from "./actionButton/ActionButton";
import { Modal } from "./modals/Modal";
import { AddSquad } from "./modals/AddSquad";
import { DeleteSquad } from "./modals/DeleteSquad";
import mockData from "../utils/MOCK_DATA.json";
import addIcon from "../assets/add.svg";
import deleteIcon from "../assets/delete.svg";
import { useEffect, useState, ReactNode } from "react";
import { getSquadData, getAllSquads, getSquadNames } from "../api/SquadApi";
import { AddPlayer } from "./addPlayer/AddPlayer";

export const SquadBuilder = () => {
  const [data, setData] = useState<Player[]>(mockData);
  const [squadNames, setSquadNames] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>();

  useEffect(() => {
    getSquadNames()
      .then((res) => {
        updateSquadList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleModal = (value: boolean, content?: ReactNode) => {
    if (content) {
      setModalContent(content);
    }
    setModalVisible(value);
  };

  const updateSquadList = (nameList: string[]) => {
    setSquadNames(nameList);
  };

  return (
    <SplitScreen>
      <>
        <DropDown items={squadNames} />
        <Modal visible={modalVisible} setVisible={toggleModal}>
          {modalContent}
        </Modal>
        <Table data={data}>
          <ActionButton
            text={"Add New Squad"}
            icon={addIcon}
            type={buttonTypes[0]}
            fn={(value) => toggleModal(value, <AddSquad updateSquadList={updateSquadList} />)}
          />
          <ActionButton
            text={"Delete Squad"}
            icon={deleteIcon}
            type={buttonTypes[1]}
            fn={(value) => toggleModal(value, <DeleteSquad />)}
          />
        </Table>
        <AddPlayer />
      </>
      <>
        <DropDown items={["3-4-3", "4-3-3", "4-4-2", "5-3-2"]} placeHolder={"Formation"} />
        <Field />
      </>
    </SplitScreen>
  );
};
