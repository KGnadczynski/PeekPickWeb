import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KomunikatServiceComponent } from './komunikat-single.service';
import { Observable } from 'rxjs/Observable';
import { ObjectList } from '../komunikat/komunikat';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'komunikat-single',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./komunikat-single.scss')],
  template: require('./komunikat-single.component.html'),
  providers: [KomunikatServiceComponent]
})

export class KomunikatSingleComponent implements OnInit {

    private sub: any;
    private id: number;
    private message: ObjectList;
    private imgs: any;
    socialVisible: boolean = false;
    name: string = '';

    @ViewChild('childModal') public childModal: ModalDirective;

    constructor(
      private route: ActivatedRoute, 
      private komunikatSingleService: KomunikatServiceComponent,
      private _location: Location,
      private router: Router
    ){
      let moment = require('../../../../node_modules/moment/moment.js');
      moment.locale('pl');
    }

    ngOnInit(): void {

      this.sub = this.route.params.subscribe(params =>  {
          this.id = +params['id_komunikat'];
      });

      this.komunikatSingleService.getKomunikat(this.id).subscribe(komunikat => {
        this.message = komunikat;
        console.log('single kom: ');
        console.dir(komunikat);
        this.komunikatSingleService.getUserImages(this.message.companyBranchList[0].company.id).subscribe(
            images => {
                this.imgs = images;
            },
            error => {
                this.name = komunikat.companyBranchList[0].company.name;
            }
        );
      });

    }

    ngAfterViewInit(): void {
      this.showChildModal();
    }

    public showChildModal(): void {
      this.childModal.show();
    }

    public hideChildModal(): void {
      this.childModal.hide();
      this._location.back();
    }

    checkIfFavourite(id: number){
        if(JSON.parse(localStorage.getItem("favs"))){
            if(JSON.parse(localStorage.getItem("favs")).indexOf(id) > -1) return true;
            else return false;
        }
    }

    addToFavourites(id: number){

        if(localStorage.getItem("favs") === null){
            let storedArray = [];
            storedArray.push(id);
            localStorage.setItem("favs", JSON.stringify(storedArray));
        } else {
            let storedParse = JSON.parse(localStorage.getItem("favs"));

            if(storedParse.indexOf(id) === -1){
                storedParse.push(id);
            } else{
                storedParse.splice(storedParse.indexOf(id), 1);
            }
            
            localStorage.setItem("favs", JSON.stringify(storedParse));
            console.dir(localStorage);
            
        }

    }

    navigateToMap(id: number){
        console.log('odpalamy mape');
        this.router.navigate(['/pages/mapmodal', id]);
    }

    showSocialShare() {
        this.socialVisible =  !this.socialVisible;
    }
}