import { useState } from "react";

import { getTypeIcon, toUpperCaseFirst } from "@/utils";
import { Dialog } from "radix-ui";
import { useNavigate } from "react-router";

import type { Pokemon } from "@/shared/types/pokemon";

import { PokeballIcon } from "./poke-icon";
import { usePokeContext } from "@/hooks/use-poke-context";

type PokecardProps = {
  pokemon: Pokemon;
};

type ModalStep = "choice" | "confirm-team" | "confirm-detail";

const PokeCard = ({ pokemon }: PokecardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<ModalStep>("choice");
  const navigate = useNavigate();

  const { addToTeam } = usePokeContext()

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) setStep("choice");
  };
  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />

          <Dialog.Content
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            bg-card p-6 rounded-xl shadow-xl w-[90%] max-w-md z-50 flex flex-col gap-3"
          >
            {/* Header comune */}
            <div className="flex items-center gap-3 px-5 py-4 bg-secondary/50 border-b border-border">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={48}
                height={48}
                className="drop-shadow"
              />
              <Dialog.Title className="text-lg font-bold text-white">
                {toUpperCaseFirst(pokemon.name)}
              </Dialog.Title>
              <Dialog.Close className="ml-auto text-white/50 hover:text-white transition-colors outline-none cursor-pointer">
                ✕
              </Dialog.Close>
            </div>

            {/* Step: scelta */}
            {step === "choice" && (
              <div className="flex flex-col gap-3 p-5">
                <p className="text-white/60 text-sm">Cosa vuoi fare?</p>

                <button
                  onClick={() => setStep("confirm-team")}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-secondary/30 hover:bg-accent hover:border-accent transition-all text-left group cursor-pointer"
                >
                  <span className="text-2xl">⚔️</span>
                  <div>
                    <p className="text-white font-semibold group-hover:text-blue-950 transition-colors">
                      Aggiungi alla squadra
                    </p>
                    <p className="text-white/50 text-xs group-hover:text-blue-950 transition-colors">
                      Aggiungi{" "}
                      <span className="font-bold">
                        {toUpperCaseFirst(pokemon.name)}
                      </span>{" "}
                      alla tua squadra
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setStep("confirm-detail")}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-secondary/30 hover:bg-accent hover:border-accent transition-all text-left group cursor-pointer"
                >
                  <span className="text-2xl">🔍</span>
                  <div>
                    <p className="text-white font-semibold group-hover:text-blue-950 transition-colors">
                      Visualizza dettagli
                    </p>
                    <p className="text-white/50 text-xs group-hover:text-blue-950 transition-colors">
                      Scopri le statistiche e le abilità
                    </p>
                  </div>
                </button>
              </div>
            )}

            {/* Step: conferma squadra */}
            {step === "confirm-team" && (
              <div className="flex flex-col gap-4 p-5">
                <p className="text-white">
                  Vuoi aggiungere{" "}
                  <span className="font-bold text-accent">
                    {toUpperCaseFirst(pokemon.name)}
                  </span>{" "}
                  alla tua squadra?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("choice")}
                    className="flex-1 py-2 rounded-xl border border-border text-white/60 hover:text-white hover:border-white/30 transition-all cursor-pointer"
                  >
                    Annulla
                  </button>
                  <button
                    onClick={() => {
                      handleOpenChange(false);
                      addToTeam(pokemon);
                      navigate("/team")
                    }}
                    className="flex-1 py-2 rounded-xl bg-accent text-blue-950 font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Conferma
                  </button>
                </div>
              </div>
            )}

            {/* Step: conferma dettaglio */}
            {step === "confirm-detail" && (
              <div className="flex flex-col gap-4 p-5">
                <p className="text-white">
                  Vuoi andare alla pagina di{" "}
                  <span className="font-bold text-accent">
                    {toUpperCaseFirst(pokemon.name)}
                  </span>
                  ?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("choice")}
                    className="flex-1 py-2 rounded-xl border border-border text-white/60 hover:text-white hover:border-white/30 transition-all cursor-pointer"
                  >
                    Annulla
                  </button>
                  <button
                    onClick={() => {
                      handleOpenChange(false);
                      navigate(`/pokemon/${pokemon.id}`);
                    }}
                    className="flex-1 py-2 rounded-xl bg-accent text-blue-950 font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Vai ai dettagli
                  </button>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div
        className="group/card bg-secondary/50 overflow-hidden rounded-tl-2xl rounded-br-2xl border-2 border-border cursor-pointer flex flex-col"
        onClick={() => setIsOpen(true)}
      >
        <div className="card_header flex gap-4 bg-card/50 px-4 py-2 group-hover/card:bg-accent transition-colors">
          <PokeballIcon width={18} />
          <span className="text-white font-semibold group-hover/card:text-blue-950">
            {toUpperCaseFirst(pokemon.name)}
          </span>
        </div>

        <div className="card-content flex-1 flex items-center justify-center py-6">
          <div className="relative w-24 h-24">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            )}
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={96}
              height={96}
              onLoad={() => setImageLoaded(true)}
              className={`transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        </div>

        <div className="card-footer flex gap-4 mt-3 py-2 justify-center bg-card/30">
          {pokemon.types.map((type) => (
            <div className="flex gap-2 items-center">
              {getTypeIcon(type.type.name)}{" "}
              <span className="bg-dark/80 text-white px-2 text-sm rounded-r-md">
                {toUpperCaseFirst(type.type.name)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PokeCard;
