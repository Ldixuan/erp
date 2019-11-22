import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { SalsOrderPage } from '../sals-order/sals-order'; 
import { RestProvider} from '../../providers/rest/rest'

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
export class ReadSalsOrderPage {

  private salsOrders : Array<any>;
  private userId : string;
  private hasChangeData = false;

  loading = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,public rest: RestProvider) {
    this.userId = "Admi";
    this.initSalsOrdersData()
  }

  initSalsOrdersData(){
    this.loading = true;
    this.rest.GetOrdersByUserId(this.userId)
        .subscribe(
          (f : any) => {
            this.salsOrders = f;
            this.loading = false;
          },
          error => {
            alert(error);
          }
        );
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
