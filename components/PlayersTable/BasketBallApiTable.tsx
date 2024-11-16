import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/Table";
  import { ChevronDown, ChevronUp } from "lucide-react";
  import { useRouter } from "next/navigation";
  import React, { FC, MouseEvent, ReactNode, useState } from "react";
  import Button from "../Button/Button";
import { Player } from "@/_api/basketball-api";
  
  interface Props {
    players: Player[];
    actions?: { icon: ReactNode; handleClick: (event: MouseEvent<HTMLButtonElement>, id: number) => void }[];
  }
  
  type SortField = "name" | "number" | "position" | "age" | "country" | undefined;
  
  const BasketBallApiTable: FC<Props> = ({ players, actions }) => {
    const [sortField, setSortField] = useState<SortField>();
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">();
    const router = useRouter();
  
    const handleViewPlayer = (playerId: number) => {
      router.push(`/player-profile/${playerId}`);
    };
  
    const sortedPlayers = sortField
      ? [...players].sort((a, b) => {
          const valueA = a[sortField] || '';
          const valueB = b[sortField] || '';
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
  
    return (
      <Table className="space-y-2 bg-green-600">
        <TableHeader className="min-w-full">
          <TableRow>
            <TableHead onClick={() => handleSort("name")}>
              Name {sortField === "name" && SortIcon}
            </TableHead>
            <TableHead onClick={() => handleSort("number")}>
              Number {sortField === "number" && SortIcon}
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
            {actions && actions.length && (
              <TableHead className="w-0"></TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-gray-500 overflow-auto">
          {sortedPlayers.map((player) => (
            <TableRow
              className="bg-white p-4 rounded shadow w-full select-none cursor-pointer hover:bg-gray-50"
              onClick={() => handleViewPlayer(player.id)}
              key={player.id}
            >
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.number || "N/A"}</TableCell>
              <TableCell>{player.position || "N/A"}</TableCell>
              <TableCell>{player.age || "N/A"}</TableCell>
              <TableCell>{player.country || "N/A"}</TableCell>
              {actions && actions.length && (
                <TableCell className="space-y-2">
                  {actions.map((action, index) => (
                    <Button
                      key={`${player.id}-${index}`}
                      variant="icon"
                      onClick={(e: MouseEvent<HTMLButtonElement>) => action.handleClick(e, player.id)}
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
  
  export default BasketBallApiTable;
  