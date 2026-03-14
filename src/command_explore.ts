import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
  const areaName = args[0]?.trim();
  if (!areaName) {
    console.log("Usage: explore <location-area>");
    return;
  }

  console.log(`Exploring ${areaName}...`);
  try {
    const data = await state.pokeApi.fetchLocation(areaName);
    const pokemon = data.pokemon_encounters.map((entry) => entry.pokemon.name);
    console.log("Found Pokemon:");
    if (pokemon.length === 0) {
      console.log(" - (none)");
      return;
    }
    pokemon.forEach((name) => console.log(` - ${name}`));
  } catch (error) {
    console.error("Failed to explore:", error instanceof Error ? error.message : error);
  }
}
