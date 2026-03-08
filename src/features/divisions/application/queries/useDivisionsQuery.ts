import { useEffect, useState } from "react";
import { mapDivisionDto } from "../../domain/division.mapper";
import type { Division, DivisionDto, DivisionListParams, PaginatedResponse } from "../../domain/division.model";
import { getDivisions } from "../../infrastructure/divisions.api";

type State = {
  rows: Division[];
  meta: PaginatedResponse<DivisionDto>["meta"];
  loading: boolean;
  error: unknown | null;
};

export function useDivisionsQuery(params: DivisionListParams): State {
  const [state, setState] = useState<State>({
    rows: [],
    meta: { total: 0, current_page: 1, per_page: 10 },
    loading: true,
    error: null,
  });

  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, loading: true, error: null }));

    getDivisions(params)
      .then((res) => {
        if (!alive) return;
        setState({
          rows: (res.data ?? []).map(mapDivisionDto),
          meta: res.meta,
          loading: false,
          error: null,
        });
      })
      .catch((err) => {
        if (!alive) return;
        setState((s) => ({ ...s, rows: [], loading: false, error: err }));
      });

    return () => {
      alive = false;
    };
  }, [JSON.stringify(params)]);

  return state;
}