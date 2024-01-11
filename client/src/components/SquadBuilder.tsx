import { Player, DropdownItem, UpdatePlayerProperties } from "../types/teamTypes";
import { buttonTypes } from "../types/utilityTypes";
import { DropDown } from "./dropdown/DropDown";
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
import { RightPane } from "./rightPane/RightPane";

export const SquadBuilder = () => {
  const [squadList, setSquadList] = useState<DropdownItem[]>([]);
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

  const changeSelectedSquad = (id: number) => {
    setSelectedSquad(id);
  };

  const updateSquadPlayers = (playerList: Player[]) => {
    setPlayers(playerList);
  };

  const updatePlayerProperties = (playerId: number, updatedProperties: UpdatePlayerProperties) => {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        if (player.id === playerId) {
          return { ...player, ...updatedProperties };
        }
        return player;
      });
    });
  };

  const updateSquadList = (items: DropdownItem[]) => {
    setSquadList(items);
  };

  const changeSelectedFormation = (id: number) => {};

  const toggleModal = (value: boolean, content?: ReactNode) => {
    if (content) {
      setModalContent(content);
    }
    setModalVisible(value);
  };

  return (
    <SplitScreen>
      <>
        <DropDown items={squadList} placeHolder="Select Squad" switchItem={changeSelectedSquad}>
          <ActionButton
            text={"Add New Squad"}
            icon={addIcon}
            type={buttonTypes[0]}
            fn={(value) => toggleModal(value, <AddSquad updateSquadList={updateSquadList} />)}
          />
        </DropDown>
        <Modal visible={modalVisible} setVisible={toggleModal}>
          {modalContent}
        </Modal>
        <Table data={players} updateData={updateSquadPlayers} selectedSquad={selectedSquad}>
          <ActionButton
            text={"Delete Squad"}
            icon={deleteIcon}
            type={buttonTypes[1]}
            fn={(value) => toggleModal(value, <DeleteSquad />)}
          />
          <ActionButton
            text={"Add New Squad"}
            icon={addIcon}
            type={buttonTypes[0]}
            fn={(value) => toggleModal(value, <AddSquad updateSquadList={updateSquadList} />)}
          />
        </Table>
      </>
      <>
        <RightPane players={players} updatePlayerProperties={updatePlayerProperties} />
      </>
    </SplitScreen>
  );
};
