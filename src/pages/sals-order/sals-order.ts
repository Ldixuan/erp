import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProductModelPage } from '../product-model/product-model';

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

  constructor(private formBuilder: FormBuilder, public modalCtrl: ModalController) {
    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      date: [''],
      telSender: [''],
      faxSender: [''],
      sender: [''],
      receiver: [''],
      faxReceiver: [''],
      telReceiver:[''],
      descript:['']
    });

  }

  logForm() {
    console.log(this.todo.value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalsOrderPage');
  }

  presentModal() {
    const modal = this.modalCtrl.create(ProductModelPage);
    modal.onDidDismiss(data => {
      console.log(data)
    })
    modal.present();
  }

}
