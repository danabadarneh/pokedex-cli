import type { State } from "./state.js";
import { FALLBACK_PAGES } from "./fallbackLocations.js";

function printFallbackPage(state: State, pageIndex: number) {
  const page = FALLBACK_PAGES[Math.max(0, Math.min(pageIndex, FALLBACK_PAGES.length - 1))];
  page.forEach((name) => console.log(name));
}

export async function commandMap(state: State) {
  if (state.useFallback) {
    const nextPage = Math.min((state.fallbackPage ?? -1) + 1, FALLBACK_PAGES.length - 1);
    printFallbackPage(state, nextPage);
    state.fallbackPage = nextPage;
    return;
  }

  try {
    const data = await state.pokeApi.fetchLocations(state.nextLocationsURL);
    console.log("map data length", data.results.length);
    state.nextLocationsURL = data.next ?? undefined;
    state.prevLocationsURL = data.previous ?? undefined;
    data.results.forEach((result) => console.log(result.name));
  } catch (error) {
    console.error("Failed to fetch map:", error instanceof Error ? error.message : error);
    state.useFallback = true;
    state.fallbackPage = -1;
    printFallbackPage(state, 0);
    state.fallbackPage = 0;
  }
}
