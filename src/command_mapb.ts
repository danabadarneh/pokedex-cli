import type { State } from "./state.js";
import { FALLBACK_PAGES } from "./fallbackLocations.js";

function printFallbackPage(state: State, pageIndex: number) {
  const page = FALLBACK_PAGES[Math.max(0, Math.min(pageIndex, FALLBACK_PAGES.length - 1))];
  page.forEach((name) => console.log(name));
}

export async function commandMapBack(state: State) {
  if (state.useFallback) {
    if ((state.fallbackPage ?? 0) <= 0) {
      console.log("you're on the first page");
      return;
    }

    const prevPage = Math.max((state.fallbackPage ?? 0) - 1, 0);
    printFallbackPage(state, prevPage);
    state.fallbackPage = prevPage;
    return;
  }

  if (!state.prevLocationsURL) {
    console.log("you're on the first page");
    return;
  }

  try {
    const data = await state.pokeApi.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = data.next ?? undefined;
    state.prevLocationsURL = data.previous ?? undefined;
    data.results.forEach((result) => console.log(result.name));
  } catch (error) {
    console.error("Failed to fetch previous map:", error instanceof Error ? error.message : error);
    throw error;
  }
}
