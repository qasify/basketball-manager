import {
  Card,
  CardContent,
} from "@/components/Card/Card";
import { Bell, ClipboardList, ContactRound, Users } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="container mx-auto px-4 py-8 bg-orange-50">
      <h1 className="text-4xl font-bold text-center mb-8 text-orange-600">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/team-management" className="transform transition duration-500 hover:scale-105">
          <Card className="bg-orange-400 text-white hover:bg-orange-500">
            <CardContent className="flex flex-col items-center justify-center h-48 p-6">
              <Users size={48} className="mb-4" />
              <h2 className="text-2xl font-semibold text-center">Team Management</h2>
            </CardContent>
          </Card>
        </Link>
        <Link href="/player-database" className="transform transition duration-500 hover:scale-105">
          <Card className="bg-blue-400 text-white hover:bg-blue-500">
            <CardContent className="flex flex-col items-center justify-center h-48 p-6">
              <ContactRound size={48} className="mb-4" />
              <h2 className="text-2xl font-semibold text-center">Player Database</h2>
            </CardContent>
          </Card>
        </Link>
        <Link href="/watchlist" className="transform transition duration-500 hover:scale-105">
          <Card className="bg-green-400 text-white hover:bg-green-500">
            <CardContent className="flex flex-col items-center justify-center h-48 p-6">
              <ClipboardList size={48} className="mb-4" />
              <h2 className="text-2xl font-semibold text-center">Watchlist</h2>
            </CardContent>
          </Card>
        </Link>
        <Link href="/notifications" className="transform transition duration-500 hover:scale-105">
          <Card className="bg-red-400 text-white hover:bg-red-500">
            <CardContent className="flex flex-col items-center justify-center h-48 p-6">
              <Bell size={48} className="mb-4" />
              <h2 className="text-2xl font-semibold text-center">Notifications</h2>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
