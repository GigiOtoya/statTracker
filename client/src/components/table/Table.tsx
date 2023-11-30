import { Player } from "../../types/types";
import { ReactNode, useState } from "react";
import { Tooltip } from "../tooltip/Tooltip";
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
  children?: ReactNode;
}
export const Table = ({ data, children }: TableProps) => {
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
        columnHelper.accessor("pace", {
          header: () => <Tooltip text={"SPD"} tooltipText={"Speed"} />,
          cell: (info) => info.renderValue(),
          enableSorting: false,
        }),
        columnHelper.accessor("passing", {
          header: () => <Tooltip text={"PAS"} tooltipText={"Passing"} />,
          cell: (info) => info.renderValue(),
          enableSorting: false,
        }),
        columnHelper.accessor("shot", {
          header: () => <Tooltip text={"SHO"} tooltipText={"Shooting"} />,
          cell: (info) => info.renderValue(),
          enableSorting: false,
        }),
        columnHelper.accessor("defending", {
          header: () => <Tooltip text={"DEF"} tooltipText={"Defending"} />,
          cell: (info) => info.renderValue(),
          enableSorting: false,
        }),
        columnHelper.accessor("dribble", {
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

  // const [data, setData] = useState<Player[]>(mockData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="table-container">
      <div className="table-header">
        <span className="table-header-left">Manage Squad</span>
        <span className="table-header-right">{children}</span>
      </div>
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
