import { useContext } from "react";
import { ModalContext } from "./Modal";
import { useState } from "react";
import { addSquad, getSquadList } from "../../api/SquadApi";
import { DropdownItem, Squad } from "../../types/teamTypes";

interface Props {
  updateSquadList: (squadList: DropdownItem[]) => void;
}

export const AddSquad = ({ updateSquadList }: Props) => {
  const modalContext = useContext(ModalContext);
  const [name, setName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const squad: Squad = { name, players: [] };
    console.log(squad);

    await addSquad(squad)
      .then((res) => {
        console.log(res.status, res.data);
      })
      .catch((err) => console.log(err));

    await getSquadList()
      .then((res) => {
        updateSquadList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    handleClose();
  };

  const handleClose = () => {
    setName("");
    modalContext?.closeModal();
  };

  return (
    <div className="modal-container">
      <h2 className="modal-header header-positive"> Create New Team</h2>
      <div className="modal-body">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Enter team name:</label>
          </div>
          <div>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="modal-btn" type="submit">
              Add Team
            </button>
            <button className="modal-btn" type="button" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
