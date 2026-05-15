import type { PokemonParams } from "@/shared/types/pokemon";
import useRootLoaderData from "@/hooks/use-root-loader-data";

const SORT_OPTIONS: { label: string; value: PokemonParams["sortBy"] }[] = [
  { label: "ID", value: "id" },
  { label: "Nome", value: "name" },
  { label: "HP", value: "hp" },
  { label: "Attacco", value: "attack" },
  { label: "Difesa", value: "defense" },
  { label: "Velocità", value: "speed" },
  { label: "Att. Speciale", value: "special-attack" },
  { label: "Dif. Speciale", value: "special-defense" },
];

type PokeFilterProps = {
  params: PokemonParams;
  searchInput: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string | undefined) => void;
  onGenerationChange: (value: number | undefined) => void;
  onSortByChange: (value: PokemonParams["sortBy"]) => void;
  onOrderChange: (value: PokemonParams["order"]) => void;
  onReset: () => void;
};

const PokeFilter = ({
  params,
  searchInput,
  onGenerationChange,
  onOrderChange,
  onReset,
  onSearchChange,
  onSortByChange,
  onTypeChange,
}: PokeFilterProps) => {
  const { types, generations } = useRootLoaderData();

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="search">Cerca</label>
        <input
          id="search"
          type="text"
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cerca pokémon..."
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="type">Tipo</label>
        <select
          id="type"
          value={params.type ?? ""}
          onChange={(e) => onTypeChange(e.target.value || undefined)}
        >
          <option value="">Tutti i tipi</option>
          {types.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="generation">Generazione</label>
        <select
          id="generation"
          value={params.generation ?? ""}
          onChange={(e) => onGenerationChange(e.target.value ? Number(e.target.value) : undefined)}
        >
          <option value="">Tutte le generazioni</option>
          {generations.map((gen) => (
            <option key={gen.id} value={gen.id}>{gen.region}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="sortBy">Ordina per</label>
        <select
          id="sortBy"
          value={params.sortBy}
          onChange={(e) => onSortByChange(e.target.value as PokemonParams["sortBy"])}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="order">Direzione</label>
        <select
          id="order"
          value={params.order}
          onChange={(e) => onOrderChange(e.target.value as PokemonParams["order"])}
        >
          <option value="asc">Crescente</option>
          <option value="desc">Decrescente</option>
        </select>
      </div>

      <button onClick={onReset}>Reset</button>
    </div>
  );
};

export default PokeFilter;