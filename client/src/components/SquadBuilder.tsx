import { Player, Item, buttonTypes } from "../types/types";
import { DropDown } from "./DropDown";
import { Field } from "./Field";
import { Table } from "./table/Table";
import { SplitScreen } from "../Layouts/SplitScreen";
import { ActionButton } from "./actionButton/ActionButton";
import { Modal } from "./modals/Modal";
import { AddSquad } from "./modals/AddSquad";
import { DeleteSquad } from "./modals/DeleteSquad";
import addIcon from "../assets/add.svg";
import deleteIcon from "../assets/delete.svg";
import { useEffect, useState, ReactNode } from "react";
import { getSquadList } from "../api/SquadApi";
import { getSquadPlayers } from "../api/PlayerApi";
import { AddPlayer } from "./addPlayer/AddPlayer";

export const SquadBuilder = () => {
  const [squadList, setSquadList] = useState<Item[]>([]);
  const [selectedSquad, setSelectedSquad] = useState<number>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>();

  useEffect(() => {
    getSquadList()
      .then((res) => {
        setSquadList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (selectedSquad) {
      getSquadPlayers(selectedSquad)
        .then((res) => {
          const players: Player[] = res.data;
          console.log(players);
          setPlayers(players);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedSquad]);

  const fetchSelectedSquad = (id: number) => {
    setSelectedSquad(id);
  };

  const fetchSelectedFormation = (id: number) => {};

  const updateSquadList = (nameList: string[]) => {};

  const toggleModal = (value: boolean, content?: ReactNode) => {
    if (content) {
      setModalContent(content);
    }
    setModalVisible(value);
  };

  return (
    <SplitScreen>
      <>
        <DropDown items={squadList} placeHolder="Select Squad" switchItem={fetchSelectedSquad} />
        <Modal visible={modalVisible} setVisible={toggleModal}>
          {modalContent}
        </Modal>
        <Table data={players}>
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
        {/* <DropDown items={["3-4-3", "4-3-3", "4-4-2", "5-3-2"]} placeHolder={"Formation"} /> */}
        <Field />
      </>
    </SplitScreen>
  );
};
