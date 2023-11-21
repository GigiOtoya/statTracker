import { Player } from "../types/types";
import { DropDown } from "./DropDown";
import { Field } from "./Field";
import { Table } from "./Table";
import mockData from "../utils/MOCK_DATA.json";
import { useState } from "react";

export const SquadBuilder = () => {
  const [data, setData] = useState<Player[]>(mockData);
  const items: string[] = ["Squad 1", "Squad 2"];

  return (
    <div className="main-container">
      <div className="left">
        <DropDown items={items} />
        <Table data={data} />
      </div>
      <div className="right">
        <Field />
      </div>
    </div>
  );
};
