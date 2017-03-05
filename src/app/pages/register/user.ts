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
  name: string;
}

export class CompanyBranch {
  constructor() {
    this.company = new Company();
  }
  city: string;
  company: Company;
  main: boolean;
  latitude: number;
  longitude: number;
  name: string;
  street: string;
  streetNo: string;
}


export class User {
    email: string;
    name: string;
    password: string;
    phoneNumber: string;
}

export class Token {
    value: string;
}

export class RegisterObject {

  constructor() {
    this.companyBranch = new CompanyBranch();
    this.user = new User();
    this.token = new Token();
  }
  companyBranch: CompanyBranch;
  user: User;
  token: Token;
}

export class DiggitsObject {
    url: string;
    credentials: string;
}


