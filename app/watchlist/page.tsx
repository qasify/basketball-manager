"use client";

import { MouseEvent, useState } from "react";
import { Input } from "@/components/Input/Input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/Card/Card";
import PlayersTable from "@/components/PlayersTable";
import { Player } from "@/types/Player";
import { PLAYERS } from "@/mockData";
import { Minus, Plus } from "lucide-react";

export default function WatchlistPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [watchlist, setWatchlist] = useState<Player[]>(PLAYERS.slice(2, 5));
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWatchlist = watchlist.filter(
    (player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemove = (event:MouseEvent<HTMLButtonElement>, id:number)=>{
    event.stopPropagation()
    setWatchlist(watchlist.filter(item => item.id!==id))
  }

  const handleAddToTeam = (event:MouseEvent<HTMLButtonElement>, id:number)=>{
    event.stopPropagation()
    handleRemove(event, id)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Watchlist</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Search watchlist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <PlayersTable players={filteredWatchlist} actions={[
          {
            icon: <Plus className="h-4 w-4" />,
            handleClick: handleAddToTeam
          },
          {
            icon: <Minus className="h-4 w-4" />,
            handleClick: handleRemove
          },
        ]}/>
      </CardContent>
    </Card>
  );
}
