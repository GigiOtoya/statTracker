import { useContext } from "react";
import { useState } from "react";
import { addSquad, editSquad, getSquadList } from "../../api/SquadApi";
import { Squad, NewSquad } from "../../types/teamTypes";
import { AxiosError } from "axios";
import { wait } from "../../utils/utils";
import { Input } from "../input/Input";
import { DialogModalContext } from "./DialogModal";
import styles from "./Modal.module.css";

interface Props {
  squad?: Squad;
  update?: (name: string) => void;
  updateList: (squadList: Squad[]) => void;
}

export const AddSquad = ({ squad, update, updateList }: Props) => {
  const modalContext = useContext(DialogModalContext);

  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newSquad: NewSquad = { name };

    try {
      if (squad) {
        const editSquadResponse = await editSquad(squad.id, newSquad);
        update!(newSquad.name);
        setSuccess(editSquadResponse.data);
      } else {
        const addSquadResponse = await addSquad(newSquad);
        setSuccess(addSquadResponse.data);
      }

      const squadListResponse = await getSquadList();
      updateList(squadListResponse.data);

      await wait(1000);
      handleClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data);
      }
    }
  };

  const handleClose = () => {
    setName("");
    setError(null);
    setSuccess(null);
    modalContext?.handleOnClose();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError(null);
    }
    setName(e.currentTarget.value);
  };
  // "modal-header header-positive"
  return (
    <div className={styles.container}>
      <h2 className={`${styles.header} ${styles.positive}`}>{squad ? "Edit Team" : " New Team"}</h2>
      <div className={styles.body}>
        <form onSubmit={(e) => handleSubmit(e)}>
          {success ? (
            <p className="success">{success}</p>
          ) : (
            <>
              <Input
                type="text"
                label={squad ? "Update team name" : "New team name"}
                required
                value={name}
                onChange={handleOnChange}
                placeholder={squad ? squad.name : "team name..."}
                minLength={1}
                maxLength={50}
              />
              <div className="error">{error}</div>
              <div className={styles.footer}>
                <button
                  className={`${styles.btn} ${styles.positive}`}
                  type="submit"
                  disabled={squad?.name === name}
                >
                  {squad ? "Update Team" : "Create Team"}
                </button>
                <button
                  className={`${styles.btn} ${styles.neutral}`}
                  type="button"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
