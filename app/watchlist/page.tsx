"use client";

import { MouseEvent, useEffect, useState } from "react";
import { Input } from "@/components/Input/Input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/Card/Card";
import PlayersTable from "@/components/PlayersTable";
import { Priority } from "@/types/Player";
import { Minus, Plus, Pin, PinOff } from "lucide-react";
import Button from "@/components/Button/Button";
import { Slider } from "@/components/Slider";
import Select, { Option } from "@/components/Select";
import { FBPlayer, teamRosterDB, watchListDB } from "@/_api/firebase-api";

const PRIORITIES: Priority[] = ["High", "Medium", "Low"];

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<FBPlayer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ageRange, setAgeRange] = useState([14, 40]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

  useEffect(() => {
    getWatchlistPlayers();
  }, []);

  const getWatchlistPlayers = async () => {
    const players = await watchListDB.getAll();
    setWatchlist(players);
  };

  const filteredWatchlist = watchlist.filter(
    (player) =>
      (player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.team?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!player.age ||
        (player.age >= ageRange[0] && player.age <= ageRange[1])) &&
      (selectedPriorities.length === 0 ||
        selectedPriorities.includes(player.priority ?? ""))
  );

  const handleRemove = async (
    event: MouseEvent<HTMLButtonElement>,
    player: FBPlayer
  ) => {
    event.stopPropagation();
    try {
      await watchListDB.remove(player.documentId);
      setWatchlist(watchlist.filter((p) => p.documentId !== player.documentId));
    } catch {
      console.error("Error removing from watchlist");
    }
  };

  const handleAddToTeam = async (
    event: MouseEvent<HTMLButtonElement>,
    player: FBPlayer
  ) => {
    event.stopPropagation();
    try {
      await teamRosterDB.add(player);
      // handleRemove(event, player);
    } catch {
      console.error("Error updating Priority");
    }
  };

  const handlePriorityChange = async (playerId: number, priority: Priority) => {
    try {
      const player = watchlist.find((p) => p.id === playerId);
      if (player) {
        await watchListDB.update({
          ...player,
          priority: priority,
        });
        setWatchlist(
          watchlist.map((player) =>
            player.id === playerId ? { ...player, priority } : player
          )
        );
      }
    } catch {
      console.error("Error updating Priority");
    }
  };

  const handlePrioritiesChange = (newValues: Option[]) => {
    setSelectedPriorities(newValues.map((item) => item.value));
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setAgeRange([14, 40]);
    setSelectedPriorities([]);
  };

  const handleUpdatePin = async (player: FBPlayer, pinned:boolean)=>{
    try {
      const foundPlayer = watchlist.find((p) => p.id === player?.id);
      if (foundPlayer) {
        await watchListDB.update({
          ...foundPlayer,
          pinned,
        });
        setWatchlist(
          watchlist.map((p) =>
            p.id === player?.id ? { ...p, pinned } : p
          )
        );
      }
    } catch {
      console.error("Error updating Pin");
    }
  }

  const handleAddPin = async (
    event: MouseEvent<HTMLButtonElement>,
    player: FBPlayer
  ) => {
    event.stopPropagation();
    handleUpdatePin(player, true)
  };

  const handleRemovePin = async (
    event: MouseEvent<HTMLButtonElement>,
    player: FBPlayer
  ) => {
    event.stopPropagation();
    handleUpdatePin(player, false)
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Watchlist</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 overflow-y-auto">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Search watchlist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button
            className="w-52"
            variant="outline"
            onClick={handleClearFilters}
          >
            Clear all Filters
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age Range: {ageRange[0]} - {ageRange[1]}
            </label>
            <Slider
              min={14}
              max={40}
              step={1}
              value={ageRange}
              onValueChange={setAgeRange}
              className="w-full"
            />
          </div>
          <div className="flex space-x-2">
            <Input
              type="number"
              min={14}
              max={ageRange[1]}
              value={ageRange[0]}
              onChange={(e) =>
                setAgeRange([parseInt(e.target.value), ageRange[1]])
              }
              className="w-12 px-1"
            />
            <Input
              type="number"
              min={ageRange[0]}
              max={40}
              value={ageRange[1]}
              onChange={(e) =>
                setAgeRange([ageRange[0], parseInt(e.target.value)])
              }
              className="w-12 px-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priorities
            </label>
            <Select
              options={PRIORITIES.map((p) => ({ label: p, value: p }))}
              onValueChange={handlePrioritiesChange}
              isMulti
            />
          </div>
        </div>
        <PlayersTable
          players={filteredWatchlist}
          actions={[
            {
              icon: <Plus className="h-4 w-4" />,
              handleClick: handleAddToTeam,
              tooltip: "Add to team",
            },
            {
              icon: <Minus className="h-4 w-4" />,
              handleClick: handleRemove,
              tooltip: "Remove from watchlist",
            },
          ]}
          pinActions={{
            yes: {
              icon: <Pin className="h-4 w-4" />,
              handleClick: handleAddPin,
              tooltip: "Pin player",
            },
            no: {
              icon: <PinOff className="h-4 w-4" color="red"/>,
              handleClick: handleRemovePin,
              tooltip: "Unpin player",
            },
          }}
          onPriorityChange={handlePriorityChange}
        />
      </CardContent>
    </Card>
  );
}
