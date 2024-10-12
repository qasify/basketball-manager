import { Player } from "@/types/Player";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import React from "react";

interface PlayerCardProps {
  player: Player;
}

const PlayerCard:React.FC<PlayerCardProps> = ({
  player,
}) => {
  const router = useRouter();

  const handleViewPlayer = (playerId: number) => {
    router.push(`/player-profile/${playerId}`);
  };

  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      <div>
        <h3 className="font-bold">{player.name}</h3>
        <p className="text-sm text-gray-600">
          {player.position.join("/")} | {player.team} ({player.league})
        </p>
        <p className="text-sm text-gray-600">Rebounds: {player.rebounds} | PPG: {player.ppg} | Assists: {player.assists} | Blocks: {player.blocks}</p>
        <p className="text-sm text-gray-600">
          Age: {player.age} | {player.height}, {player.weight}
        </p>

      </div>
      <div className="text-right">
        <p className="font-semibold">${player.salary.toLocaleString()}/year</p>
        <p className="text-sm text-gray-600">{player.contractYears} years</p>
        <Button
          onClick={() => handleViewPlayer(player.id)}
          variant="outline"
          className="my-2"
        >
          View
        </Button>
      </div>
    </div>
  );
}

export default PlayerCard