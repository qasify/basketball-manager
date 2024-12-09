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
import {
  getLeagues,
  getPlayers,
  getTeams,
  League,
  Player,
  Team,
} from "@/_api/basketball-api";
import { BasketBallApiTable } from "@/components/PlayersTable";
import Select, { Option } from "@/components/Select";

const positions = POSITIONS;
export default function PlayerDatabasePage() {
  const DEFAULT_LEAGUE = { label: "EuroLeague", value: "120" };

  const [leagues, setLeagues] = useState<League[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>();
  const [countries, setCountries] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ageRange, setAgeRange] = useState([14, 40]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  // const [selectedLeagues, setSelectedLeagues] = useState<number[]>([120]);
  const [selectedLeagues, setSelectedLeagues] = useState<number[]>([
    parseInt(DEFAULT_LEAGUE.value),
  ]);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePositionChange = (pos: string) => {
    setSelectedPositions((prev) =>
      prev.includes(pos) ? prev.filter((p) => p !== pos) : [...prev, pos]
    );
  };

  const handleLeagueChange = (newValues: Option[]) => {
    setSelectedLeagues(newValues.map((item) => parseInt(item.value)));
    setPlayers([]);
    setTeams([]);
    setSelectedCountries([]);
  };

  const handleTeamChange = (team: number) => {
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((l) => l !== team) : [...prev, team]
    );
  };

  const handleCountriesChange = (newValues: Option[]) => {
    setSelectedCountries(newValues.map((item) => item.value));
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setAgeRange([14, 40]);
    setSelectedPositions([]);
    // setSelectedLeague(undefined);
    // setSelectedLeague()
    setSelectedCountries([]);
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  useEffect(() => {
    if (selectedLeagues.length > 0 && leagues.length > 0) {
      fetchTeamsForSelectedLeagues();
    } else {
      setTeams([]);
      setPlayers([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagues, selectedLeagues]);

  useEffect(() => {
    if (selectedTeams.length > 0) {
      fetchPlayersForSelectedTeams();
    } else {
      setPlayers([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeams]);

  useEffect(() => {
    if (players && players.length > 0) {
      setCountries(extractUniqueCountries(players));
    }
  }, [players]);

  const fetchTeamsForSelectedLeagues = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const teamsPromises = selectedLeagues.map((leagueId) =>
        getTeams(
          leagueId,
          leagues
            .find((league) => league.id === leagueId)
            ?.seasons.sort((a, b) => b.season - a.season)[0]
            .season.toString()
        )
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
        getPlayers(
          team,
          teams.find((t) => t.id === team)?.season,
          teams.find((t) => t.id === team)?.name
        )
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

  const extractUniqueCountries = (players: Player[]): string[] => {
    const countries = new Set<string>();

    players.forEach((player) => {
      if (player.country) {
        countries.add(player.country);
      }
    });

    return Array.from(countries);
  };

  return (
    <Card className="overflow-auto relative pb-14 min-h-[50vh]">
      <CardHeader>
        <CardTitle>Player Database</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto">
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
                onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                className="w-12 px-1"
              />
              <Input
                type="number"
                min={ageRange[0]}
                max={40}
                value={ageRange[1]}
                onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                className="w-12 px-1"
              />
            </div>
          </div>
          {/* <div>
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
          </div> */}
          <div className="flex justify-between">
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
            {countries && countries.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <Select
                  options={countries.map((country) => ({
                    label: country,
                    value: country,
                  }))}
                  onValueChange={handleCountriesChange}
                  isMulti
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Leagues
              </label>
              <Select
                options={leagues.map((league) => ({
                  label: league.name,
                  value: league.id.toString(),
                }))}
                defaultValue={DEFAULT_LEAGUE}
                onValueChange={handleLeagueChange}
                isMulti
              />
            </div>
          </div>
          {teams && teams.length > 0 && (
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
          )}
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
                  (player.age >= ageRange[0] && player.age <= ageRange[1])) &&
                (selectedCountries.length===0 || selectedCountries.includes(player.country??''))
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
