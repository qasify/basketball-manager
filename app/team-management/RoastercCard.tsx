import React, { useEffect, useState } from "react";
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
import { FBPlayer } from "@/_api/firebase-api";

interface RoasterCardProps {
  roster: FBPlayer[];
  totalSalary: number;
  budget: number;
  remainingBudget: number;
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
}) => {
  const [sortField, setSortField] = useState<SortField>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">();

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
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
    <Card>
      <CardHeader>
        <CardTitle>Team Roster</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
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
                     Contract Years {/*{sortField === "contractYears" && SortIcon} */}
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
                      >
                        <TableCell className="">{player.name}</TableCell>
                        <TableCell>{player.position}</TableCell>
                        <TableCell>{player.age}</TableCell>
                        <TableCell>N/A</TableCell>
                        <TableCell>N/A</TableCell>
                        <TableCell>
                          <Button
                            variant="icon"
                            className="h-8 w-8"
                            // onClick={() => onAddDocument(player.id)}
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
  );
};

export default RoasterCard;
