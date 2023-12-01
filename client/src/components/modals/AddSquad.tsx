import { useContext } from "react";
import { ModalContext } from "./Modal";

export const AddSquad = () => {
  const modalContext = useContext(ModalContext);

  const handleSubmit = () => {};

  return (
    <div className="modal-container">
      <h2 className="modal-header header-positive"> Create New Team</h2>
      <div className="modal-body">
        <div>
          <label>Enter team name: </label>
        </div>
        <div>
          <input type="text" required />
        </div>
      </div>
      <div className="modal-footer">
        <button className="modal-btn">Submit</button>
        <button className="modal-btn" onClick={modalContext?.closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};
