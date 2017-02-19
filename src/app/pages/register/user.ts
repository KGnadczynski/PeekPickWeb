export class ParentCategory {
    id: number;
    name: string;
}

export class Category {

  constructor() {
    this.parentCategory = new ParentCategory();
  }
    id: number;
    name: string;
    parentCategory: ParentCategory;
}

export class Company {

  constructor() {
    this.category = new Category();
  }
    category: Category;
    city: string;
    name: string;
    street: string;
    streetNo: string;
    latitude: string;
    longitude: string;
}

export class User {

  constructor() {
    this.company = new Company();
  }
    company: Company;
    email: string;
    name: string;
    password: string;
}

