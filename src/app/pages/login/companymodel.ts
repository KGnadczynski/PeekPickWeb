 export class ParentCategory {
        id: number;
        name: string;
        parentCategory: any;
    }

    export class Category {
        id: number;
        name: string;
        parentCategory: ParentCategory;
        constructor(){
            this.parentCategory = new ParentCategory();
        }
    }

    export class Company {
        id: number;
        name: string;
        category: Category;
        createDate: Date;
        mainImageUrl: any;
         constructor(){
            this.category = new Category();
        }
    }

    export class CompanyModel {
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
        company: Company;
        createDate: string;
        distance: number;
        main: boolean;
        constructor(){
            this.company = new Company();
        }
    }