import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Card/Card";
import { Draggable, Droppable } from "../DragAndDrop";
import { Player } from "@/types/Player";
import Button from "../Button/Button";
import { Minus } from "lucide-react";

interface WatchlistCardProps {
  watchlist: Player[];
}

const positions = ["PG", "SG", "SF", "PF", "C"];

const WatchlistCard: React.FC<WatchlistCardProps> = ({
  watchlist: initialWatchlist,
}) => {
  const [watchlist, setWatchlist] = useState<Player[]>(initialWatchlist);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);

  const togglePosition = (position: string) => {
    setSelectedPositions((prev) =>
      prev.includes(position)
        ? prev.filter((p) => p !== position)
        : [...prev, position]
    );
  };
  useEffect(() => {
    setWatchlist(initialWatchlist)
  }, [initialWatchlist]);

  const filteredWatchlist = watchlist.filter(
    (player) =>
      selectedPositions.length === 0 ||
      player.position.some((pos) => selectedPositions.includes(pos))
  );

  const removeFromWatchlist = (playerId: number) => {
    setWatchlist((prev) => prev.filter((player) => player.id !== playerId));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Watchlist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          {positions.map((position) => (
            <Button
              key={position}
              variant={
                selectedPositions.includes(position) ? "primary" : "secondary"
              }
              onClick={() => togglePosition(position)}
              className="px-3 py-1 text-sm"
            >
              {position}
            </Button>
          ))}
        </div>
        <Droppable droppableId="watchlist">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {filteredWatchlist.map((player, index) => (
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
                      <div className="flex justify-between">
                        <h4 className="font-bold">{player.name}</h4>
                        <Button
                          variant="icon"
                          onClick={() => removeFromWatchlist(player.id)}
                          className="-mt-2 -mr-2 h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
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
