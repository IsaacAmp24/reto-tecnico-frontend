export const DIVISIONS_TABLE_WIDTHS = {
  selection: 30,
  name: 215,
  parentName: 249,
  collaborators: 199,
  level: 104,
  childrenCount: 215,
  ambassadors: 198,
} as const;

export const DIVISIONS_TABLE_TOTAL_WIDTH =
  DIVISIONS_TABLE_WIDTHS.selection +
  DIVISIONS_TABLE_WIDTHS.name +
  DIVISIONS_TABLE_WIDTHS.parentName +
  DIVISIONS_TABLE_WIDTHS.collaborators +
  DIVISIONS_TABLE_WIDTHS.level +
  DIVISIONS_TABLE_WIDTHS.childrenCount +
  DIVISIONS_TABLE_WIDTHS.ambassadors;