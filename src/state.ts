import { createInterface, type Interface } from "readline";
import { PokeApi, type PokemonDetails } from "./pokeapi.js";

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeApi: PokeApi;
  nextLocationsURL?: string;
  prevLocationsURL?: string;
  useFallback?: boolean;
  fallbackPage?: number;
  pokedex: Record<string, PokemonDetails>;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState(commands: Record<string, CLICommand>): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  return {
    rl,
    commands,
    pokeApi: new PokeApi(),
    useFallback: false,
    fallbackPage: -1,
    pokedex: {},
  };
}
