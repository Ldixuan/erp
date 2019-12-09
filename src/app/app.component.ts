import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SalsOrderPage } from '../pages/sals-order/sals-order';
import { ReadSalsOrderPage } from '../pages/read-sals-order/read-sals-order';
import { LoginPage } from '../pages/login/login';
import { ReadSalsOrderCategoriesPage } from '../pages/read-sals-order-categories/read-sals-order-categories';
import { SettingsPage } from '../pages/settings/settings';
import { SalesPerformanceRewardPage } from '../pages/sales-performance-reward/sales-performance-reward';
import {AddDeliveryOrderPage } from '../pages/add-delivery-order/add-delivery-order';
import { ReadDeliveryOrderPage } from '../pages/read-delivery-order/read-delivery-order'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, icon: any}>; //Array<{title: string, componentPages: Array<{pageTitle: string, component: any}>}>;

  listShow: {[key:string] : boolean} = {};

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // { title: '销售管理', componentPages: [
      //   {pageTitle: '销售订单', component: SalsOrderPage},
      //   {pageTitle: '查看订单', component: ReadSalsOrderCategoriesPage}
      // ] },
      // { title: 'Home', componentPages: [
      //   {pageTitle: 'Home', component : HomePage}
      // ] },
      // { title: 'List', componentPages: [
      //   {pageTitle: 'List', component : ListPage}
      // ]}
      { title: '编辑销售订单', component: SalsOrderPage , icon:'create'},
      { title: '查看销售订单', component: ReadSalsOrderCategoriesPage , icon:'document'},
      { title: '编辑出货订单', component: AddDeliveryOrderPage , icon:'create'},
      { title: '查看出货订单', component: ReadDeliveryOrderPage , icon:'document'},
      { title: 'Home', component: HomePage , icon:'document'},
      { title: 'List', component: ListPage , icon:'document'},
      { title: '销售排行', component: SalesPerformanceRewardPage , icon:'star'},
      { title: '我的设置', component: SettingsPage , icon:'settings'}
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
