import { localizeGroupName, localizePersonName, localizeRound, localizeTeamName, localizeVenue } from "../i18n/zh";

export type Team = {
  id: string;
  name: string;
  flag: string;
  flagCode: string;
  flagStyle: string;
  group: string;
  coach: string;
  squad: string[];
};

export type Match = {
  id: string;
  stage: "小组赛" | "淘汰赛";
  round: string;
  date: string;
  time: string;
  venue: string;
  home: Pick<Team, "name" | "flag" | "flagCode" | "flagStyle">;
  away: Pick<Team, "name" | "flag" | "flagCode" | "flagStyle">;
  score: string;
};

export type StandingRow = {
  team: Pick<Team, "name" | "flag" | "flagCode" | "flagStyle">;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
};

export type Group = {
  name: string;
  table: StandingRow[];
};

export type Champion = {
  year: number;
  host: string;
  winner: string;
  flag: string;
  flagCode: string;
  flagStyle: string;
  runnerUp: string;
};

const groupNames = ["A组", "B组", "C组", "D组", "E组", "F组", "G组", "H组"];

export const flagMeta: Record<string, { code: string; style: string }> = {
  Brazil: { code: "BR", style: "linear-gradient(135deg,#229e45 0 32%,#f7d117 32% 68%,#2b4db8 68% 100%)" },
  Canada: { code: "CA", style: "linear-gradient(90deg,#d52b1e 0 30%,#fff 30% 70%,#d52b1e 70% 100%)" },
  Japan: { code: "JP", style: "radial-gradient(circle,#bc002d 0 34%,#fff 35% 100%)" },
  Morocco: { code: "MA", style: "linear-gradient(135deg,#c1272d 0 72%,#006233 72% 100%)" },
  Argentina: { code: "AR", style: "linear-gradient(180deg,#75aadb 0 33%,#fff 33% 66%,#75aadb 66% 100%)" },
  "United States": { code: "US", style: "linear-gradient(180deg,#b22234 0 14%,#fff 14% 28%,#b22234 28% 42%,#fff 42% 56%,#3c3b6e 56% 100%)" },
  Senegal: { code: "SN", style: "linear-gradient(90deg,#00853f 0 33%,#fdef42 33% 66%,#e31b23 66% 100%)" },
  Serbia: { code: "RS", style: "linear-gradient(180deg,#c6363c 0 33%,#0c4076 33% 66%,#fff 66% 100%)" },
  France: { code: "FR", style: "linear-gradient(90deg,#0055a4 0 33%,#fff 33% 66%,#ef4135 66% 100%)" },
  Mexico: { code: "MX", style: "linear-gradient(90deg,#006847 0 33%,#fff 33% 66%,#ce1126 66% 100%)" },
  "South Korea": { code: "KR", style: "linear-gradient(135deg,#fff 0 38%,#c60c30 38% 58%,#003478 58% 100%)" },
  Switzerland: { code: "CH", style: "linear-gradient(135deg,#d52b1e 0 45%,#fff 45% 55%,#d52b1e 55% 100%)" },
  Spain: { code: "ES", style: "linear-gradient(180deg,#aa151b 0 25%,#f1bf00 25% 75%,#aa151b 75% 100%)" },
  Australia: { code: "AU", style: "linear-gradient(135deg,#012169 0 60%,#fff 60% 72%,#e4002b 72% 100%)" },
  Nigeria: { code: "NG", style: "linear-gradient(90deg,#008751 0 33%,#fff 33% 66%,#008751 66% 100%)" },
  Croatia: { code: "HR", style: "linear-gradient(180deg,#f00 0 33%,#fff 33% 66%,#171796 66% 100%)" },
  England: { code: "EN", style: "linear-gradient(135deg,#fff 0 42%,#c8102e 42% 58%,#fff 58% 100%)" },
  "Costa Rica": { code: "CR", style: "linear-gradient(180deg,#002b7f 0 18%,#fff 18% 32%,#ce1126 32% 68%,#fff 68% 82%,#002b7f 82% 100%)" },
  Ghana: { code: "GH", style: "linear-gradient(180deg,#ce1126 0 33%,#fcd116 33% 66%,#006b3f 66% 100%)" },
  Netherlands: { code: "NL", style: "linear-gradient(180deg,#ae1c28 0 33%,#fff 33% 66%,#21468b 66% 100%)" },
  Portugal: { code: "PT", style: "linear-gradient(90deg,#006600 0 40%,#ff0000 40% 100%)" },
  Ecuador: { code: "EC", style: "linear-gradient(180deg,#ffdd00 0 50%,#034ea2 50% 75%,#ed1c24 75% 100%)" },
  Cameroon: { code: "CM", style: "linear-gradient(90deg,#007a5e 0 33%,#ce1126 33% 66%,#fcd116 66% 100%)" },
  Poland: { code: "PL", style: "linear-gradient(180deg,#fff 0 50%,#dc143c 50% 100%)" },
  Germany: { code: "DE", style: "linear-gradient(180deg,#000 0 33%,#dd0000 33% 66%,#ffce00 66% 100%)" },
  Uruguay: { code: "UY", style: "linear-gradient(180deg,#fff 0 14%,#0038a8 14% 28%,#fff 28% 42%,#0038a8 42% 56%,#fff 56% 70%,#0038a8 70% 84%,#fff 84% 100%)" },
  Iran: { code: "IR", style: "linear-gradient(180deg,#239f40 0 33%,#fff 33% 66%,#da0000 66% 100%)" },
  Denmark: { code: "DK", style: "linear-gradient(90deg,#c60c30 0 36%,#fff 36% 46%,#c60c30 46% 100%)" },
  Belgium: { code: "BE", style: "linear-gradient(90deg,#000 0 33%,#fae042 33% 66%,#ed2939 66% 100%)" },
  "Saudi Arabia": { code: "SA", style: "linear-gradient(135deg,#006c35 0 82%,#fff 82% 100%)" },
  Tunisia: { code: "TN", style: "radial-gradient(circle,#fff 0 28%,#e70013 29% 100%)" },
  Italy: { code: "IT", style: "linear-gradient(90deg,#009246 0 33%,#fff 33% 66%,#ce2b37 66% 100%)" },
};

export function getTeamVisual(name: string, fallbackCode?: string) {
  const known = flagMeta[name];
  if (known) return { flagCode: known.code, flagStyle: known.style };

  const normalizedCode = (fallbackCode || name.slice(0, 3)).replace(/[^a-z]/gi, "").slice(0, 3).toUpperCase() || "TBD";
  const hue = [...name].reduce((total, char) => total + char.charCodeAt(0), 0) % 360;

  return {
    flagCode: normalizedCode,
    flagStyle: `linear-gradient(135deg,hsl(${hue} 65% 38%) 0 50%,#ffffff 50% 62%,hsl(${(hue + 80) % 360} 68% 42%) 62% 100%)`,
  };
}

const teamSeeds = [
  ["Brazil", "🇧🇷", "Dorival Junior", ["Alisson", "Marquinhos", "Casemiro", "Vinicius Junior"]],
  ["Canada", "🇨🇦", "Jesse Marsch", ["Alphonso Davies", "Jonathan David", "Tajon Buchanan", "Stephen Eustaquio"]],
  ["Japan", "🇯🇵", "Hajime Moriyasu", ["Takefusa Kubo", "Kaoru Mitoma", "Wataru Endo", "Daichi Kamada"]],
  ["Morocco", "🇲🇦", "Walid Regragui", ["Achraf Hakimi", "Sofyan Amrabat", "Hakim Ziyech", "Youssef En-Nesyri"]],
  ["Argentina", "🇦🇷", "Lionel Scaloni", ["Emiliano Martinez", "Julian Alvarez", "Lautaro Martinez", "Enzo Fernandez"]],
  ["United States", "🇺🇸", "Mauricio Pochettino", ["Christian Pulisic", "Weston McKennie", "Tyler Adams", "Gio Reyna"]],
  ["Senegal", "🇸🇳", "Pape Thiaw", ["Sadio Mane", "Kalidou Koulibaly", "Ismaila Sarr", "Nicolas Jackson"]],
  ["Serbia", "🇷🇸", "Dragan Stojkovic", ["Dusan Vlahovic", "Sergej Milinkovic-Savic", "Aleksandar Mitrovic", "Filip Kostic"]],
  ["France", "🇫🇷", "Didier Deschamps", ["Kylian Mbappe", "Antoine Griezmann", "Aurelien Tchouameni", "Mike Maignan"]],
  ["Mexico", "🇲🇽", "Javier Aguirre", ["Santiago Gimenez", "Edson Alvarez", "Hirving Lozano", "Guillermo Ochoa"]],
  ["South Korea", "🇰🇷", "Hong Myung-bo", ["Son Heung-min", "Kim Min-jae", "Lee Kang-in", "Hwang Hee-chan"]],
  ["Switzerland", "🇨🇭", "Murat Yakin", ["Granit Xhaka", "Manuel Akanji", "Xherdan Shaqiri", "Yann Sommer"]],
  ["Spain", "🇪🇸", "Luis de la Fuente", ["Pedri", "Lamine Yamal", "Rodri", "Unai Simon"]],
  ["Australia", "🇦🇺", "Tony Popovic", ["Mathew Ryan", "Jackson Irvine", "Craig Goodwin", "Harry Souttar"]],
  ["Nigeria", "🇳🇬", "Eric Chelle", ["Victor Osimhen", "Ademola Lookman", "Alex Iwobi", "Wilfred Ndidi"]],
  ["Croatia", "🇭🇷", "Zlatko Dalic", ["Luka Modric", "Mateo Kovacic", "Josko Gvardiol", "Dominik Livakovic"]],
  ["England", "🇬🇧", "Thomas Tuchel", ["Harry Kane", "Jude Bellingham", "Bukayo Saka", "Declan Rice"]],
  ["Costa Rica", "🇨🇷", "Miguel Herrera", ["Keylor Navas", "Joel Campbell", "Francisco Calvo", "Brandon Aguilera"]],
  ["Ghana", "🇬🇭", "Otto Addo", ["Mohammed Kudus", "Thomas Partey", "Jordan Ayew", "Inaki Williams"]],
  ["Netherlands", "🇳🇱", "Ronald Koeman", ["Virgil van Dijk", "Frenkie de Jong", "Cody Gakpo", "Xavi Simons"]],
  ["Portugal", "🇵🇹", "Roberto Martinez", ["Cristiano Ronaldo", "Bruno Fernandes", "Bernardo Silva", "Ruben Dias"]],
  ["Ecuador", "🇪🇨", "Sebastian Beccacece", ["Moises Caicedo", "Pervis Estupinan", "Enner Valencia", "Piero Hincapie"]],
  ["Cameroon", "🇨🇲", "Marc Brys", ["Andre Onana", "Andre-Frank Zambo Anguissa", "Bryan Mbeumo", "Vincent Aboubakar"]],
  ["Poland", "🇵🇱", "Michal Probierz", ["Robert Lewandowski", "Piotr Zielinski", "Wojciech Szczesny", "Jakub Kiwior"]],
  ["Germany", "🇩🇪", "Julian Nagelsmann", ["Jamal Musiala", "Florian Wirtz", "Joshua Kimmich", "Kai Havertz"]],
  ["Uruguay", "🇺🇾", "Marcelo Bielsa", ["Federico Valverde", "Darwin Nunez", "Ronald Araujo", "Manuel Ugarte"]],
  ["Iran", "🇮🇷", "Amir Ghalenoei", ["Mehdi Taremi", "Sardar Azmoun", "Alireza Jahanbakhsh", "Saman Ghoddos"]],
  ["Denmark", "🇩🇰", "Brian Riemer", ["Christian Eriksen", "Rasmus Hojlund", "Pierre-Emile Hojbjerg", "Andreas Christensen"]],
  ["Belgium", "🇧🇪", "Rudi Garcia", ["Kevin De Bruyne", "Romelu Lukaku", "Jeremy Doku", "Youri Tielemans"]],
  ["Saudi Arabia", "🇸🇦", "Herve Renard", ["Salem Al-Dawsari", "Firas Al-Buraikan", "Mohammed Al-Owais", "Ali Al-Bulaihi"]],
  ["Tunisia", "🇹🇳", "Sami Trabelsi", ["Ellyes Skhiri", "Wahbi Khazri", "Aissa Laidouni", "Youssef Msakni"]],
  ["Italy", "🇮🇹", "Luciano Spalletti", ["Gianluigi Donnarumma", "Nicolo Barella", "Federico Chiesa", "Alessandro Bastoni"]],
] as const;

export const teams: Team[] = teamSeeds.map(([name, flag, coach, squad], index) => ({
  id: name.toLowerCase().replace(/\s+/g, "-"),
  name,
  flag,
  ...getTeamVisual(name),
  coach: localizePersonName(coach),
  squad: squad.map((player) => localizePersonName(player)),
  group: groupNames[Math.floor(index / 4)],
}));

const teamByName = (name: string) => {
  const team = teams.find((item) => item.name === name);
  if (!team) throw new Error(`Missing team ${name}`);
  return { name: team.name, flag: team.flag, flagCode: team.flagCode, flagStyle: team.flagStyle };
};

export const matches: Match[] = [
  ["m1", "小组赛", "Matchday 1", "2026-06-12", "09:00", "Mexico City", "Mexico", "Canada", "1-1"],
  ["m2", "小组赛", "Matchday 1", "2026-06-13", "09:00", "Los Angeles", "Brazil", "Morocco", "2-0"],
  ["m3", "小组赛", "Matchday 1", "2026-06-14", "09:00", "New York/New Jersey", "Argentina", "United States", "2-2"],
  ["m4", "小组赛", "Matchday 2", "2026-06-19", "07:00", "Toronto", "France", "Mexico", "3-1"],
  ["m5", "小组赛", "Matchday 2", "2026-06-20", "06:00", "Dallas", "Spain", "Croatia", "0-0"],
  ["m6", "小组赛", "Matchday 3", "2026-06-25", "08:00", "Atlanta", "England", "Netherlands", "1-0"],
  ["m7", "淘汰赛", "Round of 16", "2026-07-05", "06:00", "Philadelphia", "Brazil", "United States", "TBD"],
  ["m8", "淘汰赛", "Quarterfinal", "2026-07-11", "09:00", "Kansas City", "France", "Spain", "TBD"],
  ["m9", "淘汰赛", "Semifinal", "2026-07-15", "10:00", "Dallas", "Argentina", "Germany", "TBD"],
  ["m10", "淘汰赛", "Final", "2026-07-20", "07:00", "New York/New Jersey", "Brazil", "France", "TBD"],
].map(([id, stage, round, date, time, venue, home, away, score]) => ({
  id,
  stage: stage as Match["stage"],
  round: localizeRound(round),
  date,
  time,
  venue: localizeVenue(venue),
  home: teamByName(home),
  away: teamByName(away),
  score,
}));

export const groups: Group[] = groupNames.map((name, groupIndex) => {
  const groupTeams = teams.slice(groupIndex * 4, groupIndex * 4 + 4);
  return {
    name,
    table: groupTeams.map((team, index) => ({
      team: { name: team.name, flag: team.flag, flagCode: team.flagCode, flagStyle: team.flagStyle },
      wins: Math.max(0, 2 - index),
      draws: index === 1 ? 1 : index === 2 ? 2 : 0,
      losses: index,
      goalsFor: 6 - index,
      goalsAgainst: 2 + index,
      points: Math.max(1, 6 - index * 2),
    })),
  };
});

export const champions: Champion[] = [
  ["1930", "Uruguay", "Uruguay", "Argentina"],
  ["1958", "Sweden", "Brazil", "Sweden"],
  ["1974", "West Germany", "Germany", "Netherlands"],
  ["1986", "Mexico", "Argentina", "West Germany"],
  ["1998", "France", "France", "Brazil"],
  ["2002", "South Korea/Japan", "Brazil", "Germany"],
  ["2010", "South Africa", "Spain", "Netherlands"],
  ["2014", "Brazil", "Germany", "Argentina"],
  ["2018", "Russia", "France", "Croatia"],
  ["2022", "Qatar", "Argentina", "France"],
].map(([year, host, winner, runnerUp]) => ({
  year: Number(year),
  host: localizeTeamName(host),
  winner: localizeTeamName(winner),
  flag: "",
  flagCode: flagMeta[winner]?.code ?? winner.slice(0, 2).toUpperCase(),
  flagStyle: flagMeta[winner]?.style ?? "linear-gradient(135deg,#fff,#ffd700)",
  runnerUp: localizeTeamName(runnerUp),
}));
