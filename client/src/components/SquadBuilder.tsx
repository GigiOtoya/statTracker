import { Player, UpdatePlayerProperties, Squad } from "../types/teamTypes";
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
  const [squadList, setSquadList] = useState<Squad[]>([]);
  const [selectedSquad, setSelectedSquad] = useState<Squad>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>();

  useEffect(() => {
    getSquadList()
      .then((res) => {
        setSquadList(res.data);
        console.log(res.data);
      })
      .then(() => {
        const storedSquad = localStorage.getItem("selectedSquad");
        if (storedSquad) {
          const squad: Squad = JSON.parse(storedSquad);
          console.log(squad);
          setSelectedSquad(squad);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (selectedSquad) {
      getSquadPlayers(selectedSquad.id)
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

  const changeSelectedSquad = (index: number) => {
    const squad = squadList[index];
    setSelectedSquad(squad);
    localStorage.setItem("selectedSquad", JSON.stringify(squad));
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

  const updateSquadList = (newSquadList: Squad[]) => {
    setSquadList(newSquadList);
  };

  const toggleModal = (value: boolean, content?: ReactNode) => {
    if (content) {
      setModalContent(content);
    }
    setModalVisible(value);
  };

  return (
    <SplitScreen>
      <>
        <DropDown
          items={squadList.map((s) => s.name)}
          selected={selectedSquad?.name}
          placeHolder="Select Squad"
          switchItem={changeSelectedSquad}
        >
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
