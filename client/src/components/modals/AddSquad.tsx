export const AddSquad = () => {
  return (
    <div className="modal-container">
      <h2 className="modal-header header-positive"> Create New Team</h2>
      <div className="modal-body">
        <div>
          <label>Enter team name: </label>
        </div>
        <input type="text" required />
        <button>Submit</button>
      </div>
    </div>
  );
};
