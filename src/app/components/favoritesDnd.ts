export const FAVORITE_SERVICE_CARD = 'FAVORITE_SERVICE_CARD';

export interface FavoriteDragItem {
  id: string;
  index: number;
  title: string;
  icon: string;
  lockX: number;
  width: number;
  height: number;
  grabOffsetY: number;
  minY: number;
  maxY: number;
}
