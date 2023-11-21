import { Player } from "../types/types";
import { DropDown } from "./DropDown";
import { Field } from "./Field";
import { Table } from "./Table";
import { SplitScreen } from "../Layouts/SplitScreen";
import mockData from "../utils/MOCK_DATA.json";
import { useState } from "react";

export const SquadBuilder = () => {
  const [data, setData] = useState<Player[]>(mockData);
  const items: string[] = ["Squad 1", "Squad 2"];

  return (
    <SplitScreen>
      <>
        <DropDown items={items} />
        <Table data={data} />
      </>
      <>
        <DropDown items={["3-4-3", "4-3-3", "4-4-2", "5-3-2"]} />
        <Field />
      </>
    </SplitScreen>
  );
};
