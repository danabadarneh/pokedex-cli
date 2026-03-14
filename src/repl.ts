import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

export function startREPL(state: State) {
  const { rl, commands } = state;

  rl.prompt();

  rl.on("line", async (line) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandKey = words[0];
    const command = commands[commandKey];

    if (command) {
      try {
        await command.callback(state, ...words.slice(1));
      } catch (error) {
        console.error("Command failed:", error instanceof Error ? error.message : error);
      }
    } else {
      console.log("Unknown command");
    }

    rl.prompt();
  });
}
