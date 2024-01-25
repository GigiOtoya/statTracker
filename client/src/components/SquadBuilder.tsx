import { Player, UpdatePlayerProperties, Squad } from "../types/teamTypes";
import { buttonTypes } from "../types/utilityTypes";
import { DropDown } from "./dropdown/DropDown";
import { Table } from "./table/Table";
import { SplitScreen } from "../Layouts/SplitScreen";
import { ActionButton } from "./actionButton/ActionButton";
import { AddSquad } from "./modals/AddSquad";
import { DeleteSquad } from "./modals/DeleteSquad";
import addIcon from "../assets/add.svg";
import deleteIcon from "../assets/delete.svg";
import { ReactNode, useEffect, useState } from "react";
import { getSquadList } from "../api/SquadApi";
import { getSquadPlayers } from "../api/PlayerApi";
import { RightPane } from "./rightPane/RightPane";
import { MdOutlineEdit } from "react-icons/md";
import { DialogModal } from "./modals/DialogModal";

export const SquadBuilder = () => {
  const [squadList, setSquadList] = useState<Squad[]>([]);
  const [selectedSquad, setSelectedSquad] = useState<Squad>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [modal, setModal] = useState<ReactNode>();

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
      localStorage.setItem("selectedSquad", JSON.stringify(selectedSquad));

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

  const updateSquadName = (name: string) => {
    setSelectedSquad((prevSquad) => {
      if (!prevSquad) {
        return prevSquad;
      }
      return { ...prevSquad, name: name };
    });
  };

  const changeSelectedSquad = (index: number) => {
    const squad = squadList[index];
    setSelectedSquad(squad);
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

  const editModal = () => {
    setModal(
      <AddSquad squad={selectedSquad} update={updateSquadName} updateList={updateSquadList} />
    );
  };

  const newModal = () => {
    setModal(<AddSquad update={updateSquadName} updateList={updateSquadList} />);
  };

  const deleteModal = () => {
    setModal(<DeleteSquad squad={selectedSquad} />);
  };

  const hideModal = () => {
    setModal(null);
  };

  const isVisible = () => {
    return modal ? true : false;
  };

  return (
    <SplitScreen>
      <>
        {isVisible() && (
          <DialogModal visible={isVisible()} onClose={hideModal}>
            {modal}
          </DialogModal>
        )}
        <DropDown
          items={squadList.map((s) => s.name)}
          selected={selectedSquad?.name}
          placeHolder="Select Squad"
          switchItem={changeSelectedSquad}
        >
          <MdOutlineEdit className="action-icon" onClick={editModal} />
          <ActionButton text={"New Squad"} icon={addIcon} type={buttonTypes[0]} fn={newModal} />
        </DropDown>

        <Table data={players} updateData={updateSquadPlayers} selectedSquad={selectedSquad}>
          <ActionButton {...deleteProps} fn={deleteModal} />
          <ActionButton text={"Add New Squad"} icon={addIcon} type={buttonTypes[0]} fn={() => {}} />
        </Table>
      </>
      <>
        <RightPane players={players} updatePlayerProperties={updatePlayerProperties} />
      </>
    </SplitScreen>
  );
};

const deleteProps = { text: "Delete Squad", icon: deleteIcon, type: buttonTypes[1] };
