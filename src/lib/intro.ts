/** Delay hero animations on the very first page load so they play as the intro loader lifts. */
export function introDelay(): number {
  if (typeof window === "undefined") return 1.1;
  return performance.now() < 2200 ? 1.1 : 0;
}
