import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SalsOrderPage } from '../pages/sals-order/sals-order'
import { ReadSalsOrderPage } from '../pages/read-sals-order/read-sals-order'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, componentPages: Array<{pageTitle: string, component: any}>}>;

  listShow: {[key:string] : boolean} = {};

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: '销售管理', componentPages: [
        {pageTitle: '销售订单', component: SalsOrderPage},
        {pageTitle: '查看订单', component: ReadSalsOrderPage}
      ] },
      { title: 'Home', componentPages: [
        {pageTitle: 'Home', component : HomePage}
      ] },
      { title: 'List', componentPages: [
        {pageTitle: 'List', component : ListPage}
      ]}
    ];

    for (let index = 0; index < this.pages.length; index++) {
      this.listShow[this.pages[index].title] = false;
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
