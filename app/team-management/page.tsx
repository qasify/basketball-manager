"use client";

import React, { useState } from "react";

import { Player } from "@/types/Player";

import { PLAYERS } from "@/mockData";
import WatchlistCard from "@/app/team-management/WatchListCard";
import RoasterCard from "@/app/team-management/RoastercCard";
import { DragDropContext } from "@/components/DragAndDrop";

export default function DashboardPage() {
  const initialPlayers = PLAYERS.slice(0, 3);
  const initialWatchlist = PLAYERS.slice(3, 5);

  const [roster, setRoster] = useState<Player[]>(initialPlayers);
  const [watchlist, setWatchlist] = useState<Player[]>(initialWatchlist);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same list
      const items =
        source.droppableId === "roster" ? [...roster] : [...watchlist];
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      if (source.droppableId === "roster") {
        setRoster(items);
      } else {
        setWatchlist(items);
      }
    } else {
      // Moving between lists
      const sourceItems =
        source.droppableId === "roster" ? [...roster] : [...watchlist];
      const destItems =
        destination.droppableId === "roster" ? [...roster] : [...watchlist];
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);

      setRoster(source.droppableId === "roster" ? sourceItems : destItems);
      setWatchlist(
        source.droppableId === "watchlist" ? sourceItems : destItems
      );
    }
  };

  const totalSalary = roster.reduce((sum, player) => sum + player.salary, 0);
  const budget = 200000000; // Example budget
  const remainingBudget = budget - totalSalary;

  return (
    <div className="flex select-none flex-grow">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex-grow">
          <RoasterCard roster={roster} budget={budget} totalSalary={totalSalary} remainingBudget={remainingBudget}/>
        </div>
        <div className="w-64 ml-4">
          <WatchlistCard watchlist={watchlist} />
        </div>
      </DragDropContext>
    </div>
  );
}
