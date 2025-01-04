export interface GoogleBooksResponse {
  kind: string;
  totalItems: number;
  items?: GoogleBook[];
}

export interface GoogleBook {
  id: string;
  volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  categories?: string[];
  imageLinks?: ImageLinks;
  language?: string;
}

export interface ImageLinks {
  thumbnail?: string;
  smallThumbnail?: string;
}
