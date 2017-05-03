import { Resource } from 'ng2-resource-rest';
import { url } from '../../globals/url';

export class RestClient extends Resource {

    getUrl(methodOptions?: any): string | Promise<string> {
        let resPath = super.getUrl();
        return url + resPath;
    }

}