import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the required World Cup sections", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /2026 FIFA World Cup/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Match Schedule/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Group Standings/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Teams/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Past Champions/i })).toBeInTheDocument();
  });

  it("opens a team detail panel from a team card", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /view Brazil squad/i }));

    expect(screen.getByText(/Head Coach:/i)).toBeInTheDocument();
    expect(screen.getByText(/Dorival Junior/i)).toBeInTheDocument();
    expect(screen.getByText(/Vinicius Junior/i)).toBeInTheDocument();
  });
});
