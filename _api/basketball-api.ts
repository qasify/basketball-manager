"use server";

import { api } from "./api";

const LEAGUES_IDS = [
  120, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 330, 342, 349,
  351, 358, 367, 368, 369, 371, 381, 387, 419,
];
const CURRENT_SEASON = "2024";

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
