import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { AddMessageService } from './add-message.service';
import { CommunicationService } from '../komunikat/communicationservice.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';
import { MessageType } from '../../globals/enums/message-type.enum';
import { MessageAddModel, CompanyBranchList } from './add-message-model';
import { NgUploaderOptions } from 'ngx-uploader';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { ImageModel } from "./imagemodel";
import { MessagesService } from '../messages/messages.service';
import { ObjectList } from '../messages/message';
import { Daterangepicker, DaterangepickerConfig } from 'ng2-daterangepicker';
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings, MultiselectDropdown } from 'angular-2-dropdown-multiselect';
import { ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { ProfileService } from '../profile/profile.service';

let moment = require('../../../../node_modules/moment/moment');

@Component({
    selector: 'add-message',
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./add-message.scss'), 
        require('../../../../node_modules/ng2-daterangepicker/daterangepicker.component.css'),
        require('../../../../node_modules/ng2-toasty/style-bootstrap.css')
    ],
    template: require('./add-message.component.html'),
    providers: [AddMessageService, MessagesService, ProfileService]
})

export class AddMessageComponent implements OnInit {

    messageTypeValue: string;
    messageTypeName: any;
    messageTypes: string[] = Object.keys(MessageType);
    messageTypesOb: {name: string, value: string}[] = [];
    msgAddModel: any = {};
    messageAddModel: MessageAddModel;
    addedMessage: any;
    image:File;
    isCollapsed:boolean = true;
    isLocationCollapsed: boolean = true;
    withEndDate:boolean = false;
    triggerResize:boolean = true;
    id: number;
    paramValue: any;
    messageEdit: ObjectList;
    zoom: number = 8;
    lat: number;
    lng: number;
    localization:any;
    geocoder:any;
    locationChanged:boolean =false;
    optionsModel: number[] =[];
    myOptions: IMultiSelectOption[] ;
    companyBranchList: any;
    companyBranchListSelected: CompanyBranchList[];
    companyBranchListSelectedFinal: CompanyBranchList[] =[];
    showMulitSelect:boolean = false;
    submitButton: string = "Utwórz";
    defaultPicture = 'assets/img/theme/camera.png';
    profile:any = {
        picture: 'assets/img/theme/camera.png'
    };
    uploaderOptions: NgUploaderOptions = {
        url: '',
    };

    @ViewChild(AgmMap) sebmGoogleMap: any;
    @ViewChild('childModal') childModal: ModalDirective;
    @ViewChild('fileUpload') fileUpload:any;
    @ViewChild('datePickerStart') datePickerStart:Daterangepicker;
    @ViewChild('datePickerEnd') datePickerEnd: Daterangepicker;
    @ViewChild('multiSelectDropdown') multiSelectDropdown: MultiselectDropdown;
    @Input() disVal:string = "false";

    mySettings: IMultiSelectSettings = {
        checkedStyle: 'glyphicon',
        showCheckAll: true,
		showUncheckAll: true,
        buttonClasses: '',
    };

    myTexts: IMultiSelectTexts = {
        checkAll: 'wybierz wszystkie',
        uncheckAll: 'wyczyść',
        checked: 'wybrany oddział',
        checkedPlural: 'wybrane oddziały',
        searchPlaceholder: 'szukaj',
        defaultTitle: '',
        allSelected: 'wszystkie wybrane',
    };

    pickerOptionsStart: Object = {
        'showDropdowns': true,
        'showWeekNumbers': false,
        "timePicker": true,
        'timePickerIncrement': 5,
        "timePicker24Hour": true,
        'autoApply': true,
        "locale": {
            format: 'MM/DD/YYYY H:mm',
            "applyLabel": "Wybierz",
            "cancelLabel": "Anuluj",
             "daysOfWeek": [
                    "Ndz",
                    "Pon",
                    "Wt",
                    "Śr",
                    "Czw",
                    "Pi",
                    "Sob"
                ],
                "monthNames": [
                    "Styczeń",
                    "Luty",
                    "Marzec",
                    "Kwiecień",
                    "Maj",
                    "Czerwiec",
                    "Lipiec",
                    "Sierpień",
                    "Wrzesień",
                    "Październik",
                    "Listopad",
                    "Grudzień"
                ],
        },
        "singleDatePicker": true,
        "minDate": moment().format("MM/DD/YYYY")
    };

    pickerOptionsEnd: Object = {
        'showDropdowns': true,
        'showWeekNumbers': false,
        "timePicker": true,
        'timePickerIncrement': 5,
        "timePicker24Hour": true,
        'autoApply': true,
        "minDate": moment().format("MM/DD/YYYY"),
        "locale": {
            format: 'MM/DD/YYYY H:mm',
            "applyLabel": "Wybierz",
            "cancelLabel": "Anuluj",
             "daysOfWeek": [
                    "Ndz",
                    "Pon",
                    "Wt",
                    "Śr",
                    "Czw",
                    "Pi",
                    "Sob"
                ],
                "monthNames": [
                    "Styczeń",
                    "Luty",
                    "Marzec",
                    "Kwiecień",
                    "Maj",
                    "Czerwiec",
                    "Lipiec",
                    "Sierpień",
                    "Wrzesień",
                    "Październik",
                    "Listopad",
                    "Grudzień"
                ],
        },
        "singleDatePicker": true
        
    };

    title: string = 'czy jesteś pewien że chcesz dodać post bez daty zakończenia?';
    confirmClicked: boolean = false;
    cancelClicked: boolean = false;
    isOpen: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private addMessageService: AddMessageService,
        private _location: Location,
        private communicationservice: CommunicationService,
        private mapsApiLoader: MapsAPILoader,
        private messageService: MessagesService,
        private daterange: DaterangepickerConfig,
        private router: Router,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        private profileService: ProfileService
    ){
        this.mapsApiLoader.load().then(() => {
            console.log('google script loaded');
            this.geocoder = new google.maps.Geocoder();
            console.log(this.geocoder);
        });

        this.toastyConfig.theme = 'material';
    }

    addToast(message: string): void {
        let toastOptions: ToastOptions = {
            title: 'Błąd',
            msg: message,
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap',
            onAdd: (toast: ToastData) => {},
            onRemove: function(toast: ToastData) {}
        };

        this.toastyService.error(toastOptions);
    }

    ngOnInit(): void{

        this.profileService.getUser().subscribe(
            result => {},
            error => {
                this.router.navigateByUrl('/pages/komunikat');
            }
        );

        this.msgAddModel.startDate = moment().format("YYYY-MM-DD HH:mm:ss");
        this.msgAddModel.endDate = moment().format("YYYY-MM-DD HH:mm:ss");

        $('#checkboxAdd + label').addClass('changed');
        this.msgAddModel.endDate = null;

        if(localStorage.getItem('latitude') !== null) {
            this.lat = JSON.parse(localStorage.getItem('latitude'));
            console.log('this.lat: ' + this.lat);
        }
        if(localStorage.getItem('longitude') !== null) {
            this.lng = JSON.parse(localStorage.getItem('longitude'));
            console.log('this.lng: ' + typeof JSON.parse(localStorage.getItem('longitude')).longitude);
        }

        
        let user = JSON.parse(localStorage.getItem('user'));
        if(user != null) {
            this.addMessageService.getUserCompanyBranchList(user.user.company.id).subscribe((value)=> {
                 this.companyBranchList = value;
                if(this.companyBranchList.length >1) {
                    this.showMulitSelect = true;
                this.myOptions = this.companyBranchList;
                }
            }) 
       }
        //  this.pickerOptionsEnd['minDate'] = '05/01/2017';
          
        for(let i = this.messageTypes.length-1; i >= 0; i--)
            if(i%2 !== 0)
                this.messageTypesOb.push({name: this.messageTypes[i-1], value: this.messageTypes[i]});

        this.route.params.subscribe((params: Params) => {
            this.paramValue = Object.keys(params)[0];
            switch (this.paramValue) {
                case 'message_id':
                    console.log('PARAMETER IS ' + Object.keys(params)[0]);
                    this.id = params[this.paramValue];
                    this.submitButton = "Zapisz";
                    this.msgAddModel.id = this.id;
                    this.messageService.getMessagesSingle(this.id).subscribe(result => {
                        this.messageEdit = result;
                        this.msgAddModel.content = this.messageEdit.content;
                        this.msgAddModel.startDate = moment(new Date(this.messageEdit.startDate)).format("YYYY-MM-DD HH:mm:ss");
                        this.profile.picture = this.messageEdit.mainImageUrl;

                        if(this.messageEdit.location != null) {
                            this.lat =  this.messageEdit.location.latitude;
                            this.lng = this.messageEdit.location.longitude;
                        } else {
                            this.lat =  this.messageEdit.companyBranchList[0].latitude;
                            this.lng = this.messageEdit.companyBranchList[0].longitude;
                        }
                        this.messageTypeName = this.messageEdit.type;
                        if(this.messageEdit.endDate == null) {
                            this.withoutEndDate();
                        } else {
                            this.msgAddModel.endDate = moment(new Date(this.messageEdit.endDate)).format("YYYY-MM-DD HH:mm:ss");  
                        }               
                        this.changeAddress(this.callbackEdit);
                     });
                    break;
                
                case 'message_type':
                    this.messageTypeValue = params[this.paramValue];
                    for(let a = 0; a < this.messageTypesOb.length; a++)
                        if(this.messageTypesOb[a].name === this.messageTypeValue)
                            this.messageTypeName = this.messageTypesOb[a].value;
                    console.log('this name : ' + this.messageTypeName);
                    break;

                default:

                    break;
            }
            /*
                messageTypeValue: string;
    messageTypeName: any;
            */ 
            // console.log('messageTypeValue' + this.messageTypeValue);
            // console.log('messageTypeName' + this.messageTypeName);
        });
    }

    callback = (address: string) : void => {
        console.log('callback');  
         this.localization = address;
         this.locationChanged = true;
    }

    callbackEdit = (address: string) : void => {
        console.log('callbackEdit');  
         this.localization = address;
    }

    mapClicked($event: any) {
      console.log('Map clicked');
      this.lat =  $event.coords.lat;
      this.lng = $event.coords.lng;
      this.changeAddress(this.callback);
    }
    markerDragEnd($event: any) {
      console.log('Map Dragged end');
      this.lat =  $event.coords.lat;
      this.lng = $event.coords.lng;
      this.changeAddress(this.callback);
    }

    selectStartDate(message) {
        this.msgAddModel.startDate = moment(new Date(message.start._d)).format("YYYY-MM-DD HH:mm:ss");
        // this.pickerOptionsEnd['minDate'] = '04/01/2017';
        if(this.msgAddModel.startDate && this.msgAddModel.endDate){
            if(this.msgAddModel.startDate > this.msgAddModel.endDate){
                this.addToast('Data rozpoczęcia nie może być później niż data zakończenia');
            }
        }
    }

    selectEndDate(message) {
        this.msgAddModel.endDate = moment(new Date(message.end._d)).format("YYYY-MM-DD HH:mm:ss");
        if(this.msgAddModel.startDate && this.msgAddModel.endDate){
            if(this.msgAddModel.startDate > this.msgAddModel.endDate){
                this.addToast('Data rozpoczęcia nie może być później niż data zakończenia');
            }
        }
    }

    ngAfterViewInit(): void {
        this.showChildModal();    
    }

    changeAddress(callback: Function):void {
         var address="";

             var latlng = {lat: this.lat, lng:this.lng};
                this.geocoder.geocode( { 'location': latlng}, function(results, status) {
                // and this is function which processes response
                    if (status == google.maps.GeocoderStatus.OK) {
                        console.log('geocoder inside: '+results[1].formatted_address);  
                        address=results[0].formatted_address;
                    } else {
                        console.log("Geocode was not successful for the following reason: " + status);
                    }
                    callback(address);  
                }); 
    }

    showChildModal(): void {
      this.childModal.show();
    }

    hideChildModal(): void {
      this.childModal.hide();
      this._location.back();
    }

    addprop():void {
        this.isCollapsed = !this.isCollapsed;
        this.msgAddModel.endDate = null;

        if($('#checkboxAdd + label').hasClass('changed')){
            $('#checkboxAdd + label').removeClass('changed');
        } else {
            $('#checkboxAdd + label').addClass('changed');
        }
    }

    addprop2(): void{
        this.isLocationCollapsed = !this.isLocationCollapsed; 
    }

    setLocationCallapsed(): void{
        this.isLocationCollapsed = !this.isLocationCollapsed;
         if(!this.isLocationCollapsed){
            setTimeout(() => this.sebmGoogleMap.triggerResize().then(res => { 
                console.log('triggerResize');  
                console.log('this.lat: ' + this.lat);
                this.sebmGoogleMap._mapsWrapper.setCenter({lat: this.lat, lng: this.lng});
                this.changeAddress(this.callbackEdit);
            }),300);
        }             
    }

    withoutEndDate():void {
        this.isCollapsed = false;
        this.withEndDate = true;
        this.msgAddModel.endDate = null;
    }

    ngOnDestroy() { 
        this.triggerResize = true;
    }

    addMessage(): void{
        
        this.messageAddModel = new MessageAddModel(this.locationChanged);
        this.messageAddModel.content = this.msgAddModel.content;

        if(this.msgAddModel.id != null) {
            this.messageAddModel.id = this.msgAddModel.id;
        }

        this.messageAddModel.startDate =  moment(new Date(this.msgAddModel.startDate)).format("YYYY-MM-DDTHH:mm:ssZZ");

        if(this.msgAddModel.endDate != null) {
          this.messageAddModel.endDate = moment(new Date(this.msgAddModel.endDate)).format("YYYY-MM-DDTHH:mm:ssZZ");
        }

        // this.messageAddModel.type = this.messageTypeName;
        // console.log('messageTypeValue' + this.messageTypeValue);
        // console.log('messageTypeName' + this.messageTypeName);
        this.messageAddModel.type = this.messageTypeValue

        this.messageAddModel.status = "NEW";

        if(this.showMulitSelect) {
            if(this.companyBranchListSelectedFinal.length>=1) {
                 this.messageAddModel.companyBranchList=this.companyBranchListSelectedFinal;
            } else {
                var companyBranchListSelectedLocal = [];
                companyBranchListSelectedLocal.push(this.companyBranchList[0])
                this.messageAddModel.companyBranchList= companyBranchListSelectedLocal;
            }
        } else {
        this.messageAddModel.companyBranchList = this.companyBranchList;
        }

        this.messageAddModel.companyBranchCount = this.messageAddModel.companyBranchList.length;

        console.log('LOCATION CHANGED '+this.locationChanged);
        if(this.locationChanged) {
            this.messageAddModel.location.address=this.localization;
            this.messageAddModel.location.latitude=this.lat;
            this.messageAddModel.location.longitude=this.lng;
            this.messageAddModel.location.name=this.localization;
        } else {
       //     this.messageAddModel.location.name = this.messageAddModel.companyBranchList[0].name;
          //  this.messageAddModel.location.city = this.messageAddModel.companyBranchList[0].city;
         //   this.messageAddModel.location.latitude = this.messageAddModel.companyBranchList[0].latitude;
          //  this.messageAddModel.location.longitude = this.messageAddModel.companyBranchList[0].longitude;
           // this.messageAddModel.location.street = this.messageAddModel.companyBranchList[0].street;
           // this.messageAddModel.location.streetNo = this.messageAddModel.companyBranchList[0].streetNo;
           // this.messageAddModel.location.address = this.messageAddModel.companyBranchList[0].city;
        }
        console.log(this.msgAddModel);

        if(this.msgAddModel.startDate < this.msgAddModel.endDate || !this.msgAddModel.endDate){
            console.log('OK data rozp > data zak');
            this.addMessageService.addMessage(this.messageAddModel).subscribe(
            data => {
                this.addedMessage = data;
                    if(this.fileUpload.file != null) {
                        console.log('inside '+this.fileUpload.file); 
                        this.addMessageService.addMessageImage(new ImageModel(this.addedMessage.id,this.fileUpload.file)).subscribe(
                            data => {
                                console.log('closing image '+this.fileUpload.file); 
                                this.hideChildModal();
                            }
                        );
                    } else {
                        this.hideChildModal();   
                    }
            },
            error => {
                // this.addToast('Musisz wpisać treść postu przed stworzeniem');
                console.log('error:');
                console.dir(error);
            }
        );
        } else {
            console.log('data rozp > data zak ERROR');
            this.addToast('Data rozpoczęcia nie może być później niż data zakończenia');
        }
        
    }

    onChange() {
        console.log(this.optionsModel);
        this.companyBranchListSelected = this.companyBranchList;
        this.companyBranchListSelectedFinal = [];
        for (let id of this.optionsModel) {
            for (let companyBranch of  this.companyBranchListSelected) {
                if(id == companyBranch.id) {
                this.companyBranchListSelectedFinal.push(companyBranch);
                console.log(this.companyBranchListSelectedFinal);
              }
            }
        
        }
    }

    closeModal(){
        this.router.navigateByUrl('/pages/komunikat');
    }

}
