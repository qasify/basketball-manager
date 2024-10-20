"use client";

import { useState } from "react";
import { Player } from "@/types/Player";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/Card/Card";
import { Input } from "@/components/Input/Input";
import { Slider } from "@/components/Slider";
import { PLAYERS } from "@/mockData";
import Button from "@/components/Button/Button";
import PlayersTable from "../../components/PlayersTable";
import { POSITIONS } from "../entities/constants";

const positions = POSITIONS
const leagues = ["NBA", "WNBA", "EuroLeague", "G League"];
export default function PlayerDatabasePage() {
  const initialPlayers = PLAYERS;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [searchTerm, setSearchTerm] = useState("");
  const [ageRange, setAgeRange] = useState([18, 40]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);

  const handlePositionChange = (pos: string) => {
    setSelectedPositions((prev) =>
      prev.includes(pos) ? prev.filter((p) => p !== pos) : [...prev, pos]
    );
  };

  const handleLeagueChange = (league: string) => {
    setSelectedLeagues((prev) =>
      prev.includes(league)
        ? prev.filter((l) => l !== league)
        : [...prev, league]
    );
  };

  const filteredPlayers = players.filter(
    (player) =>
      (player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.team.toLowerCase().includes(searchTerm.toLowerCase())) &&
      player.age >= ageRange[0] &&
      player.age <= ageRange[1] &&
      (selectedPositions.length === 0 ||
        player.position.some((pos) => selectedPositions.includes(pos))) &&
      (selectedLeagues.length === 0 || selectedLeagues.includes(player.league))
  );

  const handleClearFilters = () => {
    setSearchTerm("")
    setAgeRange([18, 40])
    setSelectedPositions([])
    setSelectedLeagues([])
  }

  return (
    <Card className="overflow-auto">
      <CardHeader>
        <CardTitle>Player Database</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button className="w-52" variant="outline" onClick={handleClearFilters}>
              Clear all Filters
            </Button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age Range: {ageRange[0]} - {ageRange[1]}
            </label>
            <Slider
              min={18}
              max={40}
              step={1}
              value={ageRange}
              onValueChange={setAgeRange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Positions:
            </label>
            <div className="flex flex-wrap gap-2">
              {positions.map((pos) => (
                <Button
                  key={pos}
                  variant={
                    selectedPositions.includes(pos) ? "primary" : "secondary"
                  }
                  onClick={() => handlePositionChange(pos)}
                  className="px-3 py-1 text-sm"
                >
                  {pos}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Leagues:
            </label>
            <div className="flex flex-wrap gap-2">
              {leagues.map((league) => (
                <Button
                  key={league}
                  variant={
                    selectedLeagues.includes(league) ? "primary" : "secondary"
                  }
                  onClick={() => handleLeagueChange(league)}
                  className="px-3 py-1 text-sm"
                >
                  {league}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <PlayersTable players={filteredPlayers} />
      </CardContent>
    </Card>
  );
}
