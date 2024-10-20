import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import { Player } from "@/types/Player";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, MouseEvent, ReactNode, useState } from "react";
import { POSITIONS } from "../../app/entities/constants";
import { SortFunction } from "@/lib/utils";
import Button from "../Button/Button";

interface Props {
  players: Player[];
  actions?: { icon: ReactNode; handleClick: (event:MouseEvent<HTMLButtonElement>,  id: number) => void }[];
}

type SortField =
  | "name"
  | "age"
  | "salary"
  | "height"
  | "league"
  | "weight"
  | "contractYears"
  | "rebounds"
  | "team"
  | "ppg"
  | "assists"
  | "steals"
  | "blocks"
  | "position"
  | undefined;

const PlayersTable: FC<Props> = ({ players, actions }) => {
  const [sortField, setSortField] = useState<SortField>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">();
  const router = useRouter();

  const handleViewPlayer = (playerId: number) => {
    router.push(`/player-profile/${playerId}`);
  };

  const sortedPlayers = sortField
    ? [...players].sort((a, b) =>
        SortFunction(a[sortField], b[sortField], sortDirection, POSITIONS)
      )
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

  return (
    <Table className="space-y-2">
      <TableHeader>
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
          <TableHead onClick={() => handleSort("height")}>
            Height {sortField === "height" && SortIcon}
          </TableHead>
          <TableHead onClick={() => handleSort("weight")}>
            Weight {sortField === "weight" && SortIcon}
          </TableHead>
          <TableHead onClick={() => handleSort("league")}>
            League {sortField === "league" && SortIcon}
          </TableHead>
          <TableHead onClick={() => handleSort("salary")}>
            Salary {sortField === "salary" && SortIcon}
          </TableHead>
          <TableHead onClick={() => handleSort("contractYears")}>
            Contract Years {sortField === "contractYears" && SortIcon}
          </TableHead>
          <TableHead onClick={() => handleSort("rebounds")}>
            Rebounds {sortField === "rebounds" && SortIcon}
          </TableHead>
          <TableHead onClick={() => handleSort("ppg")}>
            PPG {sortField === "ppg" && SortIcon}
          </TableHead>
          <TableHead onClick={() => handleSort("assists")}>
            Assists {sortField === "assists" && SortIcon}
          </TableHead>
          <TableHead onClick={() => handleSort("steals")}>
            Steals {sortField === "steals" && SortIcon}
          </TableHead>
          <TableHead onClick={() => handleSort("blocks")}>
            Blocks {sortField === "blocks" && SortIcon}
          </TableHead>
          {actions && actions.length && (
            <TableHead className="w-0"></TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedPlayers.map((player) => (
          <TableRow
            className="bg-white p-4 rounded shadow w-full select-none cursor-pointer hover:bg-gray-50"
            onClick={() => handleViewPlayer(player.id)}
            key={player.id}
          >
            <TableCell>{player.name}</TableCell>
            <TableCell>{player.position.join(", ")}</TableCell>
            <TableCell>{player.age}</TableCell>
            <TableCell>{player.height}</TableCell>
            <TableCell>{player.weight}</TableCell>
            <TableCell>{player.league}</TableCell>
            <TableCell>${player.salary.toLocaleString()}</TableCell>
            <TableCell>{player.contractYears}</TableCell>
            <TableCell>{player.rebounds}</TableCell>
            <TableCell>{player.ppg}</TableCell>
            <TableCell>{player.assists}</TableCell>
            <TableCell>{player.steals}</TableCell>
            <TableCell>{player.blocks}</TableCell>
            {actions && actions.length && (
              <TableCell className="space-y-2">
                {actions.map((action) => (
                  <Button
                    key={player.id}
                    variant="icon"
                    onClick={(e:MouseEvent<HTMLButtonElement>) => action.handleClick(e, player.id)}
                    className="-mt-2 -mr-2 h-8 w-8"
                  >
                    {action.icon}
                  </Button>
                ))}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlayersTable;
