export interface User {
  id: number;
  name: string;
  status: any;
  company: Company;
  email: string;
}

export interface Company {
  id: number;
  name: string;
  category: Category;
  createDate: Date;
  mainImageUrl: any;
}

export interface Category {
  id: number;
  name: string;
  parentCategory: ParentCategory;
}

export interface ParentCategory {
  id: number;
  name: string;
  parentCategory: any;
}