import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
  const name = args[0]?.trim().toLowerCase();
  if (!name) {
    console.log("Usage: catch <pokemon>");
    return;
  }

  console.log(`Throwing a Pokeball at ${name}...`);
  try {
    const pokemon = await state.pokeApi.fetchPokemon(name);
    const baseExp = pokemon.base_experience ?? 0;
    const difficulty = Math.min(baseExp / 500, 0.95);
    const chance = Math.max(0.05, 1 - difficulty);
    const roll = Math.random();
    if (roll <= chance) {
      console.log(`${name} was caught!`);
      state.pokedex[name] = pokemon;
    } else {
      console.log(`${name} escaped!`);
    }
  } catch (error) {
    console.error("Failed to catch pokemon:", error instanceof Error ? error.message : error);
  }
}
