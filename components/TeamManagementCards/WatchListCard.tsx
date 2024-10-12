import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Card/Card";
import { Draggable, Droppable } from "../DragAndDrop";
import { Player } from "@/types/Player";


interface WatchlistCardProps {
    watchlist: Player[];
  }

const WatchlistCard:React.FC<WatchlistCardProps> = ({watchlist}) => {
  return (
      <Card>
        <CardHeader>
          <CardTitle>Watchlist</CardTitle>
        </CardHeader>
        <CardContent>
          <Droppable droppableId="watchlist">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {watchlist.map((player, index) => (
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
                        className="bg-white p-2 rounded shadow text-sm"
                      >
                        <h4 className="font-bold">{player.name}</h4>
                        <p className="text-gray-600">
                          {player.position.join(", ")} | Age: {player.age}
                        </p>
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

export default WatchlistCard;
