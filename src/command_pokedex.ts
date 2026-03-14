import type { State } from "./state.js";

export async function commandPokedex(state: State) {
  const caught = Object.keys(state.pokedex);
  console.log("Your Pokedex:");
  if (caught.length === 0) {
    console.log(" - (empty)");
    return;
  }
  caught.forEach((name) => console.log(` - ${name}`));
}
