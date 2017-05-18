export class PowiadomieniaList {
  objectList: Array<ObjectList>;
  isLastPage: boolean;
}

export interface ParentCategory {
        id: number;
        name: string;
        parentCategory?: any;
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
    currency: string;
    mainImageUrl?: any;
}

export interface UserRole {
    id: number;
    name: string;
    authority: string;
}

export interface User {
    id: number;
    name: string;
    status: string;
    company: Company;
    phoneNumber: string;
    userRoles: UserRole[];
    createDate: Date;
    email: string;
}

export interface ObjectList {
    id: number;
    title: string;
    content: string;
    type: string;
    createDate: Date;
    status: string;
    user: User;
}
