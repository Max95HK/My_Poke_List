/**
 * Node modules
 */
import { useState } from 'react';

/**
 * Hooks
 */
import usePokemonList from '@/hooks/use-pokemon-list';

const Home = () => {
  const [page, setPage] = useState(1);

  const { pokemonList, totalPages, isLoading } = usePokemonList(page);
  return (
    <div>
      <h1 className='text-4xl font-semibold text-center mt-8 text-blue-950 shadow-[0_0_25px_-5px_rgba(30,58,138,0.6)] backdrop-blur-xs py-4 rounded-md max-w-3xl mx-auto'>
        Scegli i tuoi Pokémon
      </h1>

      <div>
        {pokemonList.map((pokemon) => (
          <div>{pokemon.name}</div>
        ))}
      </div>

      <button
        onClick={() => setPage((prevPage) => prevPage - 1)}
        disabled={page === 1 || isLoading}
      >
        precedente
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button
        onClick={() => setPage((prevPage) => prevPage + 1)}
        disabled={page === totalPages || isLoading}
      >
        successiva
      </button>
    </div>
  );
};

export default Home;
