export function getDaysUntilOpening(now: Date, openingDate: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const diff = openingDate.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / msPerDay));
}
