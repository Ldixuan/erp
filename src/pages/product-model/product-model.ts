import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider} from '../../providers/rest/rest'

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
  
  

  constructor(public viewCtrl: ViewController, private formBuilder: FormBuilder, public navParams: NavParams, public rest: RestProvider) {

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

    this.products = [];

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


  getProduct(ev) {
    const val = ev.target.value;

    if (val && val.trim() != '') {

      this.rest.GetCargoByName(val,5) // 填写url的参数
          .subscribe(
          f => {
            console.log(f);
          },
          error => {
            this.products = [{id:-1, name:"请求错误",unit:"", typePrice:""}];
          });

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
    if(item.id != -1){
      let productTmp = this.productForm.value;
      productTmp["nameProduct"] = item.name;
      productTmp["unitProduct"] = item.unit;
      productTmp["typePriceProduct"] = item.typePrice;
      this.productForm.setValue(productTmp);
      this.gridShow = false;
      this.productNotFound = false;
    }
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
