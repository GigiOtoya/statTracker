import { useContext } from "react";
import { ModalContext } from "./Modal";
import { useState } from "react";
import { addSquad } from "../../api/SquadApi";

export const AddSquad = () => {
  const modalContext = useContext(ModalContext);
  const [name, setName] = useState<string>("");

  const handleSubmit = () => {
    const squadName = { name };
    addSquad(squadName.name)
      .then((res) => {
        console.log("ok");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="modal-container">
      <h2 className="modal-header header-positive"> Create New Team</h2>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
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
        </form>
      </div>
      <div className="modal-footer">
        <button className="modal-btn">Add Team</button>
        <button className="modal-btn" onClick={modalContext?.closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};
