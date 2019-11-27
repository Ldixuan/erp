import { Component } from '@angular/core';
import { IonicPage, AlertController,NavController, NavParams,ModalController, Modal,ViewController, LoadingController, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProductModelPage } from '../product-model/product-model';
import { RestProvider} from '../../providers/rest/rest'

import { BaseUI } from '../../app/common/baseui';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';
import { ReadSalsOrderCategoriesPage } from '../read-sals-order-categories/read-sals-order-categories'

/**
 * Generated class for the SalsOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-sals-order',
  templateUrl: 'sals-order.html',
})
export class SalsOrderPage extends BaseUI{

  private orderForm : FormGroup;
  listProduct : Array<any>;
  gridShow = false;
  productNotFound = false;
  depts: any;
  readModel = false;
  deptSelect : any;
  orderId ="";
  constructor(
    private formBuilder: FormBuilder, 
    public viewCtrl: ViewController,
    public alerCtrl: AlertController, 
    public modalCtrl: ModalController, 
    public rest: RestProvider, 
    public navParams: NavParams,
    public loadingCtrl : LoadingController,
    public toastCtrl : ToastController,
    public navCtrl : NavController,
    public storage : Storage,
    public network: Network) {
      super();
    this.orderForm = this.formBuilder.group({
      title: [''],
      date: ['', Validators.required],
      telSender: [''],
      faxSender: [''],
      sender: [''],
      receiver: [''],
      faxReceiver: [''],
      telReceiver:[''],
      descript:[''],
      dept:['', Validators.required],
      userId : [''],
      deptId : [''],
      status : [''],
      statusCode : 0,
      messageForAuditor : [''],
      remarkfeedback : [''],
      type:['O'] //'I': 采购 'O': 销售
    });
    this.depts = [];
    this.listProduct = new Array<any>();

    this.storage.get("userId").then((val) => {
      var temp = this.orderForm.value;
      temp.userId = val;
      this.orderForm.setValue(temp);
    });
    let title = this.navParams.get('title');
    if(title != undefined){
      this.initOrderInfo(title);
      this.readModel = true;
    }
    this.initDepts();
  }

  initDepts(){
    if(this.network.type !='none'){
      this.rest.GetDeptByName(-1) // 填写url的参数
            .subscribe(
            f => {
              if(f.Success){
                this.depts = f.Data;
              }else{
                super.showToast(this.toastCtrl, f.Msg);
              }
            },
            error => {
              alert(error); //todo :    super.showToast(this.toastCtrl,"保存成功");
            });
    }
    else{
      super.showToast(this.toastCtrl, "您处于离线状态，请连接网络! "); 
    }
  }

  initOrderInfo(title :string){
    var loading =  super.showLoading(this.loadingCtrl,"加载中...");
    if(this.network.type !='none'){
      this.rest.GetSalesOrderByOrderId(title)
          .subscribe(
            (f : any) => {
              if(f.Success){
                let orderDetail = f.Data.salesOrderDetail;
                let temp = this.orderForm.value;
                this.orderId =orderDetail.commandeId;
                temp.title = orderDetail.commandeId;
                temp.date = orderDetail.commandeCreateDate;
                temp.telSender = orderDetail.senderTelephoneNumber;
                temp.faxSender = orderDetail.senderFax;
                temp.sender = orderDetail.sender;
                temp.receiver = orderDetail.receiver;
                temp.faxReceiver = orderDetail.receiverFax;
                temp.telReceiver = orderDetail.receiverTelephoneNumber;
                temp.descript = orderDetail.Remark1 + orderDetail.Remark2 + orderDetail.Remark3
                + orderDetail.Remark4 + orderDetail.Remark5 + orderDetail.Remark6 + orderDetail.Remark7;
                temp.dept = orderDetail.departmentLabel;
                temp.userId = orderDetail.commandCreator;
                temp.deptId = orderDetail.departmentId;
                temp.status = orderDetail.status;
                temp.messageForAuditor = orderDetail.messageForAuditor;
                temp.statusCode = orderDetail.statusCode || 0;
                temp.remarkfeedback = orderDetail.remarkfeedback;
                this.orderForm.setValue(temp);

                this.deptSelect = {id : orderDetail.departmentId, name:orderDetail.departmentLabel};

                let productsInfo = f.Data.cargo;
                for (let index = 0; index < productsInfo.length; index++) {
                  let productTemp = {
                    idProduct: "",
                    nameProduct: "",
                    adresseProduct: "",
                    nameOffical: "",
                    numberProduct: "",
                    unitProduct: "",
                    priceProduct: "",
                    datePayProduct:"",
                    hadPaidProduct:"",
                    descriptProduct:""
                  };
                  productTemp['idProduct'] = productsInfo[index].cargoId;
                  productTemp['nameProduct'] = productsInfo[index].cargoName;
                  productTemp['numberProduct'] = productsInfo[index].cargoQuantity || 0;
                  productTemp['unitProduct'] = productsInfo[index].cargoUnit;
                  productTemp['priceProduct'] = productsInfo[index].cargoUnitPrice || 0;
                  productTemp['datePayProduct'] = productsInfo[index].scheduleCargoDate;
                  productTemp['adresseProduct'] = "";
                  productTemp['nameOffical'] = "";
                  productTemp['hadPaidProduct'] = "";
                  productTemp['descriptProduct'] = "";
                  this.listProduct.push(productTemp);
                }
              }else{
                super.showToast(this.toastCtrl, f.Msg);
              }
              loading.dismiss();
            },
            error => {
              loading.dismiss();
              alert(error); //TODO change to toast
            }
          );
    }
    else{
      super.showToast(this.toastCtrl, "您处于离线状态，请连接网络! "); 
    }
  }


  logForm() {
    if(this.listProduct.length == 0){
      super.showToast(this.toastCtrl, "请添加货物");
      return;
    }
    let confirm = this.alerCtrl.create({
      title: '提示',
      message: '确认保存此订单吗?',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.saveOrder();
          }
        },
        {
          text: '取消',
          handler: () => {
          }
        }
      ]
    });
    confirm.present()
  }

  saveOrder(){
    
    var loading =  super.showLoading(this.loadingCtrl,"正在保存，请稍等");
    if(this.network.type !='none'){
      this.rest.InsertSalesOrderByOrderId(this.orderForm.value, this.listProduct)
      .subscribe(
        f => {
          if(f.Success){
            super.showToast(this.toastCtrl,"保存成功");
          /*   if(this.readModel){
              var callback = this.navParams.get('callback');
              callback(true).then(() => {this.navCtrl.pop();});
            }else{
              this.navCtrl.setRoot(SalsOrderPage);
            } */
            this.navCtrl.setRoot(ReadSalsOrderCategoriesPage);
          }else{
           // alert("保存失敗 : "+f.msg);
           super.showToast(this.toastCtrl, "保存失敗 : "+f.Msg); 
          }
          loading.dismiss();
        },
        error => {
          loading.dismiss();
          super.showToast(this.toastCtrl, "保存失敗 : "+error); //TODO: cannot show the detail information for the user
        }
      )
    }
    else{
      super.showToast(this.toastCtrl, "您处于离线状态，请连接网络! "); 
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalsOrderPage');
  }

  presentModal(infoProduct?, index?) {
    let modal;
    if(infoProduct == undefined){
      modal = this.modalCtrl.create(ProductModelPage);
    }else{
      modal = this.modalCtrl.create(ProductModelPage, {infoProduct : infoProduct});
    }
    modal.onDidDismiss(data => {
      if(index != undefined){
        if(data != undefined){
          if(data.action == 1){
            this.listProduct[index] = data.content;
          }else if(data.action == 0){
            this.listProduct.splice(index, 1);
          }
        }
      }
      else if(data != undefined){
        this.listProduct.push(data.content);
      }
    })
    modal.present();
  }

  changeDept(){
    let temp = this.orderForm.value;
    temp.deptId = this.deptSelect.id;
    temp.dept = this.deptSelect.name;
    this.orderForm.setValue(temp); 
    console.log(temp); // TODO remove
  }

  valideSalesOrder(){
    var commandeId = this.orderId
    if(commandeId!=null&&commandeId!=""&&this.readModel){
      var loading =  super.showLoading(this.loadingCtrl,"正在提交，请稍等");
      if(this.network.type !='none'){
        this.rest.UpdateSalesOrderStatut(commandeId, "1")//1: 提交到财务
        .subscribe(
          f => {
            if(f.Success){
              super.showToast(this.toastCtrl,"提交成功");
              if(this.readModel){
                //var callback = this.navParams.get('callback');
                //callback(true).then(() => {this.navCtrl.pop();});
                this.navCtrl.setRoot(ReadSalsOrderCategoriesPage);
              }else{
                this.navCtrl.setRoot(SalsOrderPage);
              }
            }else{
             // alert("保存失敗 : "+f.msg);
             super.showToast(this.toastCtrl, "提交失敗 : "+f.Msg); 
            }
            loading.dismiss();
          },
          error => {
            loading.dismiss();
            super.showToast(this.toastCtrl, "提交失敗 : "+error); //TODO: cannot show the detail information for the user
          }
        )
      }
      else{
        super.showToast(this.toastCtrl, "您处于离线状态，请连接网络! "); 
      }
    }
  }

  exit() {
    this.viewCtrl.dismiss();
  }

}
