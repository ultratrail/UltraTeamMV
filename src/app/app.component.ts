import { Component, ViewChild } from '@angular/core';
import { App, Platform, MenuController, Nav } from 'ionic-angular';

import { SharedAppStateProvider } from '../providers/shared-app-state/shared-app-state'

import { MapPage } from "../pages/map/map";
import { LoginPage } from "../pages/login/login";
import { SettingsPage } from "../pages/settings/settings";
import { QrCodeGeneratorPage } from "../pages/qr-code-generator/qr-code-generator";
import { QrCodeReaderPage } from "../pages/qr-code-reader/qr-code-reader";

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  /**
   * Root page of application
   */
  rootPage: any = LoginPage;

  /**
   * List of pages in menu
   */
  pages: Array<{ title: string, component: any }>;

  /**
   * State of the SOS toogle button
   */
  SOS: boolean ;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    private appState: SharedAppStateProvider,
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Map page', component: MapPage },
      { title: 'Show QR code', component: QrCodeGeneratorPage },
      { title: 'Join course', component: QrCodeReaderPage },
      { title: 'Settings', component: SettingsPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    });
  }

  /**
   * Opens the given page.
   *
   * @param      {<type>}  page    The page to be opened.
   */
  openPage(page):void {
    // close the menu when clicking a link from the menu
    this.menu.close();

    // navigate to the new page if it is not the current page
    if(page.component == MapPage){
      this.nav.popToRoot();
    }
    else{
      this.nav.push(page.component);
    }
  }

  /**
   * User toogled SOS in menu bar.
   */
  sosToogled():void{
    this.appState.sosToogled(this.SOS);
  }

}

