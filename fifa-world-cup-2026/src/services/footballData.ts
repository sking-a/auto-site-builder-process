import { getTeamVisual, type Group, type Match } from "../data/worldCup";

export type ApiStatus = "idle" | "loading" | "live" | "fallback" | "error";

type FootballDataTeam = {
  id?: number;
  name?: string;
  shortName?: string;
  tla?: string | null;
};

type FootballDataMatch = {
  id: number;
  utcDate?: string;
  status?: string;
  stage?: string | null;
  group?: string | null;
  matchday?: number | null;
  homeTeam?: FootballDataTeam;
  awayTeam?: FootballDataTeam;
  score?: {
    fullTime?: {
      home?: number | null;
      away?: number | null;
    };
  };
};

type FootballDataStandingRow = {
  team?: FootballDataTeam;
  won?: number;
  draw?: number;
  lost?: number;
  goalsFor?: number;
  goalsAgainst?: number;
  points?: number;
};

type FootballDataStanding = {
  group?: string | null;
  table?: FootballDataStandingRow[];
};

type MatchesResponse = {
  matches?: FootballDataMatch[];
};

type StandingsResponse = {
  standings?: FootballDataStanding[];
};

export type LiveWorldCupData = {
  matches: Match[];
  groups: Group[];
  fetchedAt: string;
};

const apiBaseUrl = "/api/football-data";
const worldCupSeason = import.meta.env.VITE_WORLD_CUP_SEASON || "2026";

export function normalizeFootballDataStage(stage?: string | null): Match["stage"] {
  return stage === "GROUP_STAGE" ? "Group Stage" : "Knockout Stage";
}

export function normalizeFootballDataGroup(group?: string | null): string {
  if (!group) return "Competition";
  const match = group.match(/^GROUP_([A-Z])$/);
  return match ? `Group ${match[1]}` : toTitleCase(group);
}

export function formatFootballDataRound(match: Pick<FootballDataMatch, "stage" | "group" | "matchday">): string {
  if (match.stage === "GROUP_STAGE") {
    const group = normalizeFootballDataGroup(match.group);
    return match.matchday ? `${group} · Matchday ${match.matchday}` : group;
  }

  return toTitleCase(match.stage || "Knockout Stage");
}

export function mapFootballDataMatches(apiMatches: FootballDataMatch[]): Match[] {
  return apiMatches.map((match) => {
    const home = mapApiTeam(match.homeTeam, "Home");
    const away = mapApiTeam(match.awayTeam, "Away");
    const date = match.utcDate ? new Date(match.utcDate) : null;
    const homeScore = match.score?.fullTime?.home;
    const awayScore = match.score?.fullTime?.away;
    const hasScore = typeof homeScore === "number" && typeof awayScore === "number";

    return {
      id: `api-${match.id}`,
      stage: normalizeFootballDataStage(match.stage),
      round: formatFootballDataRound(match),
      date: date ? date.toISOString().slice(0, 10) : "TBD",
      time: date ? date.toISOString().slice(11, 16) : "TBD",
      venue: statusLabel(match.status),
      home,
      away,
      score: hasScore ? `${homeScore}-${awayScore}` : "TBD",
    };
  });
}

export function mapFootballDataStandings(apiStandings: FootballDataStanding[]): Group[] {
  return apiStandings
    .filter((standing) => (standing.table?.length ?? 0) > 0)
    .map((standing) => ({
      name: normalizeFootballDataGroup(standing.group),
      table: (standing.table ?? []).map((row) => ({
        team: mapApiTeam(row.team, "Team"),
        wins: row.won ?? 0,
        draws: row.draw ?? 0,
        losses: row.lost ?? 0,
        goalsFor: row.goalsFor ?? 0,
        goalsAgainst: row.goalsAgainst ?? 0,
        points: row.points ?? 0,
      })),
    }));
}

export async function fetchLiveWorldCupData(fetcher: typeof fetch = fetch): Promise<LiveWorldCupData> {
  const [matchesResult, standingsResult] = await Promise.allSettled([
    fetchJsonWithRetry<MatchesResponse>(`${apiBaseUrl}/competitions/WC/matches?season=${worldCupSeason}`, fetcher),
    fetchJsonWithRetry<StandingsResponse>(`${apiBaseUrl}/competitions/WC/standings?season=${worldCupSeason}`, fetcher),
  ]);

  const liveMatches =
    matchesResult.status === "fulfilled" ? mapFootballDataMatches(matchesResult.value.matches ?? []) : [];
  const liveGroups =
    standingsResult.status === "fulfilled" ? mapFootballDataStandings(standingsResult.value.standings ?? []) : [];

  if (liveMatches.length === 0 && liveGroups.length === 0) {
    const reason =
      matchesResult.status === "rejected"
        ? matchesResult.reason
        : standingsResult.status === "rejected"
          ? standingsResult.reason
          : `No FIFA World Cup ${worldCupSeason} data returned by football-data.org`;
    throw new Error(String(reason instanceof Error ? reason.message : reason));
  }

  return {
    matches: liveMatches,
    groups: liveGroups,
    fetchedAt: new Date().toISOString(),
  };
}

async function fetchJsonWithRetry<T>(url: string, fetcher: typeof fetch): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      return await fetchJson<T>(url, fetcher);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

async function fetchJson<T>(url: string, fetcher: typeof fetch): Promise<T> {
  const response = await fetcher(url);
  if (!response.ok) {
    throw new Error(`football-data.org request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

function mapApiTeam(team: FootballDataTeam | undefined, fallbackName: string) {
  const name = team?.name || team?.shortName || fallbackName;
  return {
    name,
    flag: "",
    ...getTeamVisual(name, team?.tla || undefined),
  };
}

function statusLabel(status?: string) {
  return status ? toTitleCase(status) : "Scheduled";
}

function toTitleCase(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}
