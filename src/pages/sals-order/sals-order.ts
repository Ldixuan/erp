import { Component } from '@angular/core';
import { IonicPage, AlertController,NavController, NavParams,ModalController, Modal,ViewController, LoadingController, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProductModelPage } from '../product-model/product-model';
import { RestProvider} from '../../providers/rest/rest'
import { ParseSourceFile } from '@angular/compiler';
import { BaseUI } from '../../app/common/baseui';
import { Network } from '@ionic-native/network';

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
  loading = false;

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
      userId : ['Admi'],
      deptId : [''],
      status : [''],
      statusCode : 0,
      messageForAuditor : [''],
      remarkfeedback : ['']
    });
    this.depts = [];
    this.listProduct = new Array<any>();
    let title = this.navParams.get('title');
    if(title != undefined){
      this.loading = true;
      this.initOrderInfo(title);
      this.readModel = true;
    }
    this.initDepts();
  }

  initDepts(){
    this.rest.GetDeptByName(-1) // 填写url的参数
          .subscribe(
          f => {
            this.depts = f;
          },
            
          error => {
            alert(error);  
          });
  }

  initOrderInfo(title :string){
    this.rest.GetSalesOrderByOrderId(title)
        .subscribe(
          (f : any) => {
            console.log(f);
            let orderDetail = f.salesOrderDetail;
            let temp = this.orderForm.value;
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

            let productsInfo = f.cargo;
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
              this.loading = false;
            }
          },
          error => {
            alert(error);
          }
        )
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
          if(f.status == "0"){
            loading.dismiss();
            super.showToast(this.toastCtrl,"保存成功");
            if(this.readModel){
              var callback = this.navParams.get('callback');
              callback(true).then(() => {this.navCtrl.pop();});
            }else{
              this.orderForm.reset({userId : "Admi"});
              this.deptSelect = null;
              console.log(this.orderForm.value);
            }
          }else{
           // alert("保存失敗 : "+f.msg);
           super.showToast(this.toastCtrl, "保存失敗 : "+f.msg); 
          }
        },
        error => {
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
    console.log(temp);
  }

  exit() {
    this.viewCtrl.dismiss();
  }

}
