import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the ProductModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-model',
  templateUrl: 'product-model.html',
})
export class ProductModelPage {

  searchQuery: string = '';
  items: Array<{id:number, name:string, unit : string, typePrice : string}>;
  gridShow = false;
  productNotFound = false;
  private product : FormGroup;
  inputNameProduct : string;
  inputUnit : string;
  selectTypePrice : string;
  
  

  constructor(public viewCtrl: ViewController, private formBuilder: FormBuilder) {
    this.initializeItems();

    this.product = this.formBuilder.group({
      nameProduct: [''],
      adresseProduct: [''],
      nameOffical: [''],
      numberProduct: [''],
      unitProduct: [''],
      priceProduct: [''],
      typePriceProduct: [''],
      amount:[''],
      datePayProduct:[''],
      hadPaidProduct:[''],
      descriptProduct:['']
    });
  }


  exit() {
    this.viewCtrl.dismiss();
  }

  logProductForm() {
    this.viewCtrl.dismiss(this.product.value);
  }

  initializeItems() {
    this.items = [
      {id : 1, name : "foo", unit : "码", typePrice : "米价"},
      {id : 2, name : "bar", unit : "码", typePrice : "米价"}
    ];
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      if(this.items.length > 0){
        this.gridShow = true;
      }
      else{
        this.gridShow = false;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductModelPage');
  }

  select(item){
    this.inputNameProduct = item.name;
    this.inputUnit = item.unit;
    this.selectTypePrice = item.typePrice;
    this.gridShow = false;
    this.productNotFound = false;
  }

  endInputProduct(ev){
    const val = ev.target.value;
    if(val == ""){
      this.gridShow = false;
    }
    for (let index = 0; index < this.items.length; index++) {
      if(val == this.items[index].name){
        this.productNotFound = false;
        this.inputUnit = this.items[index].unit;
        this.selectTypePrice = this.items[index].typePrice;
        this.gridShow = false;
        return;
      }
    }

    this.productNotFound = true;
  }
}
