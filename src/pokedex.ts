import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: { slot: number; type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
};

const cache = new Map<string, Pokemon>();

const rl = createInterface({ input, output, terminal: true });

const prompt = async (message: string) => rl.question(`${message} `);

const formatPokemon = (pokemon: Pokemon) => {
  const title = `#${pokemon.id.toString().padStart(3, '0')} ${pokemon.name}`;
  const types = pokemon.types.map((t) => t.type.name).join(', ');
  const stats = pokemon.stats
    .map((stat) => `${stat.stat.name}: ${stat.base_stat}`)
    .join(' | ');

  return `\n${title}\n---------------\nTypes: ${types}\nHeight: ${pokemon.height * 0.1} m\nWeight: ${pokemon.weight * 0.1} kg\nBase XP: ${pokemon.base_experience}\nStats: ${stats}\n`;
};

const fetchPokemon = async (query: string) => {
  const key = query.toLowerCase();
  if (cache.has(key)) {
    return cache.get(key)!;
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(key)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Received ${response.status} from ${url}`);
  }

  const data = (await response.json()) as Pokemon;
  cache.set(key, data);
  return data;
};

const run = async () => {
  console.log('Welcome to the command-line Pokedex!');
  console.log('Type a Pokemon name or number, or `exit` to quit.');

  while (true) {
    const inputValue = await prompt('Search');
    const trimmed = inputValue.trim();

    if (!trimmed || trimmed.toLowerCase() === 'exit' || trimmed === 'quit') {
      break;
    }

    try {
      const pokemon = await fetchPokemon(trimmed);
      console.log(formatPokemon(pokemon));
    } catch (error) {
      console.error('Failed to load that Pokemon:', error instanceof Error ? error.message : error);
    }
  }

  rl.close();
  console.log('Bye!');
};

run().catch((error) => {
  console.error('Unexpected error:', error instanceof Error ? error.message : error);
  process.exit(1);
});
