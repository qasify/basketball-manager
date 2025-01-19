import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import { Priority } from "@/types/Player";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, MouseEvent, ReactNode, useState } from "react";
import { POSITIONS } from "../../app/entities/constants";
import { SortFunction } from "@/lib/utils";
import { PriorityBadge } from "../PriorityBadge";
import { TooltipProvider } from "../Tooltip";
import { FBPlayer } from "@/_api/firebase-api";
import TooltipIconButton from "../TooltipIconButton";

interface Props {
  players: FBPlayer[];
  actions?: {
    icon: ReactNode;
    handleClick: (
      event: MouseEvent<HTMLButtonElement>,
      player: FBPlayer
    ) => void;
    tooltip: string;
  }[];
  pinActions?: {
    yes: {
      icon: ReactNode;
      handleClick: (
        event: MouseEvent<HTMLButtonElement>,
        player: FBPlayer
      ) => void;
      tooltip: string;
    };
    no: {
      icon: ReactNode;
      handleClick: (
        event: MouseEvent<HTMLButtonElement>,
        player: FBPlayer
      ) => void;
      tooltip: string;
    };
  };
  onPriorityChange?: (id: number, priority: Priority) => void;
}

type SortField =
  | "name"
  | "position"
  | "age"
  | "country"
  // | "salary"
  // | "height"
  // | "league"
  // | "weight"
  // | "contractYears"
  // | "rebounds"
  | "team"
  // | "ppg"
  // | "assists"
  // | "steals"
  // | "blocks"
  | "priority"
  | undefined;

const PriorityMap = {
  High: 3,
  Medium: 2,
  Low: 1,
};

const PlayersTable: FC<Props> = ({
  players,
  actions,
  pinActions,
  onPriorityChange,
}) => {
  const [sortField, setSortField] = useState<SortField>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">();
  const router = useRouter();

  const handleViewPlayer = (playerId: number) => {
    router.push(`/player-profile/${playerId}`);
  };

  const sortedPlayers = sortField
    ? [...players]
        .sort((a, b) => {
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
        .sort((a, b) => (a.pinned ? -1 : b.pinned ? 1 : 0))
    : players.sort((a, b) => (a.pinned ? -1 : b.pinned ? 1 : 0));

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

  const handlePriorityClick = (id: number, currentPriority: Priority) => {
    if (onPriorityChange) {
      const priorities: Priority[] = ["High", "Medium", "Low"];
      const currentIndex = priorities.indexOf(currentPriority);
      const nextPriority = priorities[(currentIndex + 1) % priorities.length];
      onPriorityChange(id, nextPriority);
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
            <TableHead onClick={() => handleSort("country")}>
              Country {sortField === "country" && SortIcon}
            </TableHead>
            <TableHead onClick={() => handleSort("team")}>
              Team {sortField === "team" && SortIcon}
            </TableHead>
            {/* <TableHead onClick={() => handleSort("height")}>
              Height {sortField === "height" && SortIcon}
            </TableHead>
            <TableHead onClick={() => handleSort("weight")}>
              Weight {sortField === "weight" && SortIcon}
            </TableHead>
            <TableHead onClick={() => handleSort("league")}>
              League {sortField === "league" && SortIcon}
            </TableHead> */}
            {/* <TableHead onClick={() => handleSort("salary")}>
            Salary {sortField === "salary" && SortIcon}
          </TableHead> */}
            {/* <TableHead onClick={() => handleSort("contractYears")}>
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
            </TableHead> */}
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
              <TableCell>{player.position}</TableCell>
              <TableCell>{player.age}</TableCell>
              <TableCell>{player.country}</TableCell>
              <TableCell>{player.team}</TableCell>
              {/* <TableCell>{player.height}</TableCell>
              <TableCell>{player.weight}</TableCell>
              <TableCell>{player.league}</TableCell> */}
              {/* <TableCell>${player.salary.toLocaleString()}</TableCell> */}
              {/* <TableCell>{player.contractYears}</TableCell>
              <TableCell>{player.rebounds}</TableCell>
              <TableCell>{player.ppg}</TableCell>
              <TableCell>{player.assists}</TableCell>
              <TableCell>{player.steals}</TableCell>
              <TableCell>{player.blocks}</TableCell> */}
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
                    <TooltipIconButton
                      key={`${player.id}-${index}`}
                      icon={action.icon}
                      handleClick={action.handleClick}
                      tooltip={action.tooltip}
                      player={player}
                    />
                  ))}
                  {pinActions && player.pinned ? (
                    <TooltipIconButton
                      icon={pinActions.no.icon}
                      handleClick={pinActions.no.handleClick}
                      tooltip={pinActions.no.tooltip}
                      player={player}
                    />
                  ) : (
                    pinActions && (
                      <TooltipIconButton
                        icon={pinActions.yes.icon}
                        handleClick={pinActions.yes.handleClick}
                        tooltip={pinActions.yes.tooltip}
                        player={player}
                      />
                    )
                  )}
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
