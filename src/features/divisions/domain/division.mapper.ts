import type { Division, DivisionDto } from "./division.model";

export function mapDivisionDto(dto: DivisionDto): Division {
  return {
    id: dto.id,
    name: dto.name,
    parentId: dto.parent_id ?? null,
    parentName: dto.parent_name ?? dto.parent?.name ?? null,
    collaborators: dto.collaborators,
    level: dto.level,
    childrenCount: dto.children_count ?? 0,
    ambassadors: dto.ambassadors ?? null,
  };
}