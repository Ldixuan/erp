import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductModelPage } from './product-model';

@NgModule({
  declarations: [
    ProductModelPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductModelPage),
  ],
})
export class ProductModelPageModule {}
