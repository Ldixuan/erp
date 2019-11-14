import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadSqlsOrderPage } from './read-sqls-order';

@NgModule({
  declarations: [
    ReadSqlsOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(ReadSqlsOrderPage),
  ],
})
export class ReadSqlsOrderPageModule {}
