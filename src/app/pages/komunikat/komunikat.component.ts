///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>
import { Inject,Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {KomunikatService} from './komunikatservice.component';
import { Modal,BSModalContext } from 'angular2-modal/plugins/bootstrap';
import {overlayConfigFactory } from 'angular2-modal';
import {CommunicationService} from "./communicationservice.component";
import {ObjectList} from "./komunikat"
import { ActivatedRoute } from '@angular/router';
import { MessagesComponent } from '../messages/messages.component';
import { FirebaseApp } from "angularfire2";
import * as firebase from 'firebase';
import { url } from '../../globals/url';


@Component({
  selector: 'komunikatcomponent',
  templateUrl: './komunikat.html',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./komunikat.scss')],
  providers: [KomunikatService,Modal]
})
export class KomunikatComponent implements OnInit {

  logged = false;
  searchTerm: string;

  @ViewChild('msgs') messageChild: MessagesComponent;

  constructor(
    private _komunikatyService: KomunikatService, 
    private modal: Modal,
    private communicationservice: CommunicationService,
    private route: ActivatedRoute,
    @Inject(FirebaseApp) private _firebaseApp: firebase.app.App
  ){}

  ngOnInit() {
        var currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
    
        if(currentUser != null) {
          var token = currentUser.token
          this.logged = true;
          var isTokenFCMRegister = localStorage.getItem('isTokenFCMRegister');
          console.log('isTokenFCMRegister '+isTokenFCMRegister);
          if(isTokenFCMRegister != "true") {
            this.registerFCMToken();
          }
        }
  }

  registerFCMToken() {
    const messaging = firebase.messaging();
    messaging.requestPermission()
    .then(function() {
      console.log('Notification permission granted.');
      return messaging.getToken();
    })
    .then(function(token){
      console.log('token '+token);
      var currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
      var userFromStorage = JSON.parse(localStorage.getItem('user'));
       if(currentUser != null) {
        var tokenBearer = currentUser.token
      }
       let headers = new Headers();
      var autorizationHeader = 'Bearer '+tokenBearer.access_token;
      var xmlHttp = new XMLHttpRequest();
      var user= userFromStorage.user;
      var deviceType="WEB"
      xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          localStorage.setItem('isTokenFCMRegister', "true"); 
          console.log(xmlHttp.responseText);
      }
      xmlHttp.open( "POST", url+'/userdevicefcmtoken', true ); // false for synchronous request
      xmlHttp.setRequestHeader('Authorization', autorizationHeader);
      xmlHttp.setRequestHeader('Content-Type', 'application/json');
      xmlHttp.send(JSON.stringify({user, token,deviceType}));
    })
    .catch(function(err) {
      console.log('', err);
    });
    
  }

}
