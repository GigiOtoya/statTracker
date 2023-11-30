import warningIcon from "../../assets/warning.svg";

export const DeleteSquad = () => {
  return (
    <div className="modal-container">
      <h2 className="modal-header header-negative">
        <img src={warningIcon} alt="warning" />
        Delete Team
      </h2>
      <div className="modal-body">
        <p>Deleting a squad will delete the squad along with all its players.</p>
        <button>Submit</button>
      </div>
    </div>
  );
};
