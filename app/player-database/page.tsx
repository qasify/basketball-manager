"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/Card/Card";
import { Input } from "@/components/Input/Input";
import { Slider } from "@/components/Slider";
import Button from "@/components/Button/Button";
// import PlayersTable from "../../components/PlayersTable";
import { POSITIONS } from "../entities/constants";
import { getLeagues, getPlayers, getTeams, League, Player, Team } from "@/_api/basketball-api";
import { BasketBallApiTable } from "@/components/PlayersTable";

const positions = POSITIONS;
// const leagues = ["NBA", "WNBA", "EuroLeague", "G League"];
export default function PlayerDatabasePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [leagues, setLeagues] = useState<League[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [ageRange, setAgeRange] = useState([18, 40]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [selectedLeagues, setSelectedLeagues] = useState<number[]>([120]);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePositionChange = (pos: string) => {
    setSelectedPositions((prev) =>
      prev.includes(pos) ? prev.filter((p) => p !== pos) : [...prev, pos]
    );
  };

  const handleLeagueChange = (league: number) => {
    setSelectedLeagues((prev) =>
      prev.includes(league)
        ? prev.filter((l) => l !== league)
        : [...prev, league]
    );
  };

  const handleTeamChange = (team: number) => {
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((l) => l !== team) : [...prev, team]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setAgeRange([18, 40]);
    setSelectedPositions([]);
    setSelectedLeagues([]);
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  useEffect(() => {
    if (selectedLeagues.length > 0) {
      fetchTeamsForSelectedLeagues();
    } else {
      setTeams([]);
      setPlayers([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLeagues]);

  useEffect(() => {
    if (selectedTeams.length > 0) {
      fetchPlayersForSelectedTeams();
    } else {
      setPlayers([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeams]);

  const fetchTeamsForSelectedLeagues = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const teamsPromises = selectedLeagues.map((leagueId) =>
        getTeams(leagueId)
      );
      const teamsResults = await Promise.all(teamsPromises);
      const allTeams = teamsResults.flat();
      if (allTeams.length > 0) {
        setTeams(allTeams);
        setSelectedTeams([allTeams[0].id]);
      }
    } catch (err) {
      setError("Failed to fetch teams");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlayersForSelectedTeams = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const playersPromises = selectedTeams.map((team) =>
        getPlayers(team)
      );
      const playersResults = await Promise.all(playersPromises);
      const allPlayers = playersResults.flat();
      setPlayers(allPlayers);
    } catch (err) {
      setError("Failed to fetch players");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLeagues = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getLeagues();
      setLeagues(data);
    } catch (err) {
      setError("Failed to fetch leagues");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-auto">
      <CardHeader>
        <CardTitle>Player Database</CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <div className="mb-4 space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Search players..."
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
                  key={league.id}
                  variant={
                    selectedLeagues.includes(league.id)
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => handleLeagueChange(league.id)}
                  className="px-3 py-1 text-sm"
                >
                  {league.name}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teams:
            </label>
            <div className="flex flex-wrap gap-2">
              {teams.map((team) => (
                <Button
                  key={team.id}
                  variant={
                    selectedTeams.includes(team.id) ? "primary" : "secondary"
                  }
                  onClick={() => handleTeamChange(team.id)}
                  className="px-3 py-1 text-sm"
                >
                  {team.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center">
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded">{error}</div>
        )}

        {players && players.length > 0 && (
          <BasketBallApiTable
            players={players.filter(
              (player) =>
                (player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  player.country
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase())) &&
                (!player.age ||
                  (player.age >= ageRange[0] && player.age <= ageRange[1]))
              // &&
              // (selectedPositions.length === 0 ||
              //   player.position.some((pos) =>
              //     selectedPositions.includes(pos)
              //   ))
            )}
          />
        )}
      </CardContent>
    </Card>
  );
}
