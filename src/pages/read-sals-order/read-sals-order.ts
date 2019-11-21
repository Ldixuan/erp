import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
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

  loading = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public rest: RestProvider) {
    this.userId = "Admi";
    this.initSalsOrdersData()
  }

  initSalsOrdersData(){
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadSalsOrderPage');
  }

  presentOrderPage(infoOrder, index:number){
    const modal = this.modalCtrl.create(SalsOrderPage, {title : infoOrder.commandeId});

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