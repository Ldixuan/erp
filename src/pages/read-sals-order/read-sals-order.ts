import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { SalsOrderPage } from '../sals-order/sals-order'; 
import { RestProvider} from '../../providers/rest/rest';
import { BaseUI } from '../../app/common/baseui';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the ReadSqlsOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-read-sals-order',
  templateUrl: 'read-sals-order.html',
})
export class ReadSalsOrderPage extends BaseUI{

  private salsOrders : Array<any>;
  private userId : string;
  private hasChangeData = false;

  loading = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public toastCtrl : ToastController,
    public network: Network) {
      super();
      this.userId = "Admi";
      this.initSalsOrdersData()
  }

  initSalsOrdersData(){
    if(this.network.type !='none'){
      this.loading = true;
      this.rest.GetOrdersByUserId(this.userId)
          .subscribe(
            (f : any) => {
              if(f.Success){
                this.salsOrders = f.Data;
              }else{
                super.showToast(this.toastCtrl, f.Msg);
              }
              this.loading = false;
            },
            error => {
              alert(error);
            }
          );
    }
    else{
      super.showToast(this.toastCtrl, "您处于离线状态，请连接网络! "); 
    }
  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
        this.hasChangeData = _params;
        resolve();
    });
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadSalsOrderPage');
  }

  ionViewDidEnter(){
   if(this.hasChangeData){
     this.initSalsOrdersData();
   }
  }

  presentOrderPage(infoOrder, index:number){
    this.navCtrl.push(SalsOrderPage,{title : infoOrder.commandeId,callback:this.myCallbackFunction});
  }

}
