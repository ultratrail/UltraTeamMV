import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SharedAppStateProvider } from '../../providers/shared-app-state/shared-app-state'

import { QrCodeGeneratorPage } from "../qr-code-generator/qr-code-generator";
import { QrCodeReaderPage } from "../qr-code-reader/qr-code-reader";

import { Course } from "../../model/Course"

import { API } from "../../api/API"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private appState: SharedAppStateProvider) {
  }


  createCourse():void{
    let courseID:number = API.createCourse(this.appState.getUser().getUID());
    let createdCourse:Course = new Course(courseID);
    this.appState.setCourse(createdCourse); 
    this.openCreatePage();
  }

  /**
   * Opens the QRCodeGenerator page.
   */
  openCreatePage(): void{
    this.navCtrl.setRoot(QrCodeGeneratorPage);
  }

  /**
   * Opens the QRCode scanner page.
   */
  openJoinPage(): void {
    this.navCtrl.setRoot(QrCodeReaderPage);
  }

}
