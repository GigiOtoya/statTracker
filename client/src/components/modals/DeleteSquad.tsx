import { useContext } from "react";
import { MdWarning } from "react-icons/md";
import { Squad } from "../../types/teamTypes";
import { DialogModalContext } from "./DialogModal";

interface DeleteSquadProps {
  squad?: Squad;
}

export const DeleteSquad = ({ squad }: DeleteSquadProps) => {
  const modalContext = useContext(DialogModalContext);

  const handleOnClick = () => {
    // delete api call

    modalContext?.handleOnClose();
  };

  return (
    <div className="modal-container">
      <h2 className="modal-header header-negative">
        <MdWarning />
        Delete Team
      </h2>
      <div className="modal-body">
        <p>Deleting a squad will delete the squad along with all its players.</p>
      </div>
      <div className="modal-footer">
        <button className="modal-btn btn-negative">Delete</button>
        <button className="modal-btn btn-neutral" onClick={handleOnClick}>
          Cancel
        </button>
      </div>
    </div>
  );
};
