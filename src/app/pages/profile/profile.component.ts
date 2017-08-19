import { Component, OnInit, ViewEncapsulation, ViewChild , Output, EventEmitter} from '@angular/core';
import { ProfileService } from './profile.service';
import { ObjectList } from './user';
import { User } from './user';
import { Router } from '@angular/router';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { ImageModel } from '../add-message/imagemodel';
import { BaMenuService } from '../../theme';
import { NgUploaderOptions } from 'ngx-uploader';
import { BaPictureUploader } from '../../theme/components/baPictureUploader/baPictureUploader.component';

let moment = require('../../../../node_modules/moment/moment');

@Component({
  selector: 'profile',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile.scss')],
  template: require('./profile.html'),
  providers: [ProfileService]
})

export class ProfileComponent implements OnInit {

    otherUser: User;
    otherObject: ObjectList;
    otherImgs: any;
    imageUrl: string = "";
    idCompany: number;
    name: string = '';
    data1: any;
    @ViewChild('childModal') childModal: ModalDirective;
    @Output() sendImage: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('cropper', undefined)
    cropper:ImageCropperComponent;
    cropperSettings1:CropperSettings;
    croppedWidth:number;
    croppedHeight:number;
    croppName: string;

    file:File;
    @ViewChild('fileUpload') fileUpload: BaPictureUploader;
  
    uploaderOptions:NgUploaderOptions = {
        url: '',
    };

    defaultPicture = 'assets/img/theme/add-icon.png';
    profile:any = {
        picture: 'assets/img/theme/add-icon.png'
    };
    showButton: boolean = false;

    constructor(private profileService: ProfileService, private router: Router, private menuService: BaMenuService){

    //   this.cropperSettings = new CropperSettings();
    //   this.cropperSettings.noFileInput = true;
    //   this.data = {};
        this.croppName = 'Angular2'
        this.cropperSettings1 = new CropperSettings();
        /*this.cropperSettings1.width = 200;
        this.cropperSettings1.height = 200;

        this.cropperSettings1.croppedWidth = 200;
        this.cropperSettings1.croppedHeight = 200;

        this.cropperSettings1.canvasWidth = 500;
        this.cropperSettings1.canvasHeight = 300;

        this.cropperSettings1.minWidth = 10;
        this.cropperSettings1.minHeight = 10;*/

        this.cropperSettings1.rounded = false;
        this.cropperSettings1.keepAspect = false;

        this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;

        this.data1 = {};
    }

    ngOnInit() {

        this.profileService.getUser().subscribe(
            user => {
                this.otherUser = user;
                this.name = user.company.name;
                this.idCompany = user.company.id;
                this.profileService.getUserImages(user.company.id).subscribe(
                    images => {
                        this.otherImgs = images;
                        this.defaultPicture = images.imageUrl;
                        this.profile.picture = images.imageUrl;
                    }
                );
            },
            err => {
                this.router.navigateByUrl('/pages/komunikat');
            }
        );
    }

    onUploadCompleted(event: any): void{
        this.showButton = true;
    }

    /*fileChangeListener($event) {
        var image:any = new Image();
        this.file = $event.target.files[0];
        var myReader:FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent:any) {
            console.log('Croping')
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };

        myReader.readAsDataURL(this.file);
    }*/

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
/*
    edytujAvatarModal() : void {
        this.childModal.show();
    }

    confirmPhoto() : void {
        this.childModal.hide();

        var z = new Blob([this.data.image],  {type: 'image/png'});
        console.log(z);
        var fileImage: File = this.blobToFile(z,'image.png');
        console.log('this.data.image '+JSON.stringify(this.data.image));
        console.log('blob file '+JSON.stringify(fileImage));
        console.log('normal file '+JSON.stringify(this.file));
        if(fileImage != null){
            this.profileService.getUser().subscribe(user => {
                this.profileService.addCompanyImage(new ImageModel(user.company.id, fileImage)).subscribe(
                    data => {
                        console.log('Confirm dodano ');
                        this.imageUrl = data.imageUrl;
                        this.name = null;
                        this.menuService.changeImage(data.imageUrl);
                        this.sendImage.emit(data.imageUrl);
                    },
                    error => {}
                );
            });
        }
    }

    cropped(bounds:Bounds) {
        console.log('Cropping '+(bounds.bottom-bounds.top));
        this.file = this.data
    }
*/
    
  /*
    closeModal() : void {
        this.childModal.hide();
    }*/

    /*makeFile(): File{

        return new File();
    }*/

    cropped(bounds:Bounds) {
        this.croppedHeight =bounds.bottom-bounds.top;
        this.croppedWidth = bounds.right-bounds.left;
        this.checkFile();
    }

    addCompanyImage(): void {
        if(this.fileUpload.file != null){
            console.log('works');
            console.dir(this.fileUpload.file);
            this.profileService.getUser().subscribe(user => {
                this.profileService.addCompanyImage(new ImageModel(user.company.id, this.fileUpload.file)).subscribe(
                    data => {
                        this.imageUrl = data.imageUrl;
                        this.defaultPicture = data.imageUrl;
                        this.profile.picture = data.imageUrl;
                        this.name = null;
                        this.menuService.changeImage(data.imageUrl);
                        this.sendImage.emit(data.imageUrl);
                    },
                    error => {
                        console.log('error');
                        console.dir(error);
                    }
                );
            });
        }
        else {
            console.log('sth wrong');
        }
    }

    blobToFile(theBlob: Blob, fileName:string): File {
        var b: any = theBlob;
        b.lastModifiedDate = new Date();
        b.name = fileName;

        return <File>theBlob;
    }

    checkFile(): void {
        let z = new Blob([this.data1.image],  {type: 'image/png'});

        let file = new File([z], "image.png", {type: "image/png"});
        this.fileUpload.file = file;

        console.log('fileimage object: ');
        console.dir(file);

    }

}