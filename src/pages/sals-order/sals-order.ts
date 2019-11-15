import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, Modal,ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProductModelPage } from '../product-model/product-model';
import { Title } from '@angular/platform-browser';
import { RestProvider} from '../../providers/rest/rest'
import { Action } from 'rxjs/scheduler/Action';

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
  depts: Array<{id : string, name:string}>;
  readModel = false;

  constructor(private formBuilder: FormBuilder, public viewCtrl: ViewController, public modalCtrl: ModalController, public rest: RestProvider, public navParams: NavParams) {
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
      userId : ['Admi']
    });
    this.depts = [];
    this.listProduct = new Array<any>();
    let title = this.navParams.get('title');
    if(title != undefined){
      let infoOrder = this.get(title);
      this.orderForm.setValue(infoOrder.orderData);
      this.listProduct = infoOrder.Products;
      this.readModel = true;
    }

  }

  get(title :string):any{
    return {};
  }

  removeOrder(){
    this.viewCtrl.dismiss({action:1, content : {}});
  }


  logForm() {
    let dataTmp = this.orderForm.value;
    dataTmp.products = this.listProduct;
    this.orderForm.setValue(dataTmp);
    if(this.readModel){
      this.viewCtrl.dismiss({action: 2, content : this.orderForm.value})
    }
    console.log(this.orderForm.value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalsOrderPage');
  }

  presentModal(infoProduct?, index?) {
    let modal;
    console.log(infoProduct);
    if(infoProduct == undefined){
      modal = this.modalCtrl.create(ProductModelPage);
    }else{
      modal = this.modalCtrl.create(ProductModelPage, {infoProduct : infoProduct});
    }
    modal.onDidDismiss(data => {
      if(index != undefined){
        if(data.action == 1){
          this.listProduct[index] = data.content;
        }else if(data.action == 0){
          this.listProduct.splice(index, 1);
        }
        return;
      }
      else if(data != undefined){
        this.listProduct.push(data.content);
      }
    })
    modal.present();
  }

  getDept(ev) {
    // Reset items back to all of the items


    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.rest.GetDeptByName(val) // 填写url的参数
          .subscribe(
          f => {
            this.depts = f;
          },
          error => {
            this.depts = [{id : "-1", name:"请求错误"}];
          });
      
      if(this.depts.length > 0){
        this.gridShow = true;
      }
      else{
        this.gridShow = false;
      }
    }
    console.log(this.gridShow);
  }

  selectDept(item){
    if(item.id != "-1"){
      let deptTmp = this.orderForm.value;
      deptTmp["dept"] = item.name;
      this.orderForm.setValue(deptTmp);
      this.gridShow = false;
      this.productNotFound = false;
    }
  }

  endInputDept(ev){
    const val = ev.target.value;
    if(val == ""){
      this.gridShow = false;
    }
    for (let index = 0; index < this.depts.length; index++) {
      if(val == this.depts[index].name){
        let deptTmp = this.orderForm.value;
        deptTmp["nameProduct"] = this.depts[index].name;
        this.orderForm.setValue(deptTmp);
        this.gridShow = false;
        return;
      }
    }

    this.productNotFound = true;
  }

}
