import { useContext, useState } from "react";
import { DialogModalContext } from "./DialogModal";
import { MdWarning } from "react-icons/md";
import { Player, Squad } from "../../types/teamTypes";
import { deletePlayer, getSquadPlayers } from "../../api/PlayerApi";
import { wait } from "../../utils/utils";
import { AxiosError } from "axios";
import { Message } from "../../types/utilityTypes";

interface DeletePlayerProps {
  player: Player;
  squad?: Squad;
  update: (playerList: Player[]) => void;
}

export const DeletePlayer = ({ player, squad, update }: DeletePlayerProps) => {
  const defaultMsg = {
    message: `Delete player #${player.number}, ${player.firstName} ${player.lastName} from ${
      squad?.name ?? "squad"
    }?`,
  };

  const modalContext = useContext(DialogModalContext);
  const [message, setMessage] = useState<Message>(defaultMsg);

  const handleOnConfirm = async () => {
    if (!player.id || !squad?.id) {
      return;
    }

    try {
      const deleteResponse = await deletePlayer(player.id);
      const getResponse = await getSquadPlayers(squad.id);
      const playerList = getResponse.data;
      update(playerList);

      setMessage({ type: "success", message: deleteResponse.data });
      await wait(1000);
      handleOnClose();
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        setMessage({ type: "error", message: e.response.data });
      }
    }
  };

  const handleOnClose = () => {
    modalContext?.handleOnClose();
  };

  return (
    <div className="modal-container">
      <h2 className="modal-header header-negative">
        <MdWarning />
        Delete Player
      </h2>
      <div className="modal-body">
        <p className={message.type}>{message.message}</p>
      </div>
      <div className="modal-footer">
        {message.type !== "success" && (
          <>
            <button className="modal-btn btn-negative" onClick={handleOnConfirm}>
              Confirm
            </button>
            <button className="modal-btn btn-neutral" onClick={handleOnClose}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};
