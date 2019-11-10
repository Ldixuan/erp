import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalsOrderPage } from './sals-order';

@NgModule({
  declarations: [
    SalsOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(SalsOrderPage),
  ],
})
export class SalsOrderPageModule {}
