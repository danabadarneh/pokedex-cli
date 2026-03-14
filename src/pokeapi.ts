import { Cache } from "./pokecache.js";

export type ShallowLocation = {
  name: string;
  url: string;
};

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ShallowLocation[];
};

export type Location = {
  id: number;
  name: string;
  region: { name: string; url: string };
  locations: { name: string; url: string }[];
  pokemon_encounters: { pokemon: { name: string; url: string } }[];
};

export type PokemonDetails = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }>;
  types: Array<{
    slot: number;
    type: { name: string; url: string };
  }>;
};

export class PokeApi {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor(cacheIntervalMs = 60_000) {
    this.#cache = new Cache(cacheIntervalMs);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeApi.baseURL}/location-area`;
    const cached = this.#cache.get<ShallowLocations>(url);
    if (cached) {
      console.log("Using cached locations", url);
      return cached;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1000);
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        throw new Error(`Failed to fetch locations: ${response.status}`);
      }
      const payload = (await response.json()) as ShallowLocations;
      this.#cache.add(url, payload);
      return payload;
    } finally {
      clearTimeout(timeout);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeApi.baseURL}/location-area/${encodeURIComponent(locationName)}`;
    const cached = this.#cache.get<Location>(url);
    if (cached) {
      console.log("Using cached location", locationName);
      return cached;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch location ${locationName}: ${response.status}`);
    }
    const payload = (await response.json()) as Location;
    this.#cache.add(url, payload);
    return payload;
  }

  async fetchPokemon(pokemonName: string): Promise<PokemonDetails> {
    const normalized = pokemonName.toLowerCase();
    const url = `${PokeApi.baseURL}/pokemon/${encodeURIComponent(normalized)}`;
    const cached = this.#cache.get<PokemonDetails>(url);
    if (cached) {
      console.log("Using cached pokemon", normalized);
      return cached;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon ${normalized}: ${response.status}`);
    }
    const payload = (await response.json()) as PokemonDetails;
    this.#cache.add(url, payload);
    return payload;
  }

  stopCache() {
    this.#cache.stopReapLoop();
  }
}
