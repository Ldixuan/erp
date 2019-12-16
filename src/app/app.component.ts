import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{title: string, component: any, icon: any, param:object}>; //Array<{title: string, componentPages: Array<{pageTitle: string, component: any}>}>;

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
      { title: '编辑销售/采购订单', component: 'SalsOrderPage' , icon:'create', param:null},
      { title: '查看销售订单', component: 'ReadSalsOrderCategoriesPage' , icon:'document', param:{commandTypeId:'O', commandTypeLabel :'销售'}},
      { title: '查看采购订单', component: 'ReadSalsOrderCategoriesPage' , icon:'document', param:{commandTypeId:'I',commandTypeLabel:'采购'}},
      { title: '编辑出货订单', component: 'AddDeliveryOrderPage' , icon:'create', param:null},
      { title: '查看出货订单', component: 'ReadDeliveryOrderPage' , icon:'document', param:null},
     // { title: 'Home', component: HomePage , icon:'document'},
     // { title: 'List', component: ListPage , icon:'document'},
      { title: '销售排行', component: 'SalesPerformanceRewardPage' , icon:'star', param:null},
      { title: '我的设置', component: 'SettingsPage' , icon:'settings', param:null }
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
    if(page.param ==null){
      this.nav.setRoot(page.component);
    }
    else{
      this.nav.setRoot(page.component, page.param);
    }

  }
}
