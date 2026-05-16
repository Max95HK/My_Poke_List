import type { PokemonIconComponent } from "@/types";

import {
  BugIcon,
  DarkIcon,
  DragonIcon,
  ElectricIcon,
  FairyIcon,
  FightingIcon,
  FireIcon,
  FlyingIcon,
  GhostIcon,
  GrassIcon,
  IceIcon,
  NormalIcon,
  PoisonIcon,
  PsychicIcon,
  RockIcon,
  SteelIcon,
  WaterIcon,
} from "@/components/types";
import { GroundIcon } from "@/components/types/ground-icon";

export const toUpperCaseFirst = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const TYPE_ICONS: Record<string, PokemonIconComponent> = {
  normal: NormalIcon,
  fire: FireIcon,
  water: WaterIcon,
  grass: GrassIcon,
  electric: ElectricIcon,
  ice: IceIcon,
  fighting: FightingIcon,
  poison: PoisonIcon,
  flying: FlyingIcon,
  psychic: PsychicIcon,
  bug: BugIcon,
  rock: RockIcon,
  ghost: GhostIcon,
  dragon: DragonIcon,
  dark: DarkIcon,
  steel: SteelIcon,
  ground: GroundIcon,
  fairy: FairyIcon,
};

export const getTypeIcon = (type: string) => {
  const Comp = TYPE_ICONS[type];
  return <Comp className="size-6"/>;
};
