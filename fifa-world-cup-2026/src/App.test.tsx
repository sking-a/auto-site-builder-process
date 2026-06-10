import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the required Chinese World Cup sections", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /2026 FIFA 世界杯/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /赛程/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /积分榜/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /参赛球队/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /历届冠军/i })).toBeInTheDocument();
    expect(screen.queryByText(/football-data\.org/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/实时 API 数据/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/模拟数据回退/i)).not.toBeInTheDocument();
  });

  it("opens a localized team detail panel from a team card", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /查看巴西阵容/i }));

    expect(screen.getByText(/主教练：/i)).toBeInTheDocument();
    expect(screen.getByText(/多里瓦尔·儒尼奥尔/i)).toBeInTheDocument();
    expect(screen.getByText(/维尼修斯·儒尼奥尔/i)).toBeInTheDocument();
  });
});
