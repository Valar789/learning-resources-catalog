 
export interface Content {
  type: string;
  children: Child[];
}
export interface Child {
  text: string;
  type: string;
}
export interface CoverImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}
export interface Formats {
  small: Medium;
  medium: Medium;
  thumbnail: Medium;
}
export interface Medium {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}
export interface Meta {
  pagination: Pagination;
}
export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
export interface Resource {
  id: number;
  documentId: string;
  title: string;
  description: string;
  content: Content[];
  type: string;
  externalUrl: string;
  publishDate: Date;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  coverImage: CoverImage;
}
export interface ResourcesResponse {
  data: Resource[]  
  meta: Meta;
}

 
 