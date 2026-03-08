import { useEffect, useState } from "react";
import type { DivisionFilterOptions } from "../../domain/division.model";
import { getDivisionFilterOptions } from "../../infrastructure/divisions.api";

export function useDivisionFilterOptionsQuery(): DivisionFilterOptions {
  const [options, setOptions] = useState<DivisionFilterOptions>({ name: [], parent_name: [] });

  useEffect(() => {
    let alive = true;

    getDivisionFilterOptions()
      .then((res) => {
        if (!alive) return;
        setOptions({ name: res.name ?? [], parent_name: res.parent_name ?? [] });
      })
      .catch(() => {
        // si el endpoint aún no existe, no rompas la UI
        setOptions({ name: [], parent_name: [] });
      });

    return () => {
      alive = false;
    };
  }, []);

  return options;
}