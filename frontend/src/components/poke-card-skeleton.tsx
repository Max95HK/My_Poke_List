export function PokeCardSkeleton() {
  return (
    <div className="card bg-secondary/50 overflow-hidden rounded-tl-2xl rounded-br-2xl border-2 border-border flex flex-col animate-pulse">
      {/* HEADER */}
      <div className="card_header flex gap-4 bg-card/50 px-4 py-2 items-center">
        <div className="w-5 h-5 bg-white/20 rounded-full" />
        <div className="h-4 w-24 bg-white/20 rounded" />
      </div>

      {/* SPRITE */}
      <div className="card-content flex-1 flex items-center justify-center py-6">
        <div className="w-24 h-24 bg-white/20 rounded-full" />
      </div>

      {/* TYPES */}
      <div className="card-footer flex gap-4 mt-3 py-2 justify-center bg-card/30">
        <div className="flex gap-2 items-center">
          <div className="w-5 h-5 bg-white/20 rounded-full" />
          <div className="h-4 w-14 bg-white/20 rounded" />
        </div>

        <div className="flex gap-2 items-center">
          <div className="w-5 h-5 bg-white/20 rounded-full" />
          <div className="h-4 w-14 bg-white/20 rounded" />
        </div>
      </div>
    </div>
  );
}
