import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';

import { HomePage } from "../pages/home/home";
import { MapPage } from "../pages/map/map";
import { SettingsPage } from "../pages/settings/settings";
import { QrCodeGeneratorPage } from "../pages/qr-code-generator/qr-code-generator";
import { QrCodeReaderPage } from "../pages/qr-code-reader/qr-code-reader";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any }>;

  SOS: boolean ;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home page', component: HomePage },
      { title: 'Map page', component: MapPage },
      { title: 'QRCodeGenerator', component: QrCodeGeneratorPage },
      { title: 'QRCodeReader', component: QrCodeReaderPage },
      { title: 'Settings', component: SettingsPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  sosToogled(){
    // Handle SOS
    this.sendSOSServer();
    this.sendSOSBLE();
  }

  sendSOSServer(){
    console.log("Sending SOS to server");
  }

  sendSOSBLE(){
    console.log("Sending SOS to BLE");
  }

}

