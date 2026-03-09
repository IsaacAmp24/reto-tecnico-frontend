export type DivisionDto = {
  id: number;
  name: string;
  parent_id: number | null;
  parent_name?: string | null;         // si tu backend lo agrega en el index
  parent?: { name: string } | null;    // alternativa
  collaborators: number;
  level: number;
  children_count?: number;             // withCount('children')
  ambassadors?: string | null;
};

export type Division = {
  id: number;
  name: string;
  parentId: number | null;
  parentName: string | null;
  collaborators: number;
  level: number;
  childrenCount: number;
  ambassadors: string | null;
};

export type DivisionListParams = {
  page: number;
  per_page: number;
  search_field?: "name" | "parent_name" | "ambassadors";
  search_text?: string;
  sort_field?: "id" | "name" | "parent_name" | "collaborators" | "level" | "children_count";
  sort_order?: "asc" | "desc";
  filters?: Record<string, (string | number)[]>;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    total: number;
    current_page: number;
    per_page: number;
  };
};

export type DivisionFilterOptions = {
  name: string[];
  parent_name: string[];
};

export type DivisionUpsertPayload = {
  name: string;
  parent_id: number | null;
  ambassadors: string | null;
};

export type DivisionOption = {
  label: string;
  value: number;
};