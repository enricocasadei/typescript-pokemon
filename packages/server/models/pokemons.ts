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

const SIZE = 10;

export function query(args: {
  after?: string;
  limit?: number;
  q?: string;
  type?: string[];
}): Connection<Pokemon> {
  const { after, q, limit = SIZE, type } = args;

  const filterByQ: (as: Pokemon[]) => Pokemon[] =
    // filter only if q is defined
    q === undefined
      ? identity
      : A.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  const sliceByAfter: (as: Pokemon[]) => Pokemon[] =
    // filter only if q is defined
    after === undefined
      ? identity
      : (as) =>
          pipe(
            as,
            A.findIndex((a) => a.id === after),
            O.map((a) => a + 1),
            O.fold(() => as, (idx) => as.slice(idx))
          );

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
    filterByType,
    sliceByAfter,
    // slicing limit + 1 because the `toConnection` function should known the connection size to determine if there are more results
    slice(0, limit + 1)
  );
  return toConnection(results, limit);
}
