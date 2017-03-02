import { Resource } from 'ng2-resource-rest';

export class RestClient extends Resource {

    getUrl(methodOptions?: any): string | Promise<string> {
        let resPath = super.getUrl();
        return 'https://damp-temple-52216.herokuapp.com/' + resPath;
    }

}