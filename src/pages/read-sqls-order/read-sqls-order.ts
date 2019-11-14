import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { SalsOrderPage } from '../sals-order/sals-order'; 

/**
 * Generated class for the ReadSqlsOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-read-sqls-order',
  templateUrl: 'read-sqls-order.html',
})
export class ReadSqlsOrderPage {

  private salsOrders : Array<{orderData:any, Products:any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
    this.salsOrders = [];
  }

  initSalsOrdersData(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadSqlsOrderPage');
  }

  presentOrderPage(infoOrder, index:number){
    const modal = this.modalCtrl.create(SalsOrderPage, {infoProduct : infoOrder});

    modal.onDidDismiss(data => {
      if(data != undefined ){
        if(data.action == 1){
          this.salsOrders.splice(index, 1);
        }else if(data.action == 2){
          this.salsOrders[index] = data.content;
        }
      }
    })

    modal.present();
  }

}
