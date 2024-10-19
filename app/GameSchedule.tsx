"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/Card/Card";
import Button from "@/components/Button/Button";
import { useRef } from "react";
import DefaultLogo from "@/assets/images/default-logo.png";
import { GAMES } from "@/mockData";

export function GameSchedule() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Game Schedule & Results
      </h2>
      <div className="relative w-full">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 py-4 mx-3 px-2 no-scrollbar snap-x snap-mandatory"
        >
          {GAMES.map((game) => (
            <Card key={game.id} className="flex-shrink-0 w-80 drop-shadow-md">
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-2">
                  {game.date} {game.time}
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={game.homeTeam.logo || DefaultLogo}
                      alt={game.homeTeam.name}
                      width={32}
                      height={32}
                    />
                    <span className="font-semibold">
                      {game.homeTeam.abbreviation}
                    </span>
                  </div>
                  <span className="text-xl font-bold">
                    {game.homeTeam.score ?? "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={game.awayTeam.logo || DefaultLogo}
                      alt={game.awayTeam.name}
                      width={32}
                      height={32}
                    />
                    <span className="font-semibold">
                      {game.awayTeam.abbreviation}
                    </span>
                  </div>
                  <span className="text-xl font-bold">
                    {game.awayTeam.score ?? "-"} 
                  </span>
                </div>
                <Button className="w-full" variant="outline">
                  Boxscore
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 drop-shadow-lg shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 drop-shadow-lg shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
