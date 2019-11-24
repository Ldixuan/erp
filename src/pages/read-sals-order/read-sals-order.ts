import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, Toast} from 'ionic-angular';
import { SalsOrderPage } from '../sals-order/sals-order'; 
import { RestProvider} from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../app/common/baseui';

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
  CategoryId : string;

  loading = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public storage : Storage,
    public toastCtrl : ToastController) {
      super();
      this.CategoryId = this.navParams.get('cateogryId');
      this.initSalsOrdersData();
  }

  initSalsOrdersData(){
    this.storage.get("userId").then((val) => {
      this.userId = val;
      this.loading = true;
      this.rest.GetOrdersByUserId(this.userId,this.CategoryId)
          .subscribe(
            (f : any) => {     
              if(f.Success){
                this.salsOrders = f["Data"];
              }else{
                super.showToast(this.toastCtrl, f.Msg);
              }
              this.loading = false;
            },
            error => {
              alert(error); //TODO change to toast
              this.loading = false;
            }
          );
    });
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
