import usePokemonFilter from "@/hooks/use-pokemon-filter";
import usePokemonList from "@/hooks/use-pokemon-list";
import PokeFilter from "@/components/poke-filter";

const Home = () => {
  const {
    params,
    searchInput,
    currentPage,
    resetParams,
    setGeneration,
    setOrder,
    setPage,
    setSearch,
    setSortBy,
    setType,
  } = usePokemonFilter();

  const { pokemon, error, isLoading, isPlaceholderData, totalPages } =
    usePokemonList(params);

  if (error) return <div>Errore: {error.message}</div>;

  return (
    <div>
      <PokeFilter
        params={params}
        searchInput={searchInput}
        onSearchChange={setSearch}
        onGenerationChange={setGeneration}
        onTypeChange={setType}
        onOrderChange={setOrder}
        onSortByChange={setSortBy}
        onReset={resetParams}
      />

      <div
        className={`${isPlaceholderData ? "opacity-50 pointer-events-none" : ""}`}
      >
        {isLoading ? (
          <div>Caricamento...</div>
        ) : (
          pokemon.map((poke) => <div key={poke.id}>{poke.name}</div>)
        )}
      </div>

      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
      >
        precedente
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
      >
        successiva
      </button>
    </div>
  );
};

export default Home;