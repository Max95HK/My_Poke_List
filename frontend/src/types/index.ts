import type { JSX, SVGProps } from "react";

export type PokemonIconComponent = (
  props: SVGProps<SVGSVGElement>,
) => JSX.Element;
