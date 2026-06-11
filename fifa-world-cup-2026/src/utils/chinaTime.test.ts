import { describe, expect, it } from "vitest";
import {
  formatChinaDateTime,
  formatChinaDateTimeParts,
  getDaysUntilOpeningChina,
  getOpeningCountdownChina,
  openingDateChina,
} from "./chinaTime";

describe("China time utilities", () => {
  it("formats UTC API timestamps as China time", () => {
    expect(formatChinaDateTimeParts(new Date("2026-06-11T20:00:00Z"))).toEqual({
      date: "2026-06-12",
      time: "04:00",
    });
    expect(formatChinaDateTime(new Date("2026-06-11T20:00:00Z"))).toBe("2026-06-12 04:00");
  });

  it("calculates opening countdown by China calendar days", () => {
    expect(getDaysUntilOpeningChina(new Date("2026-06-10T08:00:00+08:00"), openingDateChina)).toBe(2);
    expect(getDaysUntilOpeningChina(new Date("2026-06-11T00:01:00+08:00"), openingDateChina)).toBe(1);
    expect(getDaysUntilOpeningChina(new Date("2026-06-12T01:00:00Z"), openingDateChina)).toBe(0);
  });

  it("switches to hours and minutes in the final 24 hours", () => {
    expect(getOpeningCountdownChina(new Date("2026-06-10T08:00:00+08:00"), openingDateChina)).toEqual({
      variant: "days",
      days: 2,
    });
    expect(getOpeningCountdownChina(new Date("2026-06-11T10:30:00+08:00"), openingDateChina)).toEqual({
      variant: "time",
      hours: 22,
      minutes: 30,
    });
    expect(getOpeningCountdownChina(new Date("2026-06-12T08:01:00+08:00"), openingDateChina)).toEqual({
      variant: "time",
      hours: 0,
      minutes: 59,
    });
    expect(getOpeningCountdownChina(new Date("2026-06-12T09:00:00+08:00"), openingDateChina)).toEqual({
      variant: "opened",
    });
  });
});
