import { useContext, useState } from "react";
import { MdWarning } from "react-icons/md";
import { Squad } from "../../types/teamTypes";
import { DialogModalContext } from "./DialogModal";
import { deleteSquad, getSquadList } from "../../api/SquadApi";
import { wait } from "../../utils/utils";
import { AxiosError } from "axios";
import { Message } from "../../types/utilityTypes";
import styles from "./Modal.module.css";

interface DeleteSquadProps {
  selectedSquad?: Squad;
  onDelete: (squadList: Squad[]) => void;
}

const defaultMsg = {
  message: "Deleting a squad will remove the squad and all its players",
};

export const DeleteSquad = ({ selectedSquad, onDelete }: DeleteSquadProps) => {
  const modalContext = useContext(DialogModalContext);
  const [message, setMessage] = useState<Message>(defaultMsg);

  const handleOnClick = async () => {
    if (!selectedSquad) {
      return;
    }

    try {
      const deleteResponse = await deleteSquad(selectedSquad?.id);
      const getResponse = await getSquadList();
      const squadList: Squad[] = getResponse.data;
      onDelete(squadList);

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
        Delete Team
      </h2>
      <div className={styles.body}>
        <p className={message.type}>{message.message}</p>
      </div>
      <div className={styles.footer}>
        {message.type !== "success" && (
          <>
            <button className={`${styles.btn} ${styles.negative}`} onClick={handleOnClick}>
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
