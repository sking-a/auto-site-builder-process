import { describe, expect, it } from "vitest";
import { formatChinaDateTime, formatChinaDateTimeParts, getDaysUntilOpeningChina, openingDateChina } from "./chinaTime";

describe("China time utilities", () => {
  it("formats UTC API timestamps as China time", () => {
    expect(formatChinaDateTimeParts(new Date("2026-06-11T20:00:00Z"))).toEqual({
      date: "2026-06-12",
      time: "04:00",
    });
    expect(formatChinaDateTime(new Date("2026-06-11T20:00:00Z"))).toBe("2026-06-12 04:00 中国时间");
  });

  it("calculates opening countdown by China calendar days", () => {
    expect(getDaysUntilOpeningChina(new Date("2026-06-10T08:00:00+08:00"), openingDateChina)).toBe(2);
    expect(getDaysUntilOpeningChina(new Date("2026-06-11T00:01:00+08:00"), openingDateChina)).toBe(1);
    expect(getDaysUntilOpeningChina(new Date("2026-06-12T01:00:00Z"), openingDateChina)).toBe(0);
  });
});
