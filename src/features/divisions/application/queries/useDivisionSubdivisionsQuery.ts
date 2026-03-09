import { useEffect, useState } from "react";
import { mapDivisionDto } from "../../domain/division.mapper";
import type { Division } from "../../domain/division.model";
import { getDivisionSubdivisions } from "../../infrastructure/divisions.api";

type State = {
  rows: Division[];
  loading: boolean;
  error: unknown | null;
};

export function useDivisionSubdivisionsQuery(divisionId: number | null, open: boolean): State {
  const [state, setState] = useState<State>({
    rows: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!divisionId || !open) {
      setState({
        rows: [],
        loading: false,
        error: null,
      });
      return;
    }

    let alive = true;

    setState({
      rows: [],
      loading: true,
      error: null,
    });

    getDivisionSubdivisions(divisionId)
      .then((res) => {
        if (!alive) return;

        setState({
          rows: res.map(mapDivisionDto),
          loading: false,
          error: null,
        });
      })
      .catch((err) => {
        if (!alive) return;

        setState({
          rows: [],
          loading: false,
          error: err,
        });
      });

    return () => {
      alive = false;
    };
  }, [divisionId, open]);

  return state;
}