export interface Produce {
  id: string;
  name: string;
  name_fr: string | null;
  category: 'fruit' | 'vegetable' | 'herb' | 'flower';
  featured: boolean;
  description: string | null;
  season_start: number;
  season_end: number;
  planting_start: number | null;
  planting_end: number | null;
  harvest_start: number | null;
  harvest_end: number | null;
  hemisphere: 'northern' | 'southern';
  zone_offset: number;
  colors: string[] | null;
  companions: string[] | null;
  avoid: string[] | null;
  illustration: string | null;
}

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const SHORT_MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const SEASONS: Record<string, number[]> = {
  winter: [12, 1, 2],
  spring: [3, 4, 5],
  summer: [6, 7, 8],
  autumn: [9, 10, 11]
};

export function getSeasonForMonth(month: number): string {
  for (const [season, months] of Object.entries(SEASONS)) {
    if (months.includes(month)) return season;
  }
  return 'winter';
}

export const SEASON_LABELS: Record<string, string> = {
  winter: 'Winter',
  spring: 'Spring',
  summer: 'Summer',
  autumn: 'Autumn'
};
