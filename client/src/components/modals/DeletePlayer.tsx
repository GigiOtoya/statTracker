import { useContext } from "react";
import { DialogModalContext } from "./DialogModal";
import { MdWarning } from "react-icons/md";
import { Player } from "../../types/teamTypes";

interface DeletePlayerProps {
  player: Player;
  squadName?: string;
}

export const DeletePlayer = ({ player, squadName }: DeletePlayerProps) => {
  const modalContext = useContext(DialogModalContext);

  const handleOnClick = () => {
    modalContext?.handleOnClose();
  };

  return (
    <div className="modal-container">
      <h2 className="modal-header header-negative">
        <MdWarning />
        Delete Player
      </h2>
      <div className="modal-body">
        <p>
          {`Delete player #${player.number}, ${player.firstName} ${player.lastName} from ${
            squadName ?? "squad"
          }?`}
        </p>
      </div>
      <div className="modal-footer">
        <button className="modal-btn btn-negative">Confirm</button>
        <button className="modal-btn btn-neutral" onClick={handleOnClick}>
          Cancel
        </button>
      </div>
    </div>
  );
};
