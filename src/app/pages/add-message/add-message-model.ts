
  export class Category {
        id: number;
        name: string;
    }

    export class Company {
        category: Category;
        createDate: Date;
        id: number;
        mainImageUrl: string;
        name: string;
        constructor(){
          this.category = new Category();
        }
    }

    export class CompanyBranchList {
        city: string;
        company: Company;
        createDate: Date;
        description: string;
        distance: number;
        email: string;
        id: number;
        latitude: number;
        longitude: number;
        main: boolean;
        name: string;
        openingHours: string;
        phoneNumber: string;
        street: string;
        streetNo: string;
        website: string;
        constructor(){
          this.company = new Company();
        }
    }

    export class Location {
        address: string;
        city: string;
        id: number;
        latitude: number;
        longitude: number;
        name: string;
        street: string;
        streetNo: string;
    }

    export class Category2 {
        id: number;
        name: string;
    }

    export class Company2 {
        category: Category2;
        createDate: Date;
        id: number;
        mainImageUrl: string;
        name: string;
        constructor() {
        }
    }

    export class NearestCompanyBranch {
        city: string;
        company: Company2;
        createDate: Date;
        description: string;
        distance: number;
        email: string;
        id: number;
        latitude: number;
        longitude: number;
        main: boolean;
        name: string;
        openingHours: string;
        phoneNumber: string;
        street: string;
        streetNo: string;
        website: string;
    }

    export class Category3 {
        id: number;
        name: string;
    }

    export class Company3 {
        category: Category3;
        createDate: Date;
        id: number;
        mainImageUrl: string;
        name: string;
        constructor() {
          this.category = new Category3();
        }
    }

    export class User {
        company: Company3;
        email: string;
        id: number;
        name: string;
        password: string;
        phoneNumber: string;
        status: string;
         constructor() {
           this.company = new Company3();
         }
    }

    export class MessageAddModel {
        companyBranchCount: number;
        companyBranchList: CompanyBranchList[];
        content: string;
        createDate: string;
        distance: number;
        endDate: string;
        id: number;
        location: Location;
        mainImageUrl: string;
        nearestCompanyBranch: NearestCompanyBranch;
        startDate: string;
        status: string;
        type: string;
        user: User;

        constructor() {
          this.user = new User();
          this.location = new Location();
        }
    }