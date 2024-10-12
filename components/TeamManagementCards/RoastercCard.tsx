import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Card/Card";
import { Draggable, Droppable } from "../DragAndDrop";
import { Player } from "@/types/Player";

interface RoasterCardProps {
    roster: Player[];
    totalSalary: number
    budget: number
    remainingBudget: number
}

const RoasterCard: React.FC<RoasterCardProps> = ({ roster, totalSalary, budget, remainingBudget }) => {
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
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {roster.map((player, index) => (
                <Draggable
                  key={player.id}
                  draggableId={player.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white p-4 rounded shadow flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-bold">{player.name}</h3>
                        <p className="text-sm text-gray-600">
                          {player.position.join(", ")} | Age: {player.age}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${player.salary.toLocaleString()}/year
                        </p>
                        <p className="text-sm text-gray-600">
                          {player.contractYears} years
                        </p>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </CardContent>
    </Card>
  );
};

export default RoasterCard;
