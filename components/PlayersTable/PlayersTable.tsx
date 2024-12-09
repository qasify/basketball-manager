import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import { Player, Priority } from "@/types/Player";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, MouseEvent, ReactNode, useState } from "react";
import { POSITIONS } from "../../app/entities/constants";
import { SortFunction } from "@/lib/utils";
import Button from "../Button/Button";
import { PriorityBadge } from "../PriorityBadge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip";

interface Props {
  players: Player[];
  actions?: {
    icon: ReactNode;
    handleClick: (event: MouseEvent<HTMLButtonElement>, id: number) => void;
    tooltip: string;
  }[];
  onPriorityChange?: (id: number, priority: Priority) => void;
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
  | "priority"
  | undefined;

const PriorityMap = {
  High: 3,
  Medium: 2,
  Low: 1,
};

const PlayersTable: FC<Props> = ({ players, actions, onPriorityChange }) => {
  const [sortField, setSortField] = useState<SortField>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">();
  const router = useRouter();

  const handleViewPlayer = (playerId: number) => {
    router.push(`/player-profile/${playerId}`);
  };

  const sortedPlayers = sortField
    ? [...players].sort((a, b) => {
        if (sortField === "priority") {
          return SortFunction(
            PriorityMap[a[sortField] as Priority],
            PriorityMap[b[sortField] as Priority],
            sortDirection,
            POSITIONS
          );
        }

        return SortFunction(
          a[sortField],
          b[sortField],
          sortDirection,
          POSITIONS
        );
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

  const handlePriorityClick = (playerId: number, currentPriority: Priority) => {
    if (onPriorityChange) {
      const priorities: Priority[] = ["High", "Medium", "Low"];
      const currentIndex = priorities.indexOf(currentPriority);
      const nextPriority = priorities[(currentIndex + 1) % priorities.length];
      onPriorityChange(playerId, nextPriority);
    }
  };

  return (
    <TooltipProvider>
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
            {/* <TableHead onClick={() => handleSort("salary")}>
            Salary {sortField === "salary" && SortIcon}
          </TableHead> */}
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
            <TableHead onClick={() => handleSort("priority")}>
              Priority {sortField === "priority" && SortIcon}
            </TableHead>
            {actions && actions.length > 0 && (
              <TableHead className="w-0">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPlayers.map((player, index) => (
            <TableRow
              className={`p-4 rounded shadow w-full select-none cursor-pointer hover:bg-gray-100 ${
                index % 2 === 1 ? "bg-orange-50" : "bg-white"
              }`}
              onClick={() => handleViewPlayer(player.id)}
              key={player.id}
            >
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.position.join(", ")}</TableCell>
              <TableCell>{player.age}</TableCell>
              <TableCell>{player.height}</TableCell>
              <TableCell>{player.weight}</TableCell>
              <TableCell>{player.league}</TableCell>
              {/* <TableCell>${player.salary.toLocaleString()}</TableCell> */}
              <TableCell>{player.contractYears}</TableCell>
              <TableCell>{player.rebounds}</TableCell>
              <TableCell>{player.ppg}</TableCell>
              <TableCell>{player.assists}</TableCell>
              <TableCell>{player.steals}</TableCell>
              <TableCell>{player.blocks}</TableCell>
              <TableCell>
                {player.priority && (
                  <PriorityBadge
                    priority={player.priority}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePriorityClick(player.id, player.priority!);
                    }}
                  />
                )}
              </TableCell>
              {actions && actions.length > 0 && (
                <TableCell className="flex space-x-2">
                  {actions.map((action, index) => (
                    <Tooltip key={`${player.id}-${index}`}>
                      <TooltipTrigger>
                        <Button
                          variant="icon"
                          onClick={(e: MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation();
                            action.handleClick(e, player.id);
                          }}
                          className="h-8 w-8"
                        >
                          {action.icon}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{action.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
};

export default PlayersTable;
