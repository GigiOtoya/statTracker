import { Player, MutablePlayerProperties, Squad } from "../types/teamTypes";
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
import { configToken } from "../api/Api";
import { getSquadList } from "../api/SquadApi";
import { getSquadPlayers } from "../api/PlayerApi";
import { RightPane } from "./rightPane/RightPane";
import { MdOutlineEdit } from "react-icons/md";
import { DialogModal } from "./modals/DialogModal";
import { useAuth } from "@clerk/clerk-react";

export const SquadBuilder = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();

  if (isLoaded && isSignedIn) {
    configToken(getToken);
  }

  const [squadList, setSquadList] = useState<Squad[]>([]);
  const [selectedSquad, setSelectedSquad] = useState<Squad>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [modal, setModal] = useState<ReactNode>();

  useEffect(() => {
    getSquadList()
      .then((res) => {
        setSquadList(res.data);
        console.log(res);
      })
      .then(() => {
        const storedSquad = localStorage.getItem("selectedSquad");
        if (storedSquad) {
          const squad: Squad = JSON.parse(storedSquad);
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
          // console.log(players);
          setPlayers(players);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setPlayers([]);
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

  const updatePlayerProperties = (playerId: number, updatedProperties: MutablePlayerProperties) => {
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

  const onSquadDeletion = (newSquadList: Squad[]) => {
    updateSquadList(newSquadList);
    setSelectedSquad(undefined);
    localStorage.removeItem("selectedSquad");
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
    setModal(<DeleteSquad squad={selectedSquad} onDelete={onSquadDeletion} />);
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
          {selectedSquad && <MdOutlineEdit className="action-icon" onClick={editModal} />}
          <ActionButton {...newProps} onClick={newModal} />
          {selectedSquad && <ActionButton {...deleteProps} onClick={deleteModal} />}
        </DropDown>

        <Table data={players} updateData={updateSquadPlayers} selectedSquad={selectedSquad} />
      </>
      <>
        <RightPane
          selectedSquad={selectedSquad}
          players={players}
          updatePlayerProperties={updatePlayerProperties}
        />
      </>
    </SplitScreen>
  );
};

const newProps = { text: "New Squad", icon: addIcon, className: buttonTypes[0] };
const deleteProps = { text: "Delete Squad", icon: deleteIcon, className: buttonTypes[2] };
