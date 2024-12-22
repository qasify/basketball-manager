"use client";

import React, { useEffect, useState } from "react";

import WatchlistCard from "@/app/team-management/WatchListCard";
import RoasterCard from "@/app/team-management/RoastercCard";
import { DragDropContext } from "@/components/DragAndDrop";
import { FBPlayer, teamRosterDB, watchListDB } from "@/_api/firebase-api";

export default function DashboardPage() {
  const [roster, setRoster] = useState<FBPlayer[]>([]);
  const [watchlist, setWatchlist] = useState<FBPlayer[]>([]);

  const fetchPlayers = async() => {
    const watchPlayers = await watchListDB.getAll();
    const rosterPlayers = await teamRosterDB.getAll();

    setWatchlist(watchPlayers)
    setRoster(rosterPlayers)
  }

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

  const totalSalary = 0
  //  roster.reduce((sum, player) => sum + player.salary, 0);
  const budget = 200000000; // Example budget
  const remainingBudget = budget - totalSalary;

  useEffect(() => {
    fetchPlayers()
  }, []);

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
