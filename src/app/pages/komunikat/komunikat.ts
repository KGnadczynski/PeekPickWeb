 export class Category {
        id: number;
        name: string;
        parentCategory?: any;
    }

    export class Company {
        id?: any;
        name: string;
        city?: any;
        street?: any;
        streetNo?: any;
        latitude?: any;
        longitude?: any;
        category: Category;
    }

    export class CompanyBranch {
        id: number;
        name: string;
        city: string;
        street: string;
        streetNo: string;
        latitude: number;
        longitude: number;
        company: Company;
    }

    export class ObjectList {
        id: number;
        content: string;
        type: string;
        startDate: Date;
        endDate: Date;
        createDate: Date;
        status: string;
        companyBranch: CompanyBranch;
        distance: number;
        mainImageUrl:string;
    }



