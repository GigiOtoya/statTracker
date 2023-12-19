import { Player, Squad, buttonTypes } from "../../types/types";
import { ReactNode, useState } from "react";
import { Tooltip } from "../tooltip/Tooltip";
import { ActionButton } from "../actionButton/ActionButton";
import { ButtonType } from "../../types/types";
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
      header: () => "Number",
      cell: (info) => info.renderValue(),
    }),

    columnHelper.accessor("position", {
      header: () => "Position",
      cell: (info) => info.renderValue(),
      enableSorting: false,
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
        columnHelper.accessor("speed", {
          header: () => <Tooltip text={"SPD"} tooltipText={"Speed"} />,
          cell: (info) => info.renderValue(),
          enableSorting: false,
        }),
        columnHelper.accessor("passing", {
          header: () => <Tooltip text={"PAS"} tooltipText={"Passing"} />,
          cell: (info) => info.renderValue(),
          enableSorting: false,
        }),
        columnHelper.accessor("shooting", {
          header: () => <Tooltip text={"SHO"} tooltipText={"Shooting"} />,
          cell: (info) => info.renderValue(),
          enableSorting: false,
        }),
        columnHelper.accessor("defending", {
          header: () => <Tooltip text={"DEF"} tooltipText={"Defending"} />,
          cell: (info) => info.renderValue(),
          enableSorting: false,
        }),
        columnHelper.accessor("dribbling", {
          header: () => <Tooltip text={"DRB"} tooltipText={"Dribbling"} />,
          cell: (info) => info.renderValue(),
          enableSorting: false,
        }),
        columnHelper.accessor("physical", {
          header: () => <Tooltip text={"PHY"} tooltipText={"Physical"} />,
          cell: (info) => info.renderValue(),
          enableSorting: false,
        }),
        columnHelper.accessor("vision", {
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
            <ActionButton
              text={playerEdit ? "Cancel Add Player" : "Add New Player"}
              icon={playerEdit ? "" : addIcon}
              type={buttonTypes[0]}
              fn={handleToggleEdit}
            />
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
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
