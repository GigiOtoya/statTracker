import { Player } from "../types/types";
import { useState } from "react";
import mockData from "../utils/MOCK_DATA.json";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

interface TableProps {
  data: Player[];
}
export const Table = ({ data }: TableProps) => {
  const columnHelper = createColumnHelper<Player>();
  const columns = [
    columnHelper.accessor("number", {
      header: () => "Number",
      cell: (info) => info.renderValue(),
    }),

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

  // const [data, setData] = useState<Player[]>(mockData);
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="table-container">
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
    </div>
  );
};
