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
  products: Array<{id:number, name:string, unit : string, typePrice : string}>;
  gridShow = false;
  productNotFound = false;
  private productForm : FormGroup;
  
  

  constructor(public viewCtrl: ViewController, private formBuilder: FormBuilder, public navParams: NavParams) {
    this.initializeProduct();

    this.productForm = this.formBuilder.group({
      nameProduct: ['', Validators.required],
      adresseProduct: [''],
      nameOffical: [''],
      numberProduct: ['', Validators.required],
      unitProduct: ['', Validators.required],
      priceProduct: ['', Validators.required],
      typePriceProduct: [''],
      amount:['', Validators.required],
      datePayProduct:[''],
      hadPaidProduct:[''],
      descriptProduct:['']
    });

    let infoProduct = this.navParams.get('infoProduct');
    if(infoProduct != undefined){
      this.productForm.setValue(infoProduct);
    }
  }


  exit() {
    this.viewCtrl.dismiss();
  }

  logProductForm() {
    this.viewCtrl.dismiss(this.productForm.value);
  }

  initializeProduct() {
    this.products = [
      {id : 1, name : "foo", unit : "码", typePrice : "米价"},
      {id : 2, name : "bar", unit : "码", typePrice : "米价"}
    ];
  }

  getProduct(ev) {
    // Reset items back to all of the items
    this.initializeProduct();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.products = this.products.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      if(this.products.length > 0){
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

  selectProduct(item){
    let productTmp = this.productForm.value;
    productTmp["nameProduct"] = item.name;
    productTmp["unitProduct"] = item.unit;
    productTmp["typePriceProduct"] = item.typePrice;
    this.productForm.setValue(productTmp);
    this.gridShow = false;
    this.productNotFound = false;
  }

  endInputProduct(ev){
    const val = ev.target.value;
    if(val == ""){
      this.gridShow = false;
    }
    for (let index = 0; index < this.products.length; index++) {
      if(val == this.products[index].name){
        let productTmp = this.productForm.value;
        productTmp["nameProduct"] = this.products[index].name;
        productTmp["unitProduct"] = this.products[index].unit;
        productTmp["typePriceProduct"] = this.products[index].typePrice;
        this.productForm.setValue(productTmp);
        this.gridShow = false;
        return;
      }
    }

    this.productNotFound = true;
  }
}
