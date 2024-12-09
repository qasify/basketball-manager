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
import { Player, Priority } from "@/types/Player";
import { PLAYERS } from "@/mockData";
import { Minus, Plus } from "lucide-react";
import Button from "@/components/Button/Button";
import { Slider } from "@/components/Slider";
import Select, { Option } from "@/components/Select";

const PRIORITIES:Priority[] = ['High', 'Medium', 'Low']

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<Player[]>(PLAYERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [ageRange, setAgeRange] = useState([14, 40]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

  const filteredWatchlist = watchlist.filter(
    (player) =>
      (player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.team.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!player.age ||
        (player.age >= ageRange[0] && player.age <= ageRange[1])) &&
      (selectedPriorities.length===0 || selectedPriorities.includes(player.priority??''))
  );

  const handleRemove = (event: MouseEvent<HTMLButtonElement>, id: number) => {
    event.stopPropagation();
    setWatchlist(watchlist.filter((item) => item.id !== id));
  };

  const handleAddToTeam = (
    event: MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.stopPropagation();
    handleRemove(event, id);
  };

  const handlePriorityChange = (id: number, priority: Priority) => {
    setWatchlist(
      watchlist.map((player) =>
        player.id === id ? { ...player, priority } : player
      )
    );
  };

  const handlePrioritiesChange = (newValues: Option[]) => {
    setSelectedPriorities(newValues.map((item) => item.value));
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setAgeRange([14, 40]);
    setSelectedPriorities([]);
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
                options={PRIORITIES.map(p=>({label:p, value:p}))}
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
          onPriorityChange={handlePriorityChange}
        />
      </CardContent>
    </Card>
  );
}
