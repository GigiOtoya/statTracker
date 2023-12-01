import warningIcon from "../../assets/warning.svg";
import { useContext } from "react";
import { ModalContext } from "./Modal";

export const DeleteSquad = () => {
  const modalContext = useContext(ModalContext);
  return (
    <div className="modal-container">
      <h2 className="modal-header header-negative">
        <img src={warningIcon} alt="warning" />
        Delete Team
      </h2>
      <div className="modal-body">
        <p>Deleting a squad will delete the squad along with all its players.</p>
      </div>
      <div className="modal-footer">
        <button className="modal-btn">Delete</button>
        <button className="modal-btn" onClick={modalContext?.closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};
