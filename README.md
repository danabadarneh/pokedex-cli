# Command-line Pokedex

This TypeScript CLI fetches Pokémon data from the [PokéAPI](https://pokeapi.co/) and caches results locally so you can rapidly query different Pokémon without hammering the API.

Built to match the Boot.dev lesson, it uses Node 22.15.0 via [`nvm`](https://github.com/nvm-sh/nvm) (see `.nvmrc`) and compiles TypeScript through `tsc` before running the REPL.

## Features

- REPL-style prompt where you can enter a Pokémon's name or Pokédex number and instantly see stats
- Caches API responses in memory during the session to avoid duplicate HTTP calls
- Displays the Pokémon's type(s), height, weight, base experience, and stat breakdown (HP, attack, defense, etc.)
- Logs each encounter in `repl.log` for debugging or review

## Setup & Running

1. Install Node 22.15.0 via `nvm` and activate it:

   ```bash
   nvm use
   ```

2. Install dependencies once:

   ```bash
   npm install
   ```

3. Run the CLI (compiles TypeScript first):

   ```bash
   npm start
   ```

4. Inside the REPL prompt, type a Pokémon name (e.g., `pikachu`) or number (e.g., `25`).

5. Exit the session with `exit` or `Ctrl+C`.

## Additional commands

- `npm run build`   Compile only
- `npm test`        Run the Vitest suite (checks normalizeURL, HTML parsing, etc.)

## Notes

- The CLI writes a log entry to `repl.log` for each query so you can trace usage later.
- If you plan to iterate on the project, keep running `npm run build` before `npm start` or rely on the script as shown above.
