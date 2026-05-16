import usePokemonFilter from "@/hooks/use-pokemon-filter";
import usePokemonList from "@/hooks/use-pokemon-list";
import PokeCard from "@/components/poke-card";
import PokeFilter from "@/components/poke-filter";
import { PokeCardSkeleton } from "@/components/poke-card-skeleton";

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

  const { pokemon, error, isLoading, isPlaceholderData, isFetching, totalPages } =
    usePokemonList(params);

  if (error) return <div>Errore: {error.message}</div>;

  const showSkeletons = isLoading;
  const showContent = !isLoading;

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
        className="my-8 grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] transition-opacity duration-300"
        style={{ opacity: isFetching && !isLoading ? 0.5 : 1 }}
      >
        {showSkeletons
          ? Array.from({ length: params.limit }, (_, i) => (
              <PokeCardSkeleton key={i} />
            ))
          : pokemon.map((poke) => (
              <PokeCard key={poke.id} pokemon={poke} />
            ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1 || isFetching}
        >
          precedente
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPages || isFetching}
        >
          successiva
        </button>
      </div>
    </div>
  );
};

export default Home;