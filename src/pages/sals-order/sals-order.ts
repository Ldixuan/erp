import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, Modal } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProductModelPage } from '../product-model/product-model';
import { Title } from '@angular/platform-browser';
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
  depts: Array<{name:string}>;

  constructor(private formBuilder: FormBuilder, public modalCtrl: ModalController, public rest: RestProvider, public navParams: NavParams) {
    this.initializeDept();
    this.orderForm = this.formBuilder.group({
      title: [''],
      date: [''],
      telSender: [''],
      faxSender: [''],
      sender: [''],
      receiver: [''],
      faxReceiver: [''],
      telReceiver:[''],
      descript:[''],
      dept:['']
    });
    this.listProduct = new Array<any>();
    let infoOrder = this.navParams.get('orderData');
    if(infoOrder != undefined){
      this.orderForm.setValue(infoOrder.orderData);
      this.listProduct = infoOrder.Products;
    }

  }

  initializeDept() {
    this.depts = [
      {name : "foo"},
      {name : "bar"}
    ];
  }

  logForm() {
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
        this.listProduct[index] = data;
        return;
      }
      else if(data != undefined){
        this.listProduct.push(data);
      }
    })
    modal.present();
  }

  getDept(ev) {
    // Reset items back to all of the items
    this.initializeDept();
    

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
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
    let deptTmp = this.orderForm.value;
    deptTmp["dept"] = item.name;
    this.orderForm.setValue(deptTmp);
    this.gridShow = false;
    this.productNotFound = false;
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
