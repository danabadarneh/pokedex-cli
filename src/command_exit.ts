import type { State } from "./state.js";

export async function commandExit(state: State) {
  console.log("Closing the Pokedex... Goodbye!");
  state.pokeApi.stopCache();
  state.rl.close();
}
