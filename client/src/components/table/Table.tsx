import { Player, Squad, defaultPlayer } from "../../types/teamTypes";
import { buttonTypes } from "../../types/utilityTypes";
import { useState, useMemo } from "react";
import { Tooltip } from "../tooltip/Tooltip";
import { ActionButton } from "../actionButton/ActionButton";
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
import { AddPlayer } from "../addPlayer/AddPlayer";
import { DialogModal } from "../modals/DialogModal";
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
import { DeletePlayer } from "../modals/DeletePlayer";

interface TableProps {
  data: Player[];
  updateData: (playerList: Player[]) => void;
  selectedSquad?: Squad;
}

export const Table = ({ data, selectedSquad, updateData }: TableProps) => {
  const columnHelper = useMemo(() => createColumnHelper<Player>(), []);
  const columns = useMemo(
    () => [
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
      columnHelper.display({
        id: "actions",
        enableHiding: true,
        cell: (props) => {
          return (
            <span className="row-actions">
              <MdOutlineEdit
                className="action-icon edit-icon"
                onClick={() => handleOnClickEdit(props.row.original)}
              />
              <MdDeleteForever
                className="action-icon trash-icon"
                onClick={() => handleOnClickDelete(props.row.original)}
              />
            </span>
          );
        },
      }),
    ],
    [columnHelper]
  );

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
    onRowSelectionChange: setRowSelection,
  });

  type modalAction = "NEW" | "EDIT" | "DELETE";

  const [selectedPlayer, setSelectedPlayer] = useState<Player>(defaultPlayer);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState<modalAction>("NEW");

  const toggleModal = () => {
    setShowModal(!showModal);
    console.log(selectedPlayer);
  };

  const handleRowClick = (player: Player) => {
    console.log("row clicked test...");
  };

  const handleOnClickNew = () => {
    setAction("NEW");
    setSelectedPlayer(defaultPlayer);
    setShowModal(true);
  };

  const handleOnClickEdit = (player: Player) => {
    setAction("EDIT");
    const playerToEdit = { ...player };
    setSelectedPlayer(playerToEdit);
    setShowModal(true);
  };

  const handleOnClickDelete = (player: Player) => {
    setAction("DELETE");
    const playerToDelete = { ...player };
    setSelectedPlayer(playerToDelete);
    setShowModal(true);
  };

  const editFields = (name: string, value: string | number) => {
    setSelectedPlayer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const maxPlayers = 25;
  const canAdd = selectedSquad && data.length < maxPlayers;
  const actionProps = {
    text: "New Player",
    icon: addIcon,
    className: buttonTypes[0],
    fn: handleOnClickNew,
  };

  return (
    <>
      {showModal && (
        <DialogModal visible={showModal} onClose={toggleModal}>
          {action === "NEW" && (
            <AddPlayer
              updatePlayers={updateData}
              player={selectedPlayer}
              editFields={editFields}
              selectedSquad={selectedSquad}
            />
          )}
          {action === "EDIT" && (
            <AddPlayer
              updatePlayers={updateData}
              player={selectedPlayer}
              editFields={editFields}
              selectedSquad={selectedSquad}
            />
          )}
          {action === "DELETE" && (
            <DeletePlayer player={selectedPlayer} squad={selectedSquad} update={updateData} />
          )}
        </DialogModal>
      )}
      <div className="table-container">
        <div className="table-header">
          <div className="table-header-left">
            Manage Players: {data.length ? `${data.length} / ${maxPlayers}` : ""}
          </div>
          <div className="table-header-right">
            <div className="table-header-right-item"></div>
            {canAdd && (
              <div className="table-header-right-item">
                <ActionButton {...actionProps} />
              </div>
            )}
          </div>
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
              <tr key={row.id} onClick={() => handleRowClick(row.original)}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} data-label={cell.column.id !== "actions" ? cell.column.id : ""}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
