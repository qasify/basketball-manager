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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";

const positions = POSITIONS;
export default function PlayerDatabasePage() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>();
  const [countries, setCountries] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ageRange, setAgeRange] = useState([18, 40]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  // const [selectedLeagues, setSelectedLeagues] = useState<number[]>([120]);
  const [selectedLeague, setSelectedLeague] = useState<number | undefined>(120);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePositionChange = (pos: string) => {
    setSelectedPositions((prev) =>
      prev.includes(pos) ? prev.filter((p) => p !== pos) : [...prev, pos]
    );
  };

  const handleLeagueChange = (league: number) => {
    // setSelectedLeagues((prev) =>
    //   prev.includes(league)
    //     ? prev.filter((l) => l !== league)
    //     : [...prev, league]
    // );
    setPlayers([]);
    setTeams([]);
    setSelectedCountry('')
    setSelectedLeague(league);
  };

  const handleTeamChange = (team: number) => {
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((l) => l !== team) : [...prev, team]
    );
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };


  const handleClearFilters = () => {
    setSearchTerm("");
    setAgeRange([18, 40]);
    setSelectedPositions([]);
    // setSelectedLeague(undefined);
    // setSelectedLeague()
    setSelectedCountry('')
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  useEffect(() => {
    if (selectedLeague && leagues.length > 0) {
      fetchTeamsForSelectedLeagues();
    } else {
      setTeams([]);
      setPlayers([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagues, selectedLeague]);

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
      // const teamsPromises = selectedLeague.map((leagueId) =>
      //   getTeams(
      //     leagueId,
      //     leagues
      //       .find((league) => league.id === leagueId)
      //       ?.seasons.sort((a, b) => b.season - a.season)[0]
      //       .season.toString()
      //   )
      // );
      // const teamsResults = await Promise.all(teamsPromises);
      // const allTeams = teamsResults.flat();
      if (selectedLeague) {
        const allTeams = await getTeams(
          selectedLeague,
          leagues
            .find((league) => league.id === selectedLeague)
            ?.seasons.sort((a, b) => b.season - a.season)[0]
            .season.toString()
        );
        if (allTeams.length > 0) {
          setTeams(allTeams);
          setSelectedTeams([allTeams[0].id]);
        }
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
          leagues
            .find((league) => league.id === selectedLeague)
            ?.seasons.sort((a, b) => b.season - a.season)[0]
            .season.toString(),
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
    <Card className="overflow-auto relative pb-14">
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
                  onValueChange={handleCountryChange}
                  value={selectedCountry}
                >
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-96">
                    <SelectGroup>
                      {countries.map((country) => (
                        <SelectItem
                          key={country}
                          value={country}
                          className={
                            selectedCountry === country
                              ? "bg-orange-600 focus:bg-orange-600 text-white"
                              : undefined
                          }
                        >
                          {country}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Leagues
              </label>
              <Select
                onValueChange={(value: string) =>
                  handleLeagueChange(parseInt(value))
                }
                value={selectedLeague?.toString()}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a league" />
                </SelectTrigger>
                <SelectContent className="max-h-96">
                  <SelectGroup>
                    {leagues.map((league) => (
                      <SelectItem
                        key={league.id}
                        value={league.id.toString()}
                        className={
                          selectedLeague === league.id
                            ? "bg-orange-600 focus:bg-orange-600 text-white"
                            : undefined
                        }
                      >
                        {league.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                  (player.age >= ageRange[0] && player.age <= ageRange[1]))
                  && (!selectedCountry || player.country===selectedCountry)
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
