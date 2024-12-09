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
import Image from "next/image";
import { getPlayer, Player } from "@/_api/basketball-api";

export default function PlayerProfilePage() {
  const { id } = useParams();
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    fetchPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPlayer = async () => {
    const foundPlayer = await getPlayer(parseInt(id as string));
    setPlayer(foundPlayer);
  };

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6 overflow-y-auto w-full px-8">
      <Card>
        <CardHeader>
          <CardTitle>Player Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <Image
                src="https://img.freepik.com/premium-photo/basketball-player-logo-single-color-vector_1177187-50594.jpg"
                alt={player.name}
                className="w-full rounded-lg"
                height={1000}
                width={1000}
              />
            </div>
            <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
              <h2 className="text-2xl font-bold mb-2">{player.name}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Position</p>
                  <p>{player.position}</p>
                </div>
                <div>
                  <p className="font-semibold">Country</p>
                  <p>{player.country}</p>
                </div>
                <div>
                  <p className="font-semibold">Age</p>
                  <p>{player.age}</p>
                </div>
                <div>
                  <p className="font-semibold">Number</p>
                  <p>{player.number}</p>
                </div>
                <div/>
                <div/>
                <div>
                  <p className="font-semibold">Height</p>
                  <p>6 ft</p>
                </div>
                <div>
                  <p className="font-semibold">Weight</p>
                  <p>200 lbs</p>
                </div>
                <div>
                  <p className="font-semibold">Salary</p>
                  <p>$200000/year</p>
                </div>
                <div>
                  <p className="font-semibold">Contract</p>
                  <p>4 years</p>
                </div>
              </div>
            </div>
            {/* <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
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
            </div> */}
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
