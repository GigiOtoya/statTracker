import { useContext, useState } from "react";
import { DialogModalContext } from "./DialogModal";
import { MdWarning } from "react-icons/md";
import { Player, Squad } from "../../types/teamTypes";
import { deletePlayer, getSquadPlayers } from "../../api/PlayerApi";
import { wait } from "../../utils/utils";
import { AxiosError } from "axios";
import { Message } from "../../types/utilityTypes";
import styles from "./Modal.module.css";

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
    <div className={styles.container}>
      <h2 className={`${styles.header} ${styles.negative}`}>
        <MdWarning />
        Delete Player
      </h2>
      <div className={styles.body}>
        <p className={message.type}>{message.message}</p>
      </div>
      <div className={styles.footer}>
        {message.type !== "success" && (
          <>
            <button className={`${styles.btn} ${styles.negative}`} onClick={handleOnConfirm}>
              Confirm
            </button>
            <button className={`${styles.btn} ${styles.neutral}`} onClick={handleOnClose}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};
