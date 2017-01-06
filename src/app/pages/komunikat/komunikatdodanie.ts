export class CompanyBranch {
    id:number;
    city: string;
    name: string;
    street: string;
    streetNo: string;
    latitude: string;
    longitude: string;
}

export class KomunikatDodanie {

  constructor() {
    this.companyBranch = new CompanyBranch();
  }
    companyBranch: CompanyBranch;
    type: string;
    content: string;
    startDate: any;
    endDate: any;
    createDate: any;
    status: string;
}

