import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Card/Card";
import { Draggable, Droppable } from "../DragAndDrop";
import { Player } from "@/types/Player";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Table";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import Button from "../Button/Button";

interface RoasterCardProps {
  roster: Player[];
  totalSalary: number;
  budget: number;
  remainingBudget: number;
}

type SortField = "name" | "age" | "salary" | "contractYears" | undefined;

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

  const sortedPlayers = sortField  ? [...roasterPlayers].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  }) : roasterPlayers;


  useEffect(() => {
    setSortField(undefined)
  }, [roasterPlayers]);

  const SortIcon =
    sortDirection === "asc" ? (
      <ChevronUp className="inline" />
    ) : (
      <ChevronDown className="inline" />
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
                <TableRow className="bg-orange-100">
                  <TableHead
                    className="cursor-pointer w-1/3"
                    onClick={() => handleSort("name")}
                  >
                    Name {sortField === "name" && SortIcon}
                  </TableHead>
                  <TableHead className="w-1/6">Position</TableHead>
                  <TableHead
                    className="cursor-pointer w-1/6"
                    onClick={() => handleSort("age")}
                  >
                    Age {sortField === "age" && SortIcon}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer w-1/6"
                    onClick={() => handleSort("salary")}
                  >
                    Salary {sortField === "salary" && SortIcon}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer w-1/6"
                    onClick={() => handleSort("contractYears")}
                  >
                    Contract Years {sortField === "contractYears" && SortIcon}
                  </TableHead>
                  <TableHead className="w-0 "></TableHead>
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
                        <TableCell>{player.position.join(", ")}</TableCell>
                        <TableCell>{player.age}</TableCell>
                        <TableCell>${player.salary.toLocaleString()}</TableCell>
                        <TableCell>{player.contractYears}</TableCell>
                        <TableCell>
                          <Button
                            variant="icon"
                            // onClick={() => onAddDocument(player.id)}
                          >
                            <Plus className="h-4 w-4" />
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
