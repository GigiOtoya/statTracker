import { SquadPicker } from "./SquadPicker";

export const SquadBuilder = () => {
  return (
    <div className="squad-builder-container">
      <SquadPicker />

      <div className="squad-builder">
        <div className="row-header">
          <span className="number"> Number </span>
          <span className="name"> Name </span>
          <span className="pos"> POS </span>
          <span className="pace"> PAC </span>
          <span className="shooting"> SHO </span>
          <span className="physical"> PHY </span>
          <span className="defending"> DEF </span>
          <span className="dribbling"> DRI </span>
          <span className="passing"> PAS </span>
          <span className="vision"> VIS </span>
          <span className="height"> Ht </span>
          <span className="weight"> Wt </span>
        </div>
        <div>stuff</div>
      </div>
    </div>
  );
};
