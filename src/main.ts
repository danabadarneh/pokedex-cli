import { initState } from "./state.js";
import { getCommands } from "./commands.js";
import { startREPL } from "./repl.js";

function main() {
  const commands = getCommands();
  const state = initState(commands);
  startREPL(state);
}

main();
