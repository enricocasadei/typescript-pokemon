import { pipe } from "fp-ts/lib/pipeable";
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";
import { identity } from "fp-ts/lib/function";
import { data } from "../data/pokemons";
import { toConnection, slice } from "../functions";
import { Connection } from "../types";

interface Pokemon {
  id: string;
  name: string;
  classification: string;
  types: string[];
}

export function query(args: {
  q?: string;
  type?: string[];
}): Connection<Pokemon> {
  const { q, type } = args;

  const filterByQ: (as: Pokemon[]) => Pokemon[] =
    // filter only if q is defined
    q === undefined
      ? identity
      : A.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  const filterByType: (as: Pokemon[]) => Pokemon[] =
    type === undefined || type.length === 0
      ? identity
      : A.filter((p) =>
          type
            .map((x) => x.toLowerCase())
            .every((y) => p.types.map((x) => x.toLowerCase()).includes(y))
        );

  const results: Pokemon[] = pipe(
    data,
    filterByQ,
    filterByType
  );
  return toConnection(results);
}
