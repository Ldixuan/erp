import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ToastController, LoadingController } from 'ionic-angular';
import { BaseUI } from '../../app/common/baseui';
import { Network } from '@ionic-native/network';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-view-command-with-filter',
  templateUrl: 'view-command-with-filter.html',
})
export class ViewCommandWithFilterPage extends BaseUI {
  private filterOrderTypeList: Array<string>;
  private filterOrderStatusList: Array<string>;
  private filterUserList: Array<string>;
  private filterOrderId:string;
  private filterFromDate: Date;
  private filterToDate: Date;

  private searchCriteria: any = {};

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public popoverCtrl:PopoverController,
     public toastCtrl: ToastController,
     public loadingCtrl : LoadingController,
     public network: Network,
     public rest : RestProvider) {
       super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewCommandWithFilterPage');
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create('FilterPopoverPage', {ViewCommandWithFilterPage: this, searchCriteria:this.searchCriteria} , { cssClass: 'custom-popover'});
    popover.present({
      ev: myEvent
    });
  }

  changeCriteria(criteriaLabel,criteriaValue){
      this.searchCriteria[criteriaLabel] = criteriaValue;
  }
  
  refreshData(){//Array<any>
    console.log(this.searchCriteria);
    if (this.network.type != 'none') {
      var loading = super.showLoading(this.loadingCtrl, "正在获取数据...");
        this.rest.AdvancedSalesOrderSearch(this.searchCriteria)//1: 提交到财务
          .subscribe(
            f => {
              if (f.Success) {
               console.log(f.Data);//todo
              }
            loading.dismiss();
          },
            error => {
              loading.dismiss();
              if (error.Type == '401') {
                super.logout(this.toastCtrl, this.navCtrl);
              } else {
                super.showToast(this.toastCtrl, error.Msg);
              }
            });
    }
    else {
      super.showToast(this.toastCtrl, "您处于离线状态，请连接网络! ");
    }
  }
}
