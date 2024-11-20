"use server";

import { api } from "./api";

const LEAGUES_IDS = [
  1, 59, 217, 275, 388, 374, 30, 32, 36, 2, 8, 40, 42, 45, 46, 51, 52, 146, 60,
  61, 248, 65, 72, 82, 81, 86, 87, 117, 95, 102, 104, 108, 12, 17, 20, 116, 197,
  120, 194, 202, 201, 198, 368, 369, 204, 281, 192, 123, 113, 115, 34, 37, 48,
  56, 249, 63, 68, 74, 78, 89, 93, 100,
];
const CURRENT_SEASON = new Date(Date.now()).getFullYear().toString();

export interface League {
  id: number;
  name: string;
  type: string;
  logo: string;
  country: {
    id: number;
    name: string;
    code: string;
    flag: string;
  };
  seasons: {
    season: number;
    start: string;
    end: string;
  }[];
}

export interface Team {
  id: number;
  name: string;
  logo: string;
  national: boolean;
  country: {
    id: number;
    name: string;
    code: string;
    flag: string;
  };
}

export interface Player {
  id: number;
  name: string;
  number?: string;
  position?: string;
  age?: number;
  country?: string;
}

export const getLeagues = async (): Promise<League[]> => {
  try {
    const leagues = await api.get<League[]>("/leagues");
    return leagues.filter((league) => LEAGUES_IDS.includes(league.id));
  } catch (error) {
    console.error("Error fetching leagues:", error);
    throw error;
  }
};

export const getTeams = async (
  leagueId: number,
  season: string = CURRENT_SEASON
): Promise<Team[]> => {
  try {
    return await api.get<Team[]>("/teams", {
      params: {
        league: leagueId.toString(),
        season,
      },
    });
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};

export const getPlayers = async (
  teamId: number,
  season: string = CURRENT_SEASON
): Promise<Player[]> => {
  try {
    return await api.get<Player[]>("/players", {
      params: {
        team: teamId.toString(),
        season,
      },
    });
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};
