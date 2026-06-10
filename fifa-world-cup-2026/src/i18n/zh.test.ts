import { describe, expect, it } from "vitest";
import { localizeTeamName } from "./zh";

describe("Chinese team-name localization", () => {
  it("localizes API team names that appear in the 2026 schedule feed", () => {
    expect(localizeTeamName("Norway")).toBe("挪威");
    expect(localizeTeamName("Iraq")).toBe("伊拉克");
    expect(localizeTeamName("Austria")).toBe("奥地利");
    expect(localizeTeamName("Jordan")).toBe("约旦");
    expect(localizeTeamName("Algeria")).toBe("阿尔及利亚");
    expect(localizeTeamName("Uzbekistan")).toBe("乌兹别克斯坦");
  });
});
