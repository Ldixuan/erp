import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpModule} from '@angular/http';
import { IonicSelectableModule } from 'ionic-selectable';
import { Network } from '@ionic-native/network';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TestPage } from '../pages/test/test';
import { SalsOrderPage } from '../pages/sals-order/sals-order'; 
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductModelPage } from '../pages/product-model/product-model';
import { from } from 'rxjs/observable/from';
import { RestProvider } from '../providers/rest/rest';
import { ReadSalsOrderPage } from '../pages/read-sals-order/read-sals-order';
import { ReadSalsOrderCategoriesPage } from '../pages/read-sals-order-categories/read-sals-order-categories';
import { SettingsPage } from '../pages/settings/settings';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TestPage,
    SalsOrderPage,
    ProductModelPage,
    ReadSalsOrderPage,
    LoginPage,
    ReadSalsOrderCategoriesPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicSelectableModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TestPage,
    SalsOrderPage,
    ProductModelPage,
    ReadSalsOrderPage,
    LoginPage,
    ReadSalsOrderCategoriesPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    Network
  ]
})
export class AppModule {}
