import { CalendarDays, ChevronRight, Clock3, Menu, Shield, Trophy, Users, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { champions, groups as mockGroups, matches as mockMatches, teams, type Group, type Match, type Team } from "./data/worldCup";
import { fetchLiveWorldCupData, type ApiStatus } from "./services/footballData";
import { getDaysUntilOpening } from "./utils/countdown";

const openingDate = new Date("2026-06-11T20:00:00-05:00");
const navItems = [
  ["Home", "home"],
  ["Schedule", "schedule"],
  ["Standings", "standings"],
  ["Teams", "teams"],
  ["Champions", "champions"],
] as const;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team>(teams[0]);
  const [apiStatus, setApiStatus] = useState<ApiStatus>("loading");
  const [apiError, setApiError] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [liveMatches, setLiveMatches] = useState<Match[]>(mockMatches);
  const [liveGroups, setLiveGroups] = useState<Group[]>(mockGroups);
  const daysLeft = getDaysUntilOpening(new Date(), openingDate);

  useEffect(() => {
    let active = true;

    fetchLiveWorldCupData()
      .then((data) => {
        if (!active) return;
        setLiveMatches(data.matches.length > 0 ? data.matches : mockMatches);
        setLiveGroups(data.groups.length > 0 ? data.groups : mockGroups);
        setFetchedAt(data.fetchedAt);
        setApiStatus("live");
      })
      .catch((error: Error) => {
        if (!active) return;
        setApiError(error.message);
        setApiStatus("fallback");
        setLiveMatches(mockMatches);
        setLiveGroups(mockGroups);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-cupGreen text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-cupGreen/92 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#home" className="flex items-center gap-3 font-display text-lg font-black tracking-normal">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-cupGold bg-cupGold text-cupInk">
              <Trophy size={20} />
            </span>
            2026 World Cup
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map(([label, href]) => (
              <a key={href} href={`#${href}`} className="text-sm font-bold text-white/82 transition hover:text-cupGold">
                {label}
              </a>
            ))}
          </div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded border border-white/20 md:hidden"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        {menuOpen ? (
          <div className="border-t border-white/10 bg-cupInk px-5 py-3 md:hidden">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={`#${href}`}
                className="block py-3 text-sm font-bold text-white/85"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        ) : null}
      </header>

      <main>
        <Hero daysLeft={daysLeft} apiStatus={apiStatus} fetchedAt={fetchedAt} apiError={apiError} />
        <ScheduleSection matches={liveMatches} apiStatus={apiStatus} fetchedAt={fetchedAt} />
        <StandingsSection groups={liveGroups} apiStatus={apiStatus} />
        <TeamsSection selectedTeam={selectedTeam} onSelectTeam={setSelectedTeam} />
        <ChampionsSection />
      </main>
    </div>
  );
}

function Hero({
  daysLeft,
  apiStatus,
  fetchedAt,
  apiError,
}: {
  daysLeft: number;
  apiStatus: ApiStatus;
  fetchedAt: string | null;
  apiError: string | null;
}) {
  return (
    <section id="home" className="relative min-h-[92vh] overflow-hidden pt-24">
      <div className="absolute inset-0 bg-[url('/stadium.svg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-cupInk/35 via-cupGreen/65 to-cupGreen" />
      <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-5 py-20">
        <div className="max-w-3xl">
          <h1 className="font-display text-5xl font-black leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
            2026 FIFA World Cup
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
            Explore a clean mock portal for fixtures, scores, group standings, squads, coaches, and the champions who
            shaped football history.
          </p>
        </div>
        <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-[1fr_1.3fr]">
          <div className="rounded-lg border border-cupGold/55 bg-cupInk/70 p-6 shadow-gold backdrop-blur">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cupGold">Opening countdown</p>
            <div className="mt-3 flex items-end gap-3">
              <span className="text-6xl font-black text-cupGold">{daysLeft}</span>
              <span className="pb-2 text-xl font-bold">days</span>
            </div>
            <p className="mt-3 text-sm text-white/70">Opening match: June 11, 2026</p>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 p-6 backdrop-blur">
            <div className="flex items-center gap-3 text-cupGold">
              <CalendarDays size={22} />
              <span className="text-sm font-bold uppercase tracking-[0.16em]">football-data.org feed</span>
            </div>
            <p className="mt-4 text-2xl font-black">{statusMessage(apiStatus)}</p>
            <p className="mt-3 text-sm leading-6 text-white/68">
              {fetchedAt
                ? `Updated ${new Date(fetchedAt).toLocaleString()}`
                : apiError
                  ? "Showing built-in mock data until the live feed responds."
                  : "Fetching World Cup matches and standings through the local token proxy."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScheduleSection({
  matches,
  apiStatus,
  fetchedAt,
}: {
  matches: Match[];
  apiStatus: ApiStatus;
  fetchedAt: string | null;
}) {
  const stagedMatches = useMemo(
    () => ({
      "Group Stage": matches.filter((match) => match.stage === "Group Stage"),
      "Knockout Stage": matches.filter((match) => match.stage === "Knockout Stage"),
    }),
    [matches],
  );

  return (
    <Section id="schedule" title="Match Schedule" icon={<Clock3 size={22} />}>
      <DataStatus status={apiStatus} fetchedAt={fetchedAt} className="mb-5" />
      <div className="grid gap-7 lg:grid-cols-2">
        {Object.entries(stagedMatches).map(([stage, stageMatches]) => (
          <div key={stage} className="rounded-lg border border-white/12 bg-white p-5 text-cupInk shadow-xl">
            <h3 className="mb-4 text-2xl font-black">{stage}</h3>
            <div className="space-y-3">
              {stageMatches.map((match) => (
                <article
                  key={match.id}
                  className="rounded-md border border-cupGreen/10 bg-white p-4 transition hover:-translate-y-1 hover:border-cupGold hover:shadow-gold"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-bold text-cupGreen/70">
                    <span>{match.round}</span>
                    <span>
                      {match.date} · {match.time}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <TeamLine team={match.home} align="right" />
                    <span className="rounded bg-cupGreen px-3 py-2 text-center text-lg font-black text-cupGold">
                      {match.score}
                    </span>
                    <TeamLine team={match.away} />
                  </div>
                  <p className="mt-3 text-sm text-cupGreen/62">{match.venue}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FlagBadge({
  team,
  size = "md",
}: {
  team: { name?: string; flagCode: string; flagStyle: string };
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = size === "lg" ? "h-14 w-20 text-lg" : size === "sm" ? "h-6 w-9 text-[10px]" : "h-8 w-12 text-xs";
  return (
    <span
      className={`${sizeClass} inline-grid shrink-0 place-items-center overflow-hidden rounded border border-cupInk/20 font-black text-white shadow-sm [text-shadow:0_1px_2px_rgba(0,0,0,.55)]`}
      style={{ background: team.flagStyle }}
      aria-label={`${team.name ?? team.flagCode} flag`}
      role="img"
    >
      {team.flagCode}
    </span>
  );
}

function TeamLine({
  team,
  align = "left",
}: {
  team: { name: string; flagCode: string; flagStyle: string };
  align?: "left" | "right";
}) {
  return (
    <div className={`flex items-center gap-2 ${align === "right" ? "justify-end text-right" : ""}`}>
      {align === "left" ? <FlagBadge team={team} /> : null}
      <span className="font-black">{team.name}</span>
      {align === "right" ? <FlagBadge team={team} /> : null}
    </div>
  );
}

function StandingsSection({ groups, apiStatus }: { groups: Group[]; apiStatus: ApiStatus }) {
  return (
    <Section id="standings" title="Group Standings" icon={<Shield size={22} />}>
      <DataStatus status={apiStatus} className="mb-5" />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {groups.map((group, groupIndex) => (
          <div key={`${group.name}-${groupIndex}`} className="overflow-hidden rounded-lg border border-white/12 bg-white text-cupInk shadow-xl">
            <h3 className="bg-cupInk px-4 py-3 text-lg font-black text-cupGold">{group.name}</h3>
            <table className="w-full text-sm">
              <thead className="bg-cupGreen/8 text-left text-xs uppercase text-cupGreen/62">
                <tr>
                  <th className="px-4 py-3">Team</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>Pts</th>
                </tr>
              </thead>
              <tbody>
                {group.table.map((row) => (
                  <tr key={row.team.name} className="border-t border-cupGreen/10 transition hover:bg-cupGold/18">
                    <td className="px-4 py-3 font-bold">
                      <span className="flex items-center gap-2">
                        <FlagBadge team={row.team} size="sm" />
                        {row.team.name}
                      </span>
                    </td>
                    <td>{row.wins}</td>
                    <td>{row.draws}</td>
                    <td>{row.losses}</td>
                    <td>{row.goalsFor}</td>
                    <td>{row.goalsAgainst}</td>
                    <td className="font-black text-cupGreen">{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </Section>
  );
}

function TeamsSection({ selectedTeam, onSelectTeam }: { selectedTeam: Team; onSelectTeam: (team: Team) => void }) {
  return (
    <Section id="teams" title="Teams" icon={<Users size={22} />}>
      <div className="grid gap-7 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {teams.map((team) => (
            <button
              key={team.id}
              type="button"
              aria-label={`View ${team.name} squad`}
              onClick={() => onSelectTeam(team)}
              className={`rounded-lg border p-5 text-left transition hover:-translate-y-1 hover:shadow-gold ${
                selectedTeam.id === team.id
                  ? "border-cupGold bg-cupGold text-cupInk"
                  : "border-white/12 bg-white text-cupInk"
              }`}
            >
              <FlagBadge team={team} size="lg" />
              <h3 className="mt-4 text-lg font-black">{team.name}</h3>
              <p className="text-sm font-bold opacity-70">{team.group}</p>
            </button>
          ))}
        </div>
        <aside className="sticky top-24 self-start rounded-lg border border-cupGold/45 bg-cupInk p-6 shadow-gold">
          <FlagBadge team={selectedTeam} size="lg" />
          <h3 className="mt-4 text-3xl font-black">{selectedTeam.name}</h3>
          <p className="mt-2 text-cupGold">
            <span className="font-black">Head Coach:</span> {selectedTeam.coach}
          </p>
          <div className="mt-6">
            <h4 className="text-sm font-black uppercase tracking-[0.16em] text-white/60">Squad highlights</h4>
            <ul className="mt-3 space-y-3">
              {selectedTeam.squad.map((player) => (
                <li key={player} className="flex items-center gap-3 rounded bg-white/8 px-3 py-2">
                  <ChevronRight size={16} className="text-cupGold" />
                  {player}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function ChampionsSection() {
  return (
    <Section id="champions" title="Past Champions" icon={<Trophy size={22} />}>
      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-5 top-0 hidden h-full w-px bg-cupGold/50 sm:block" />
        <div className="space-y-5">
          {champions.map((champion) => (
            <article
              key={champion.year}
              className="relative rounded-lg border border-white/12 bg-white p-5 text-cupInk transition hover:-translate-y-1 hover:border-cupGold hover:shadow-gold sm:ml-14"
            >
              <span className="absolute -left-[4.15rem] top-6 hidden h-4 w-4 rounded-full border-4 border-cupGreen bg-cupGold sm:block" />
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-cupGreen/60">{champion.host}</p>
                  <h3 className="mt-1 text-2xl font-black">
                    <span className="inline-flex items-center gap-3">
                      {champion.year} · <FlagBadge team={champion} /> {champion.winner}
                    </span>
                  </h3>
                </div>
                <p className="rounded bg-cupGreen px-4 py-2 text-sm font-black text-cupGold">Runner-up: {champion.runnerUp}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function DataStatus({
  status,
  fetchedAt,
  className = "",
}: {
  status: ApiStatus;
  fetchedAt?: string | null;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 text-sm ${className}`}>
      <span className="rounded bg-cupGold px-3 py-2 font-black text-cupInk">{statusMessage(status)}</span>
      <span className="text-white/70">
        {status === "live" && fetchedAt ? `Updated ${new Date(fetchedAt).toLocaleString()}` : "Season: 2026"}
      </span>
    </div>
  );
}

function statusMessage(status: ApiStatus) {
  if (status === "loading") return "Loading live data";
  if (status === "live") return "Live API data";
  if (status === "error") return "API error";
  return "Mock fallback data";
}

function Section({
  id,
  title,
  icon,
  children,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded bg-cupGold text-cupInk">{icon}</span>
          <h2 className="font-display text-3xl font-black tracking-normal sm:text-4xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

export default App;
