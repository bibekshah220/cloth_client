export interface CategoryImage {
  path: string;
  public_id: string;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: CategoryImage;
  createdAt: string;
  updatedAt: string;
}
