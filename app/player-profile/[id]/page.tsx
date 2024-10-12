"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/Card/Card";
import Button from "@/components/Button/Button";
import { Player } from "@/types/Player";
import { PLAYERS } from "@/mockData";

const mockPlayers = PLAYERS
export default function PlayerProfilePage() {
  const { id } = useParams();
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the player data from an API
    // For this example, we'll use the mock data
    const foundPlayer = mockPlayers.find((p) => p.id.toString() === id);
    setPlayer(foundPlayer || null);
  }, [id]);

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{player.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img
                src="https://img.freepik.com/premium-photo/basketball-player-logo-single-color-vector_1177187-50594.jpg"
                alt={player.name}
                className="w-full rounded-lg"
              />
            </div>
            <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
              <h2 className="text-2xl font-bold mb-2">{player.name}</h2>
              <p className="text-lg mb-4">
                {player.position.join("/")} | {player.team} ({player.league})
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Age</p>
                  <p>{player.age}</p>
                </div>
                <div>
                  <p className="font-semibold">Height</p>
                  <p>{player.height}</p>
                </div>
                <div>
                  <p className="font-semibold">Weight</p>
                  <p>{player.weight}</p>
                </div>
                <div>
                  <p className="font-semibold">Salary</p>
                  <p>${player.salary.toLocaleString()}/year</p>
                </div>
                <div>
                  <p className="font-semibold">Contract</p>
                  <p>{player.contractYears} years</p>
                </div>
                <div>
                </div>
                <div>
                  <p className="font-semibold">Blocks</p>
                  <p>{player.blocks}</p>
                </div>
                <div>
                  <p className="font-semibold">Assists</p>
                  <p>{player.assists}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Season Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="font-semibold">PPG</p>
              <p className="text-2xl">25.3</p>
            </div>
            <div>
              <p className="font-semibold">RPG</p>
              <p className="text-2xl">7.8</p>
            </div>
            <div>
              <p className="font-semibold">APG</p>
              <p className="text-2xl">6.2</p>
            </div>
            <div>
              <p className="font-semibold">SPG</p>
              <p className="text-2xl">1.5</p>
            </div>
            <div>
              <p className="font-semibold">BPG</p>
              <p className="text-2xl">0.8</p>
            </div>
            <div>
              <p className="font-semibold">FG%</p>
              <p className="text-2xl">48.2%</p>
            </div>
            <div>
              <p className="font-semibold">3PT%</p>
              <p className="text-2xl">37.5%</p>
            </div>
            <div>
              <p className="font-semibold">FT%</p>
              <p className="text-2xl">85.3%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Add to Watchlist</Button>
        <Button>Trade Player</Button>
      </div>
    </div>
  );
}
