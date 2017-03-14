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
  latitude: number;
  longitude: number;
}

export interface User {
  id: number;
  name: string;
  status: any;
  company: Company;
  email: string;
}

export interface Company2 {
  id: number;
  name: string;
  category: any;
  createDate: Date;
  mainImageUrl: any;
}

export interface NearestCompanyBranch {
  id: number;
  name: string;
  city: string;
  street: string;
  streetNo: string;
  latitude: number;
  longitude: number;
  description: string;
  website: string;
  phoneNumber: string;
  email: string;
  openingHours: string;
  company: Company2;
  createDate: Date;
  distance: number;
  main: boolean;
}

export interface ObjectList {
  id: number;
  content: string;
  type: string;
  startDate: Date;
  endDate: Date;
  createDate: Date;
  status: string;
  companyBranchList: any;
  user: User;
  location: any;
  distance: number;
  mainImageUrl: string;
  companyBranchCount: number;
  nearestCompanyBranch?: NearestCompanyBranch;
}