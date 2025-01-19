import Button from "@/components/Button/Button";
import { Card, CardContent } from "@/components/Card/Card";
import { Input } from "@/components/Input/Input";
import { Bell, ClipboardList, ContactRound, Users, Newspaper } from "lucide-react";
import Link from "next/link";
import { GameSchedule } from "./GameSchedule";

export default function DashboardPage() {
  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="container mx-auto px-4 py-8 bg-orange-50 gap-6 flex flex-col items-center overflow-y-auto">
      <div className="flex space-x-4 items-center w-96">
        <Input
          type="text"
          placeholder="Search players, teams, or stats..."
          className="flex-grow"
        />
        <Button>Search</Button>
      </div>
      <GameSchedule />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <Link
          href="/team-management"
          className="transform transition duration-500 hover:scale-105"
        >
          <Card className="bg-orange-400 text-white hover:bg-orange-500">
            <CardContent className="flex flex-col items-center justify-center min-h-48 h-48 p-6">
              <Users size={48} className="mb-4" />
              <h2 className="text-2xl font-semibold text-center">
                Team Management
              </h2>
            </CardContent>
          </Card>
        </Link>
        <Link
          href="/player-database"
          className="transform transition duration-500 hover:scale-105"
        >
          <Card className="bg-blue-400 text-white hover:bg-blue-500">
            <CardContent className="flex flex-col items-center justify-center min-h-48 h-48 p-6">
              <ContactRound size={48} className="mb-4" />
              <h2 className="text-2xl font-semibold text-center">
                Player Database
              </h2>
            </CardContent>
          </Card>
        </Link>
        <Link
          href="/watchlist"
          className="transform transition duration-500 hover:scale-105"
        >
          <Card className="bg-green-400 text-white hover:bg-green-500">
            <CardContent className="flex flex-col items-center justify-center min-h-48 h-48 p-6">
              <ClipboardList size={48} className="mb-4" />
              <h2 className="text-2xl font-semibold text-center">Watchlist</h2>
            </CardContent>
          </Card>
        </Link>
        <Link
          href="/news"
          className="transform transition duration-500 hover:scale-105"
        >
          <Card className="bg-cyan-400 text-white hover:bg-cyan-500">
            <CardContent className="flex flex-col items-center justify-center min-h-48 h-48 p-6">
              <Newspaper size={48} className="mb-4" />
              <h2 className="text-2xl font-semibold text-center">News</h2>
            </CardContent>
          </Card>
        </Link>
        <Link
          href="/notifications"
          className="transform transition duration-500 hover:scale-105"
        >
          <Card className="bg-red-400 text-white hover:bg-red-500">
            <CardContent className="flex flex-col items-center justify-center min-h-48 h-48 p-6">
              <Bell size={48} className="mb-4" />
              <h2 className="text-2xl font-semibold text-center">
                Notifications
              </h2>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
