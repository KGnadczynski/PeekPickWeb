export interface ParentCategory {
  id: number;
  name: string;
  parentCategory: any;
}

export interface Category {
  id: number;
  name: string;
  parentCategory: ParentCategory;
}

export interface Company {
  id: number;
  name: string;
  category: Category;
  createDate: Date;
  mainImageUrl: any;
}