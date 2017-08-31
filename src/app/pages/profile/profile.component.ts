import { Component, OnInit, ViewEncapsulation, ViewChild , Output, EventEmitter} from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { ObjectList, User } from './user';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { BaMenuService } from '../../theme';
import { ProfileService } from './profile.service';
import { MessagesService } from '../messages/messages.service';

let moment = require('../../../../node_modules/moment/moment');

@Component({
  selector: 'profile',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile.scss')],
  template: require('./profile.html'),
  providers: [ProfileService, MessagesService]
})

export class ProfileComponent implements OnInit {

    otherUser: User;
    otherObject: ObjectList;
    otherImgs: any;
    imageUrl: string = "";
    idCompany: number;
    name: string = '';
    data: any;
    @ViewChild('childModal') childModal: ModalDirective;
    @Output() sendImage: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('cropper', undefined)
    cropper:ImageCropperComponent;
    cropperSettings:CropperSettings;
    croppedWidth:number;
    croppedHeight:number;
    file: File;
    image:any;
    myReader: FileReader;

    constructor(private http: Http, private profileService: ProfileService, private router: Router, private menuService: BaMenuService, private messageService: MessagesService){

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;

        this.cropperSettings.croppedWidth = 200;
        this.cropperSettings.croppedHeight = 200;

        this.cropperSettings.canvasWidth = 500;
        this.cropperSettings.canvasHeight = 300;

        this.cropperSettings.minWidth = 10;
        this.cropperSettings.minHeight = 10;

        this.cropperSettings.rounded = false;
        this.cropperSettings.keepAspect = false;

        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

        this.data = {};
    }

    ngOnInit() {

        this.profileService.getUser().subscribe(
            user => {
                console.log('user:');
                console.dir(user);
                this.otherUser = user;
                this.name = user.company.name;
                this.idCompany = user.company.id;
                this.profileService.getUserImages(user.company.id).subscribe(
                    images => {
                        this.otherImgs = images;
                    }
                );
            },
            err => {
                this.router.navigateByUrl('/pages/komunikat');
            }
        );
        
    }

    public setLocationFromCompanyBranchList(companyBranchList:any): void {
        console.log('seting correct latitiude and longitude '+JSON.parse(companyBranchList));
        var companyBranchListVar = JSON.parse(companyBranchList);
        console.log('seting correct latitiude and longitude '+companyBranchListVar.companyBranchList);
        for (let entry of companyBranchListVar.companyBranchList) {
            console.log('Hello '+entry.main); // 1, "string", false
            if(entry.main) {
                localStorage.setItem('latitude', entry.latitude);
                localStorage.setItem('longitude', entry.longitude);
            }
        }
    }

    changeImage(imageUrl: string): void {
        this.otherImgs.imageUrl = imageUrl;
    }

    fileChangeListener($event) {
        let image: any = new Image();
        this.file = $event.target.files[0];
        this.myReader = new FileReader();
        var that = this;
        this.myReader.onloadend = function (loadEvent:any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };
        this.myReader.readAsDataURL(this.file);
    }


    edytujAvatarModal() : void {
        this.childModal.show();
    }
    
    closeModal() : void {
        this.childModal.hide();
        this.cropper.reset();
    }

    cropped(bounds:Bounds) {
        this.croppedHeight =bounds.bottom-bounds.top;
        this.croppedWidth = bounds.right-bounds.left;
    }

    confirmPhoto(): void {
        let o = {
            "base64" : this.data.image.substr(this.data.image.indexOf("base64,") + "base64".length+1)
        };

        this.profileService.getUser().subscribe(
            user => {
                this.profileService.addImage(o, user.company.id).subscribe(
                    images => {
                        
                        console.log('added photo');
                        console.dir(images);
                        this.otherImgs = images;
                        this.menuService.changeImage(images.imageUrl);
                        this.messageService.changeImage(images.imageUrl);
                        this.name = null;
                    },
                    error => {
                        console.dir(error);
                    }
                );
            }
        );
        this.closeModal();
    }

}