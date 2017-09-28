import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { PowiadomieniaService } from './powiadomienia.service';
import { PowiadomieniaList } from './powiadomieniaList.model';
import { ProfileService } from '../profile/profile.service';
import { Router } from '@angular/router';
import { GlobalState } from '../../global.state';

@Component({
    selector: 'powiadomienia',
    encapsulation: ViewEncapsulation.None,
    template: require('./powiadomienia.component.html'),
    styles: [require('./powiadomienia.scss')],
    providers: [PowiadomieniaService, ProfileService]
})

export class PowiadomieniaComponent implements OnInit{

    pageNumber: number = 1;
    powiadomieniaList: PowiadomieniaList;
     canScrool: boolean = true;
    
    constructor(private powiadomieniaService: PowiadomieniaService, private profileService: ProfileService, private router: Router, private _state: GlobalState){
        this._state.notifyDataChanged('menu.isCollapsed',true);
    }

    ngOnInit(): void {
        
        this.profileService.getUser().subscribe(
            result => {},
            error => {
                this.router.navigateByUrl('/pages/komunikat');
            }
        )

        this.powiadomieniaList = new PowiadomieniaList();
        this.getPowiadomienia(this.pageNumber);
    }


    getPowiadomienia(page: any){
          console.log('POWIADOMIENIA ' + page);
        this.powiadomieniaService.getPowiadomienia(page).subscribe(result => {
                        if(page === 1) {
                            this.powiadomieniaList = result;
                             console.log('POWIADOMIENIA ' + this.powiadomieniaList.objectList);
                        } else {
                            this.powiadomieniaList.objectList = this.powiadomieniaList.objectList.concat(result.objectList);
                            this.powiadomieniaList.isLastPage = result.isLastPage;
                            this.canScrool = true;
                        }
                    });
    }

    onScrollDown(){
        if(!this.powiadomieniaList.isLastPage){
            if(this.canScrool){
                this.pageNumber += 1;
                this.canScrool = false;
                this.getPowiadomienia(this.pageNumber);
            }
        }
    }

    usunPowiadomienie(id:any) {
            console.log('USUN POWIADOMIENIE ' + id);
              this.powiadomieniaService.usunPowiadomienie(id).subscribe(result => {
                        this.getPowiadomienia(1);
                    });
    }

}