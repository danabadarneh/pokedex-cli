# Command-line Pokedex

This TypeScript CLI fetches Pokémon data from the [PokéAPI](https://pokeapi.co/) and caches results locally. Run `npm start` after installing dependencies and/or `nvm use` with Node 22.15.0 (see `.nvmrc`).

## Features

- REPL-style prompt for entering Pokémon names or Pokédex numbers
- Caches API responses in memory to avoid redundant HTTP calls
- Displays type, height, weight, base experience, and stats

## Running

```bash
nvm use
npm install
npm start
```

You can exit the REPL by typing `exit` or hitting Ctrl+C.
