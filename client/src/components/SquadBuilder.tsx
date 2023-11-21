import { Player } from "../types/types";
import { DropDown } from "./DropDown";
import { PlayerItem } from "./PlayerItem";
import { useMemo, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import mockData from "../utils/MOCK_DATA.json";

export const SquadBuilder = () => {
  const columnHelper = createColumnHelper<Player>();
  const columns = [
    columnHelper.accessor("number", {
      header: () => "Number",
      cell: (info) => info.renderValue(),
    }),

    // columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    //   id: "Full Name",
    // }),

    columnHelper.accessor("position", {
      header: () => "Position",
      cell: (info) => info.renderValue(),
    }),

    columnHelper.group({
      header: "Name",
      columns: [
        columnHelper.accessor("firstName", {
          header: () => "First",
          cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor("lastName", {
          header: () => "Last",
          cell: (info) => info.renderValue(),
        }),
      ],
    }),

    columnHelper.group({
      header: "Attributes",
      columns: [
        columnHelper.accessor("pace", {
          header: () => "Pace",
          cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor("passing", {
          header: () => "Passing",
          cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor("shot", {
          header: () => "Shooting",
          cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor("defending", {
          header: () => "Defending",
          cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor("dribble", {
          header: () => "Dribbling",
          cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor("physical", {
          header: () => "Physical",
          cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor("vision", {
          header: () => "Vision",
          cell: (info) => info.renderValue(),
        }),
      ],
    }),
  ];

  const [data, setData] = useState<Player[]>(mockData);
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  const items: string[] = ["Squad 1", "Squad 2"];
  // const player: Player = {
  //   number: 10,
  //   firstName: "first_name",
  //   lastName: "last_name",
  //   position: "CM",
  //   pace: 10,
  //   shot: 10,
  //   physical: 10,
  //   defending: 10,
  //   dribble: 10,
  //   passing: 10,
  //   vision: 10,
  //   height: "5'9",
  //   weight: 150,
  // };

  return (
    <div className="squad-builder-container">
      <DropDown items={items} />

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {" "}
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="squad-builder">
        <div className="table-header">
          <span className="stat number"> # </span>
          <span className="col-name"> Name </span>
          <span className="stat pos"> POS </span>
          <span className="stat pace"> PAC </span>
          <span className="stat shooting"> SHO </span>
          <span className="stat physical"> PHY </span>
          <span className="stat defending"> DEF </span>
          <span className="stat dribbling"> DRI </span>
          <span className="stat passing"> PAS </span>
          <span className="stat vision"> VIS </span>
          <span className="stat height"> Ht </span>
          <span className="stat weight"> Wt </span>
        </div>
        <div className="player-list">
          <PlayerItem player={player} />
        </div>
      </div> */}
    </div>
  );
};
