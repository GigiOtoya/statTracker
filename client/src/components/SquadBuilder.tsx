import { Player } from "../types/types";
import { DropDown } from "./DropDown";
import { Field } from "./Field";
import { Table } from "./Table";
import { SplitScreen } from "../Layouts/SplitScreen";
import mockData from "../utils/MOCK_DATA.json";
import { useEffect, useState } from "react";
import { getSquadData, getAllSquads, getSquadNames } from "../api/SquadApi";
import { error } from "console";

export const SquadBuilder = () => {
  const [data, setData] = useState<Player[]>(mockData);
  const [squadNames, setSquadNames] = useState<String[]>([]);

  useEffect(() => {
    getSquadNames()
      .then((res) => {
        setSquadNames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <SplitScreen>
      <>
        <DropDown items={squadNames} />
        <Table data={data} />
      </>
      <>
        <DropDown items={["3-4-3", "4-3-3", "4-4-2", "5-3-2"]} placeHolder={"Formation"} />
        <Field />
      </>
    </SplitScreen>
  );
};
