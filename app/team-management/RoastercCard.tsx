import React, { MouseEvent, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/Card/Card";
import { Draggable, Droppable } from "../../components/DragAndDrop";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/Table";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";
import Button from "../../components/Button/Button";
import { POSITIONS } from "../entities/constants";
import { SortFunction } from "@/lib/utils";
import { FBPlayer, notesDB } from "@/_api/firebase-api";
import { Player } from "@/_api/basketball-api";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog";
import { Textarea } from "@/components/TextArea";
import Link from "next/link";

interface RoasterCardProps {
  roster: FBPlayer[];
  totalSalary: number;
  budget: number;
  remainingBudget: number;
  onPlayerClick: (player: FBPlayer) => void;
}

type SortField =
  | "name"
  | "age"
  // | "salary"
  // | "contractYears"
  | "position"
  | undefined;

const RoasterCard: React.FC<RoasterCardProps> = ({
  roster: roasterPlayers,
  totalSalary,
  budget,
  remainingBudget,
  onPlayerClick,
}) => {
  const [sortField, setSortField] = useState<SortField>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">();

  const [notePlayer, setNotePlayer] = useState<Player>();
  const [note, setNote] = useState("");
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleNotesSave = async (playerId: number) => {
    try {
      setIsNotesDialogOpen(false);
      await notesDB.add(playerId, note);
    } catch {
      console.error("Error adding note");
    }
  };

  const openNoteDialog = async (
    e: MouseEvent<HTMLButtonElement>,
    player: Player
  ) => {
    e.stopPropagation();
    setNotePlayer(player);
    setNote("");
    const fetchedNote = await notesDB.get(player.id);
    setNote(fetchedNote);
    setIsNotesDialogOpen(true);
  };

  const sortedPlayers = sortField
    ? [...roasterPlayers].sort((a, b) =>
        SortFunction(a[sortField], b[sortField], sortDirection, POSITIONS)
      )
    : roasterPlayers;

  useEffect(() => {
    setSortField(undefined);
  }, [roasterPlayers]);

  const SortIcon =
    sortDirection === "asc" ? (
      <ChevronUp className="inline text-gray-500" size={15} />
    ) : (
      <ChevronDown className="inline text-gray-500" size={15} />
    );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Team Roster</CardTitle>
        </CardHeader>
        <CardContent>
          <Link href="/team-management/budget">
            <div className="mb-4 p-2  border-2 border-dotted rounded-md hover:bg-orange-50">
              <div className="bg-gray-200 h-4 rounded-full">
                <div
                  className={`h-4 rounded-full max-w-full ${
                    remainingBudget >= 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{ width: `${(totalSalary / budget) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                <span>Total Salary: ${totalSalary.toLocaleString()}</span>
                <span>
                  Remaining:{" "}
                  <span
                    className={
                      remainingBudget >= 0
                        ? "text-green-500 font-bold"
                        : "text-red-500 font-bold"
                    }
                  >
                    ${remainingBudget.toLocaleString()}
                  </span>
                </span>
              </div>
            </div>
          </Link>

          <Droppable droppableId="roster">
            {(provided) => (
              <Table
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2 overflow-hidden"
              >
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className=" w-1/3"
                      onClick={() => handleSort("name")}
                    >
                      Name {sortField === "name" && SortIcon}
                    </TableHead>
                    <TableHead
                      className="w-1/6"
                      onClick={() => handleSort("position")}
                    >
                      Position {sortField === "position" && SortIcon}
                    </TableHead>
                    <TableHead
                      className=" w-1/6"
                      onClick={() => handleSort("age")}
                    >
                      Age {sortField === "age" && SortIcon}
                    </TableHead>
                    <TableHead
                      className=" w-1/6"
                      // onClick={() => handleSort("salary")}
                    >
                      Salary {/*{sortField === "salary" && SortIcon} */}
                    </TableHead>
                    <TableHead
                      className=" w-1/6"
                      // onClick={() => handleSort("contractYears")}
                    >
                      Contract Years{" "}
                      {/*{sortField === "contractYears" && SortIcon} */}
                    </TableHead>
                    <TableHead className="w-0 ">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedPlayers.map((player, index) => (
                    <Draggable
                      key={player.id}
                      draggableId={player.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <TableRow
                          ref={provided.innerRef}   
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-4 rounded shadow w-full"
                          onClick={() => onPlayerClick(player)}
                        >
                          <TableCell className="">{player.name}</TableCell>
                          <TableCell>{player.position}</TableCell>
                          <TableCell>{player.age}</TableCell>
                          <TableCell>{player.salary || "N/A"}</TableCell>
                          <TableCell>{player.contract || "N/A"}</TableCell>
                          <TableCell>
                            <Button
                              variant="icon"
                              className="h-8 w-8"
                              onClick={(e) => openNoteDialog(e, player)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TableBody>
              </Table>
            )}
          </Droppable>
        </CardContent>
      </Card>
      {notePlayer && (
        <Dialog open={isNotesDialogOpen} onOpenChange={setIsNotesDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notes for {notePlayer.name}</DialogTitle>
            </DialogHeader>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter notes here..."
              className="min-h-[200px]"
            />
            <DialogFooter>
              <Button onClick={() => handleNotesSave(notePlayer.id)}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default RoasterCard;
