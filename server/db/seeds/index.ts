import { generationsTable } from "@/db/schemas/generation-schema";
import { pokemonTable } from "@/db/schemas/poke-schema";
import { db } from "@/server/db";
import type {
  GenerationRaw,
  PokemonListResponse,
  PokemonRaw,
} from "@/server/types";

const TOTAL_POKEMON = 1025;
const TOTAL_GENERATION = 9;
const BASE_URL = "https://pokeapi.co/api/v2";
const BATCH_SIZE = 50;

const fetchInBatches = async (urls: string[]): Promise<PokemonRaw[]> => {
  const results: PokemonRaw[] = [];

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    console.log(
      `Fetching batch ${i / BATCH_SIZE + 1} of ${Math.ceil(urls.length / BATCH_SIZE)}...`,
    );
    const batch = urls.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return response.json() as Promise<PokemonRaw>;
      }),
    );
    results.push(...batchResults);
  }

  return results;
};

const getGenerationId = (pokemonId: number): number => {
  if (pokemonId <= 151) return 1;
  if (pokemonId <= 251) return 2;
  if (pokemonId <= 386) return 3;
  if (pokemonId <= 493) return 4;
  if (pokemonId <= 649) return 5;
  if (pokemonId <= 721) return 6;
  if (pokemonId <= 809) return 7;
  if (pokemonId <= 905) return 8;
  return 9;
};

const seedGenerations = async (): Promise<void> => {
  console.log("Seeding generationsTable...");

  const generationRaws: GenerationRaw[] = await Promise.all(
    Array.from({ length: TOTAL_GENERATION }, async (_, i) => {
      const response = await fetch(`${BASE_URL}/generation/${i + 1}`);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      return response.json() as Promise<GenerationRaw>;
    }),
  );

  await db.insert(generationsTable).values(
    generationRaws.map((generation) => ({
      id: generation.id,
      name: generation.name,
      region: generation.main_region.name,
    })),
  );

  console.log(`Seeded ${generationRaws.length} generationsTable.`);
};

const seedPokemon = async (): Promise<void> => {
  console.log("Seeding pokemonTable...");

  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${TOTAL_POKEMON}&offset=0`,
  );
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

  const data = (await response.json()) as PokemonListResponse;
  const pokemonRaw = await fetchInBatches(data.results.map(({ url }) => url));

  await db.insert(pokemonTable).values(
    pokemonRaw.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      base_experience: pokemon.base_experience,
      generation_id: getGenerationId(pokemon.id),
      types: pokemon.types,
      stats: pokemon.stats,
      sprites: pokemon.sprites,
      abilities: pokemon.abilities,
      cry: pokemon.cries.latest,
    })),
  );

  console.log(`Seeded ${pokemonRaw.length} pokemonTable.`);
};

export const seed = async (): Promise<void> => {
  const generationCount = await db.$count(generationsTable);
  if (generationCount > 0) {
    console.log("Database already seeded, skipping...");
    return;
  }

  await seedGenerations();
  await seedPokemon();

  console.log("Seeding complete.");
};

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });