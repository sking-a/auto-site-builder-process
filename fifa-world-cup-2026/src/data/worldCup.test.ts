import { describe, expect, it } from "vitest";
import { champions, groups, matches, teams } from "./worldCup";
import { getDaysUntilOpening } from "../utils/countdown";

describe("world cup mock data", () => {
  it("contains 32 teams across eight groups", () => {
    expect(teams).toHaveLength(32);
    expect(groups).toHaveLength(8);
    expect(groups.map((group) => group.name)).toEqual([
      "A组",
      "B组",
      "C组",
      "D组",
      "E组",
      "F组",
      "G组",
      "H组",
    ]);
    expect(groups.every((group) => group.table.length === 4)).toBe(true);
  });

  it("localizes coach and squad names for team details", () => {
    const canada = teams.find((team) => team.name === "Canada");

    expect(canada?.coach).toBe("杰西·马什");
    expect(canada?.squad).toEqual(["阿方索·戴维斯", "乔纳森·戴维", "塔琼·布坎南", "斯蒂芬·欧斯塔基奥"]);
  });

  it("splits matches into group and knockout stages", () => {
    expect(matches.some((match) => match.stage === "小组赛")).toBe(true);
    expect(matches.some((match) => match.stage === "淘汰赛")).toBe(true);
  });

  it("includes historic champions in chronological order", () => {
    expect(champions[0].year).toBe(1930);
    expect(champions.at(-1)?.year).toBe(2022);
  });
});

describe("countdown utility", () => {
  it("returns whole days until the opening match", () => {
    const days = getDaysUntilOpening(
      new Date("2026-06-10T00:00:00Z"),
      new Date("2026-06-11T00:00:00Z"),
    );

    expect(days).toBe(1);
  });

  it("never returns a negative number after opening day", () => {
    const days = getDaysUntilOpening(
      new Date("2026-06-12T00:00:00Z"),
      new Date("2026-06-11T00:00:00Z"),
    );

    expect(days).toBe(0);
  });
});
