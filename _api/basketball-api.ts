"use server";

import { Priority } from "@/types/Player";
import { api } from "./api";
import { teamRosterDB, watchListDB } from "./firebase-api";

const LEAGUES_NAMES: Record<number, string> = {
  1: "Australia: NBL",
  59: "Kosovo: Superliga",
  217: "Austria: Superliga",
  275: "Venezuela: Superliga",
  388: "Albania: Superliga",
  374: "Belgium: Pro Basketball League",
  30: "Croatia: A1 Liga",
  32: "Czech Republic: NBL",
  36: "Estonia: Korvpalli Meistriliiga",
  2: "France: LNB",
  8: "France: Pro B",
  40: "Germany: BBL",
  42: "Germany: Pro A",
  45: "Greece: A1",
  46: "Hungary: NB I A",
  51: "Israel: Super league",
  52: "Italy: Lega A",
  146: "Latvia: LBL",
  60: "Lithuania: LKL",
  61: "Lithuania: NKL",
  65: "Netherlands: DBL",
  72: "Poland: Energa basket liga",
  82: "Russia: VTB",
  81: "Russia: Super League",
  86: "Serbia: Super league",
  87: "Slovakia: Extraliga",
  117: "Spain: ACB",
  95: "Spain: LEB Oro",
  102: "Turkey: TBL",
  104: "Turkey: Super Ligi",
  108: "United Kingdom: BBL",
  123: "Bosnia and Herzegovina: Prvenstvo BiH",
  113: "Bulgaria: NBL",
  115: "Cyprus: Division A",
  34: "Denmark: Basketligaen",
  37: "Finland: Korisliiga",
  48: "Iceland: Premier League",
  56: "Japan: B league",
  249: "Luxembourg: Total league",
  63: "Mexico: LNBP",
  68: "Norway: BLNO",
  74: "Portugal: LPB",
  78: "Romania: Divizia A",
  89: "Slovenia: Liga Nova KBM",
  93: "Sweden: Basketligan",
  100: "Switzerland: LNA",
};

const LEAGUES_IDS = [
  1, 59, 217, 275, 388, 374, 30, 32, 36, 2, 8, 40, 42, 45, 46, 51, 52, 146, 60,
  61, 65, 72, 82, 81, 86, 87, 117, 95, 102, 104, 108, 12, 20, 116, 197, 120,
  194, 202, 201, 198, 368, 369, 204, 281, 192, 123, 113, 115, 34, 37, 48, 56,
  249, 63, 68, 74, 78, 89, 93, 100,
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
  season: string;
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
  team?: string;
  photo?: string;
  isInWatchlist?: boolean;
  isInTeam?: boolean;
  priority?: Priority;
  pinned?: boolean
  salary?: string
  contract?: string
}

export const getLeagues = async (): Promise<League[]> => {
  try {
    const leagues = await api.get<League[]>("/leagues");
    return leagues
      .filter((league) => LEAGUES_IDS.includes(league.id))
      .map((league) => ({
        ...league,
        name: LEAGUES_NAMES[league.id] ? LEAGUES_NAMES[league.id] : league.name,
      }))
      .sort((league1, league2) => league1.name.localeCompare(league2.name));
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
    const resp = await api.get<Team[]>("/teams", {
      params: {
        league: leagueId.toString(),
        season,
      },
    });
    resp.forEach((team) => {
      team.season = season;
    });
    return resp;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};

export const getPlayers = async (
  teamId: number,
  season: string = CURRENT_SEASON,
  teamName?: string
): Promise<Player[]> => {
  try {
    const watchlist = await watchListDB.getAll();
    const teamRoster = await teamRosterDB.getAll();

    const players = await api.get<Player[]>("/players", {
      params: {
        team: teamId.toString(),
        season,
      },
    });
    players.forEach((player) => {
      player.team = teamName;
      player.isInWatchlist = watchlist.find((p) => p.id === player.id)
        ? true
        : false;
      player.isInTeam = teamRoster.find((p) => p.id === player.id)
        ? true
        : false;
    });
    return players;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};

export const getPlayer = async (playerId: number): Promise<Player> => {
  try {
    const player = await api.get<Player[]>("/players", {
      params: {
        id: playerId.toString(),
      },
    });
    return player[0];
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};
