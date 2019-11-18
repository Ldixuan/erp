import { Component } from '@angular/core';
import { IonicPage, AlertController,NavController, NavParams,ModalController, Modal,ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProductModelPage } from '../product-model/product-model';
import { RestProvider} from '../../providers/rest/rest'
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
export class SalsOrderPage {

  private orderForm : FormGroup;

  listProduct : Array<any>;
  gridShow = false;
  productNotFound = false;
  depts: any;
  readModel = false;
  deptSelect : any;

  constructor(private formBuilder: FormBuilder, public viewCtrl: ViewController,
    public alerCtrl: AlertController, public modalCtrl: ModalController, public rest: RestProvider, public navParams: NavParams) {
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
      products:[''],
      userId : ['Admi'],
      deptId : [''],
      status : [''],
      messageForAuditor : ['']
    });
    this.depts = [];
    this.listProduct = new Array<any>();
    let title = this.navParams.get('title');
    if(title != undefined){
      this.initOrderInfo(title);
      this.readModel = true;
    }
    this.initDepts();

  }

  initDepts(){
    this.rest.GetDeptByName(-1) // 填写url的参数
          .subscribe(
          f => {
            console.log(f);
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
            let orderDetail = f.salesOrderDetail;
            let temp = this.orderForm.value;
            temp.title = orderDetail.commandeId;
            temp.date = orderDetail.commandeCreateDate;
            temp.telSender = orderDetail.senderTelephoneNumber;
            temp.faxReceiver = orderDetail.senderFax;
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
                typePriceProduct: "",
                datePayProduct:"",
                hadPaidProduct:"",
                descriptProduct:""
              };
              productTemp['idProduct'] = productsInfo[index].cargoId;
              productTemp['nameProduct'] = productsInfo[index].cargoName;
              productTemp['numberProduct'] = productsInfo[index].cargoQuantity;
              productTemp['unitProduct'] = productsInfo[index].cargoUnit;
              productTemp['priceProduct'] = productsInfo[index].cargoUnitPrice;
              productTemp['datePayProduct'] = productsInfo[index].scheduleCargoDate;
              productTemp['adresseProduct'] = "";
              productTemp['nameOffical'] = "";
              productTemp['typePriceProduct'] = "";
              productTemp['hadPaidProduct'] = "";
              productTemp['descriptProduct'] = "";
              this.listProduct.push(productTemp);
            }
          },
          error => {
            alert(error);
          }
        )
  }

  removeOrder(){
    let confirm = this.alerCtrl.create({
      title: '提示',
      message: '确认删除此订单吗?',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.viewCtrl.dismiss({action:1, content : {}});
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


  logForm() {
    let dataTmp = this.orderForm.value;
    dataTmp.products = this.listProduct;
    this.orderForm.setValue(dataTmp);
    if(this.readModel){
      this.viewCtrl.dismiss({action: 2, content : this.orderForm.value})
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
