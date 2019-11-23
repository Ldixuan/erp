import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider} from '../../providers/rest/rest';
import { BaseUI } from '../../app/common/baseui';
import { Network } from '@ionic-native/network';
import { ReadSalsOrderPage } from '../read-sals-order/read-sals-order';

/**
 * Generated class for the ReadSalsOrderCategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-read-sals-order-categories',
  templateUrl: 'read-sals-order-categories.html',
})
export class ReadSalsOrderCategoriesPage extends BaseUI {
  orderStatus: any[];
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      public network : Network ,
      public rest : RestProvider,
      public toastCtrl : ToastController,
      public loadingCtrl : LoadingController) {
    super();
  }

  ionViewDidLoad() {
   // this.orderStatus = ["未提交","提交到财务","财务不同意","财务同意","经理不同意","经理同意","已作废","冲单"];
    if(this.network.type !='none'){
      var loading = super.showLoading(this.loadingCtrl,"加载中");
      var userId = 'Admi';
      this.rest.GetSalesOrderCategoriesByUserId(userId)
          .subscribe(
            (f : any) => {
              if(f.Success){
                this.orderStatus = f["Data"];
              }else{
                super.showToast(this.toastCtrl, f.Msg);
              }
            },
            error => {
              loading.dismiss();
              alert(error); //TODO change to toast
            });
          }

  }
  itemSelected(itemId){
    if(itemId!=null){
      this.navCtrl.push(ReadSalsOrderPage,{cateogryId:itemId});
    }
  }

}
