const chinaTimeZone = "Asia/Shanghai";

export const openingDateChina = new Date("2026-06-12T09:00:00+08:00");

export type OpeningCountdown =
  | { variant: "days"; days: number }
  | { variant: "time"; hours: number; minutes: number }
  | { variant: "opened" };

export function formatChinaDateTimeParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    timeZone: chinaTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]));

  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`,
  };
}

export function formatChinaDateTime(date: Date) {
  const { date: chinaDate, time } = formatChinaDateTimeParts(date);
  return `${chinaDate} ${time}`;
}

export function getDaysUntilOpeningChina(now: Date, openingDate: Date = openingDateChina): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const nowStart = getChinaStartOfDayUtcMs(now);
  const openingStart = getChinaStartOfDayUtcMs(openingDate);
  return Math.max(0, Math.ceil((openingStart - nowStart) / msPerDay));
}

export function getOpeningCountdownChina(now: Date, openingDate: Date = openingDateChina): OpeningCountdown {
  const remainingMs = openingDate.getTime() - now.getTime();

  if (remainingMs <= 0) {
    return { variant: "opened" };
  }

  const msPerDay = 24 * 60 * 60 * 1000;
  if (remainingMs <= msPerDay) {
    const totalMinutes = Math.ceil(remainingMs / (60 * 1000));
    return {
      variant: "time",
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes % 60,
    };
  }

  return { variant: "days", days: getDaysUntilOpeningChina(now, openingDate) };
}

function getChinaStartOfDayUtcMs(date: Date) {
  const { date: chinaDate } = formatChinaDateTimeParts(date);
  const [year, month, day] = chinaDate.split("-").map(Number);
  return Date.UTC(year, month - 1, day) - 8 * 60 * 60 * 1000;
}
