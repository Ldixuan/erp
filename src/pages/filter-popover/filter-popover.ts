import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, List } from 'ionic-angular';
import { orderStatus, orderType} from '../../providers/constants/constants'
import { Storage } from '@ionic/storage';
/**
 * Generated class for the FilterPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-popover',
  templateUrl: 'filter-popover.html',
})
export class FilterPopoverPage {
private orderStatus:any;
private orderType:any;
private userList:any;

private filterOrderTypeList: Array<string>;
private filterOrderStatusList: Array<string>;
private filterUserList: Array<string>;
private filterOrderId:string;
private filterFromDate: Date;
private filterToDate: Date;
private ViewCommandWithFilterPage: any;

private managerPermission : boolean = false;

  constructor(public viewCtrl: ViewController,public navParams: NavParams,public storage: Storage) {
    this.orderStatus = orderStatus;
    this.orderType = orderType;
  }

  close() {
    //this.viewCtrl.dismiss();
  }
  resetAllCriteria(){
    this.filterOrderTypeList=[];
    this.filterOrderStatusList=[];
    this.managerPermission!=false?this.filterUserList=[]:null;
    this.filterOrderId = null;
    this.filterFromDate = null;
    this.filterToDate = null;
    this.ViewCommandWithFilterPage.resetCriteria(this.managerPermission);
  }

  changeOrderType(){
    //this.storage.set('filterOrderTypeList',JSON.stringify(this.filterOrderTypeList) );
    console.log(this.filterOrderTypeList );
    this.ViewCommandWithFilterPage.changeCriteria('orderTypes',this.filterOrderTypeList);
  }
  changeOrderStatus(){
    //this.storage.set('filterOrderStatusList',JSON.stringify(this.filterOrderStatusList));
    console.log(this.filterOrderStatusList );
    this.ViewCommandWithFilterPage.changeCriteria('orderStatus',this.filterOrderStatusList);
  }
  changeOrderId(){
    //this.storage.set('filterOrderId',this.filterOrderId);
    console.log(this.filterOrderId );
    this.ViewCommandWithFilterPage.changeCriteria('orderId',this.filterOrderId);
  }
  changeOrderToDate(){
    //this.storage.set('filterToDate',this.filterToDate);
    console.log(this.filterToDate );
    this.ViewCommandWithFilterPage.changeCriteria('toDate',this.filterToDate);
  }
  changeOrderFromDate(){
    //this.storage.set('filterFromDate',this.filterFromDate);
    console.log(this.filterFromDate );
    this.ViewCommandWithFilterPage.changeCriteria('fromDate',this.filterFromDate);
  }
  changeOrderCreateId(){
    //this.storage.set('filterUserList',JSON.stringify(this.filterUserList));
    console.log(this.filterUserList );
    this.ViewCommandWithFilterPage.changeCriteria('userIds',this.filterUserList);
  }

  lauchSearch(){
      this.ViewCommandWithFilterPage.refreshData();// return the retrive data
      this.viewCtrl.dismiss();
  }
  
  ionViewDidLoad() {
    this.ViewCommandWithFilterPage = this.navParams.get('ViewCommandWithFilterPage');
    var searchCriteria = this.navParams.get('searchCriteria');
    this.filterUserList = searchCriteria['userIds'];
    this.filterFromDate = searchCriteria['fromDate'];
    this.filterToDate = searchCriteria['toDate'];
    this.filterOrderId = searchCriteria['orderId'];
    this.filterOrderStatusList = searchCriteria['orderStatus'];
    this.filterOrderTypeList = searchCriteria['orderTypes'];
    this.storage.get('userList').then(p=>{
        this.userList = JSON.parse(p);
    });
    this.storage.get('permission').then(p=>{
      var permission = JSON.parse(p);
      this.managerPermission = false;
      if(permission!=null && permission.length>0){
       permission.forEach(val => {
         if(val.permissionCode== 'OrderModule_managerValidation'){
          this.managerPermission = true;
         }
       });
      }
      if(!this.managerPermission){
        this.storage.get('userId').then(x=>{
          this.filterUserList = [x];
          this.ViewCommandWithFilterPage.changeCriteria('userIds',this.filterUserList);
        });
      }
    });
  }

}
