import React, { FC, MouseEvent, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import {
  ChevronDown,
  ChevronUp,
  Star,
  Plus,
  FileText,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { Player } from "@/_api/basketball-api";
import Image from "next/image";
import { Pagination } from "@/components/Pagination";
import iso3166 from "iso-3166-1";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip";
import { teamRosterDB, watchListDB } from "@/_api/firebase-api";

interface Props {
  players: Player[];
}

type SortField =
  | "name"
  | "number"
  | "position"
  | "age"
  | "country"
  | "team"
  | undefined;

const ITEMS_PER_PAGE = 10;

const BasketBallApiTable: FC<Props> = ({ players }) => {
  const [sortField, setSortField] = useState<SortField>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">();
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const onAddToWatchlist = async (player: Player) => {
    try {
      if (!player.priority) {
        player.priority = "Medium";
      }
      await watchListDB.add(player);
    } catch {
      console.error("Error adding to watchlist");
    }
  };
  const onAddToTeam = async (player: Player) => {
    await teamRosterDB.add(player);
    try {
      if (!player.priority) {
        player.priority = "Medium";
      }
      await teamRosterDB.add(player);
    } catch {
      console.error("Error adding to team");
    }
  };
  const onAddNote = (playerId: number) => {};

  const handleViewPlayer = (playerId: number) => {
    router.push(`/player-profile/${playerId}`);
  };

  const getCountryAbbreviation = (countryName: string) => {
    if (countryName === "USA") return "us";

    const country = iso3166.whereCountry(countryName);
    return country ? country.alpha2 : "";
  };

  const sortedPlayers = sortField
    ? [...players].sort((a, b) => {
        const valueA = a[sortField] || "";
        const valueB = b[sortField] || "";
        if (sortDirection === "asc") {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      })
    : players;

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortIcon =
    sortDirection === "asc" ? (
      <ChevronUp className="inline text-gray-500" size={15} />
    ) : (
      <ChevronDown className="inline text-gray-500" size={15} />
    );

  const paginatedPlayers = sortedPlayers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <TooltipProvider>
        <Table className="space-y-2 overflow-visible">
          <TableHeader className="min-w-full">
            <TableRow>
              <TableHead onClick={() => handleSort("name")}>
                Name {sortField === "name" && SortIcon}
              </TableHead>
              <TableHead onClick={() => handleSort("position")}>
                Position {sortField === "position" && SortIcon}
              </TableHead>
              <TableHead onClick={() => handleSort("age")}>
                Age {sortField === "age" && SortIcon}
              </TableHead>
              <TableHead onClick={() => handleSort("country")}>
                Country {sortField === "country" && SortIcon}
              </TableHead>
              <TableHead onClick={() => handleSort("team")}>
                Team {sortField === "team" && SortIcon}
              </TableHead>
              <TableHead className="w-0">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-gray-500">
            {paginatedPlayers.map((player) => (
              <TableRow
                className="bg-white p-4 rounded shadow w-full select-none cursor-pointer hover:bg-gray-100"
                onClick={() => handleViewPlayer(player.id)}
                key={player.id}
              >
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {player.photo ? (
                      <Image
                        src={player.photo}
                        alt={player.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    ) : (
                      <User className="h-6 w-6 text-gray-400" />
                    )}
                    <span>{player.name}</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant="icon"
                          className="ml-2 p-0"
                          onClick={(e: MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation();
                            onAddToWatchlist(player);
                          }}
                        >
                          <Star
                            className="h-4 w-4"
                            // fill={
                            //   player.isInWatchlist ? "#EA580C" : "transparent"
                            // }
                            color="#EA580C"
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add to Watchlist</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell>{player.position || "N/A"}</TableCell>
                <TableCell>{player.age || "N/A"}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {player.country && (
                      <Image
                        src={`https://flagcdn.com/w20/${getCountryAbbreviation(
                          player.country
                        ).toLowerCase()}.png`}
                        width={20}
                        height={15}
                        alt={getCountryAbbreviation(
                          player.country
                        ).toLowerCase()}
                      />
                    )}
                    <span>{player.country || "N/A"}</span>
                  </div>
                </TableCell>
                <TableCell>{player.team || "N/A"}</TableCell>
                <TableCell className="flex space-x-2">
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="icon"
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          onAddToTeam(player);
                        }}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to Team</p>
                    </TooltipContent>
                  </Tooltip>
                  <Button
                    variant="icon"
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      onAddNote(player.id);
                    }}
                    className="h-8 w-8"
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TooltipProvider>
      <div className="flex justify-center absolute bottom-2 right-6">
        <Pagination
          totalItems={players.length}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default BasketBallApiTable;
