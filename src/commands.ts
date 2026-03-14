import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_mapb.js";
import { commandPokedex } from "./command_pokedex.js";
import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    map: {
      name: "map",
      description: "Show next 20 locations",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Show previous 20 locations",
      callback: commandMapBack,
    },
    explore: {
      name: "explore",
      description: "Explore a location area",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Attempt to catch a pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Inspect a caught pokemon",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "List caught pokemon",
      callback: commandPokedex,
    },
  };
}
