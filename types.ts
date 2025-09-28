export interface Project {
  id: number;
  name: string;
  designer: string;
  fabric?: string;
  flossBrand: string;
  purchaseDate: string;
  finishDate: string | null;
  inProgress: boolean;
  imageUrls: string[];
}