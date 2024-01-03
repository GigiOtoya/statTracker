import { Player, Squad } from "../../types/types";
import { buttonTypes } from "../../types/utilityTypes";
import { ReactNode, useState } from "react";
import { Tooltip } from "../tooltip/Tooltip";
import { ActionButton } from "../actionButton/ActionButton";
import { AddPlayer } from "../addPlayer/AddPlayer";
import addIcon from "../../assets/add.svg";

import "./Table.css";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
  SortingState,
} from "@tanstack/react-table";

interface TableProps {
  data: Player[];
  updateData: (playerList: Player[]) => void;
  selectedSquad?: number;
  children: ReactNode[];
}
export const Table = ({ data, children, selectedSquad, updateData }: TableProps) => {
  const [left, right] = children;

  const columnHelper = createColumnHelper<Player>();
  const columns = [
    columnHelper.accessor("number", {
      id: "Number",
      header: "#",
      cell: (info) => info.renderValue(),
    }),

    columnHelper.accessor("position", {
      id: "Position",
      header: () => <Tooltip text={"POS"} tooltipText={"Position"} />,
      cell: (info) => info.renderValue(),
      enableSorting: false,
    }),

    columnHelper.group({
      header: "Name",
      columns: [
        columnHelper.accessor("firstName", {
          id: "First Name",
          header: () => "First",
          cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor("lastName", {
          id: "Last Name",
          header: () => "Last",
          cell: (info) => info.renderValue(),
        }),
      ],
    }),

    columnHelper.group({
      header: "Attributes",
      columns: [
        columnHelper.accessor("speed", {
          id: "Speed",
          header: () => <Tooltip text={"SPD"} tooltipText={"Speed"} />,
          cell: (info) => info.renderValue(),
          enableSorting: false,
        }),
        columnHelper.accessor("passing", {
          id: "Passing",
          header: () => <Tooltip text={"PAS"} tooltipText={"Passing"} />,
          cell: (info) => info.renderValue(),
          enableSorting: false,
        }),
        columnHelper.accessor("shooting", {
          id: "Shooting",
          header: () => <Tooltip text={"SHO"} tooltipText={"Shooting"} />,
          cell: (info) => info.renderValue(),
          enableSorting: false,
        }),
        columnHelper.accessor("defending", {
          id: "Defending",
          header: () => <Tooltip text={"DEF"} tooltipText={"Defending"} />,
          cell: (info) => info.renderValue(),
          enableSorting: false,
        }),
        columnHelper.accessor("dribbling", {
          id: "Dribbling",
          header: () => <Tooltip text={"DRB"} tooltipText={"Dribbling"} />,
          cell: (info) => info.renderValue(),
          enableSorting: false,
        }),
        columnHelper.accessor("physical", {
          id: "Physical",
          header: () => <Tooltip text={"PHY"} tooltipText={"Physical"} />,
          cell: (info) => info.renderValue(),
          enableSorting: false,
        }),
        columnHelper.accessor("vision", {
          id: "Vision",
          header: () => <Tooltip text={"VIS"} tooltipText={"Vision"} />,
          cell: (info) => info.renderValue(),
          enableSorting: false,
        }),
      ],
    }),
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const [playerEdit, setPlayerEdit] = useState<boolean>(false);

  const handleToggleEdit = () => {
    setPlayerEdit(!playerEdit);
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <div className="table-header-left">Manage Squad</div>
        <div className="table-header-right">
          <div className="table-header-right-item">{left}</div>
          <div className="table-header-right-item">
            {selectedSquad && (
              <ActionButton
                text={playerEdit ? "Cancel Add Player" : "Add New Player"}
                icon={playerEdit ? "" : addIcon}
                type={buttonTypes[0]}
                fn={handleToggleEdit}
              />
            )}
          </div>
        </div>
      </div>
      {playerEdit && <AddPlayer selectedSquad={selectedSquad} updatePlayers={updateData} />}
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort() ? "cursor-pointer select-none" : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} data-label={cell.column.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
