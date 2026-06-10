const chinaTimeZone = "Asia/Shanghai";

export const openingDateChina = new Date("2026-06-12T09:00:00+08:00");

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
  return `${chinaDate} ${time} 中国时间`;
}

export function getDaysUntilOpeningChina(now: Date, openingDate: Date = openingDateChina): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const nowStart = getChinaStartOfDayUtcMs(now);
  const openingStart = getChinaStartOfDayUtcMs(openingDate);
  return Math.max(0, Math.ceil((openingStart - nowStart) / msPerDay));
}

function getChinaStartOfDayUtcMs(date: Date) {
  const { date: chinaDate } = formatChinaDateTimeParts(date);
  const [year, month, day] = chinaDate.split("-").map(Number);
  return Date.UTC(year, month - 1, day) - 8 * 60 * 60 * 1000;
}
