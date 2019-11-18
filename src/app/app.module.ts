import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpModule} from '@angular/http';
import { IonicSelectableModule } from 'ionic-selectable';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TestPage } from '../pages/test/test';
import { SalsOrderPage } from '../pages/sals-order/sals-order'; 

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductModelPage } from '../pages/product-model/product-model';
import { from } from 'rxjs/observable/from';
import { RestProvider } from '../providers/rest/rest';
import { ReadSqlsOrderPage } from '../pages/read-sqls-order/read-sqls-order'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TestPage,
    SalsOrderPage,
    ProductModelPage,
    ReadSqlsOrderPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicSelectableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TestPage,
    SalsOrderPage,
    ProductModelPage,
    ReadSqlsOrderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
