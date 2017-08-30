
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

    /*{
        "companyBranchCount": 0,
        "companyBranchList": [
          {
            "city": "string",
            "company": {
              "category": {
                "id": 0,
                "name": "string"
              },
              "createDate": "2017-08-30T08:40:32.610Z",
              "currency": "PLN",
              "id": 0,
              "mainImageUrl": "string",
              "name": "string"
            },
            "createDate": "2017-08-30T08:40:32.611Z",
            "description": "string",
            "distance": 0,
            "email": "string",
            "id": 0,
            "latitude": 0,
            "longitude": 0,
            "main": true,
            "name": "string",
            "openingHours": "string",
            "phoneNumber": "string",
            "status": "NEW",
            "street": "string",
            "streetNo": "string",
            "website": "string"
          }
        ],
        "content": "string",
        "createDate": "2017-08-30T08:40:32.611Z",
        "distance": 0,
        "endDate": "2017-08-30T08:40:32.611Z",
        "expirationDate": "2017-08-30T08:40:32.611Z",
        "id": 0,
        "location": {
          "address": "string",
          "city": "string",
          "id": 0,
          "latitude": 0,
          "longitude": 0,
          "name": "string",
          "street": "string",
          "streetNo": "string"
        },
        "mainImageUrl": "string",
        "nearestCompanyBranch": {
          "city": "string",
          "company": {
            "category": {
              "id": 0,
              "name": "string"
            },
            "createDate": "2017-08-30T08:40:32.612Z",
            "currency": "PLN",
            "id": 0,
            "mainImageUrl": "string",
            "name": "string"
          },
          "createDate": "2017-08-30T08:40:32.612Z",
          "description": "string",
          "distance": 0,
          "email": "string",
          "id": 0,
          "latitude": 0,
          "longitude": 0,
          "main": true,
          "name": "string",
          "openingHours": "string",
          "phoneNumber": "string",
          "status": "NEW",
          "street": "string",
          "streetNo": "string",
          "website": "string"
        },
        "startDate": "2017-08-30T08:40:32.612Z",
        "status": "NEW",
        "type": "WORK",
        "user": {
          "company": {
            "category": {
              "id": 0,
              "name": "string"
            },
            "createDate": "2017-08-30T08:40:32.612Z",
            "currency": "PLN",
            "id": 0,
            "mainImageUrl": "string",
            "name": "string"
          },
          "createDate": "2017-08-30T08:40:32.616Z",
          "email": "string",
          "id": 0,
          "name": "string",
          "password": "string",
          "phoneNumber": "string",
          "status": "ACTIVE",
          "userRoles": [
            {
              "authority": "string",
              "id": 0,
              "name": "ROLE_ADMIN"
            }
          ]
        }
    }*/

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

        constructor(locationChanged:boolean) {
            if(locationChanged)
            {
             this.location = new Location();
            }
        }
    }