import { describe, expect, it } from "vitest";
import {
  mapFootballDataMatches,
  mapFootballDataStandings,
  normalizeFootballDataGroup,
  normalizeFootballDataStage,
} from "./footballData";

describe("football-data.org mapping", () => {
  it("maps API match payloads into schedule cards", () => {
    const mapped = mapFootballDataMatches([
      {
        id: 101,
        utcDate: "2026-06-11T20:00:00Z",
        status: "FINISHED",
        stage: "GROUP_STAGE",
        group: "GROUP_A",
        matchday: 1,
        homeTeam: { name: "Mexico", tla: "MEX" },
        awayTeam: { name: "Canada", tla: "CAN" },
        score: { fullTime: { home: 2, away: 1 } },
      },
      {
        id: 102,
        utcDate: "2026-07-19T19:00:00Z",
        status: "TIMED",
        stage: "FINAL",
        homeTeam: { name: "Brazil", tla: "BRA" },
        awayTeam: { name: "France", tla: "FRA" },
        score: { fullTime: { home: null, away: null } },
      },
    ]);

    expect(mapped[0]).toMatchObject({
      id: "api-101",
      stage: "Group Stage",
      round: "Group A · Matchday 1",
      date: "2026-06-11",
      time: "20:00",
      score: "2-1",
      home: { name: "Mexico", flagCode: "MX" },
      away: { name: "Canada", flagCode: "CA" },
    });
    expect(mapped[1]).toMatchObject({
      stage: "Knockout Stage",
      round: "Final",
      score: "TBD",
    });
  });

  it("maps API standings payloads into grouped tables", () => {
    const mapped = mapFootballDataStandings([
      {
        group: "GROUP_A",
        table: [
          {
            team: { name: "Canada", tla: "CAN" },
            won: 2,
            draw: 1,
            lost: 0,
            goalsFor: 5,
            goalsAgainst: 2,
            points: 7,
          },
        ],
      },
    ]);

    expect(mapped).toEqual([
      {
        name: "Group A",
        table: [
          {
            team: expect.objectContaining({ name: "Canada", flagCode: "CA" }),
            wins: 2,
            draws: 1,
            losses: 0,
            goalsFor: 5,
            goalsAgainst: 2,
            points: 7,
          },
        ],
      },
    ]);
  });

  it("normalizes football-data stage and group labels", () => {
    expect(normalizeFootballDataStage("GROUP_STAGE")).toBe("Group Stage");
    expect(normalizeFootballDataStage("SEMI_FINALS")).toBe("Knockout Stage");
    expect(normalizeFootballDataGroup("GROUP_H")).toBe("Group H");
    expect(normalizeFootballDataGroup(null)).toBe("Competition");
  });
});
