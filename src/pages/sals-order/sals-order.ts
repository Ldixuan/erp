import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, Modal } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProductModelPage } from '../product-model/product-model';
import { Title } from '@angular/platform-browser';

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

  private todo : FormGroup;

  listProduct : Array<any>;

  constructor(private formBuilder: FormBuilder, public modalCtrl: ModalController) {
    this.todo = this.formBuilder.group({
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

  }

  logForm() {
    console.log(this.todo.value);
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

}
