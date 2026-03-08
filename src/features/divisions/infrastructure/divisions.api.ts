import { http } from "../../../shared/api/httpClient";
import type {
  DivisionDto,
  DivisionFilterOptions,
  DivisionListParams,
  PaginatedResponse,
} from "../domain/division.model";

export async function getDivisions(params: DivisionListParams): Promise<PaginatedResponse<DivisionDto>> {
  const { data } = await http.get<PaginatedResponse<DivisionDto>>("/divisions", { params });
  return data;
}

// Recomendado para filtros tipo Imagen 4:
export async function getDivisionFilterOptions(): Promise<DivisionFilterOptions> {
  const { data } = await http.get<DivisionFilterOptions>("/divisions/filter-options");
  return data;
}

// Commands (si luego haces CRUD UI)
export async function createDivision(payload: { name: string; parent_id?: number | null; ambassadors?: string | null }) {
  const { data } = await http.post<DivisionDto>("/divisions", payload);
  return data;
}

export async function updateDivision(
  id: number,
  payload: { name?: string; parent_id?: number | null; ambassadors?: string | null }
) {
  const { data } = await http.put<DivisionDto>(`/divisions/${id}`, payload);
  return data;
}

export async function deleteDivision(id: number): Promise<void> {
  await http.delete(`/divisions/${id}`);
}