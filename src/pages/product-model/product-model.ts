import { Component } from '@angular/core';
import { IonicPage, AlertController, NavParams,ViewController} from 'ionic-angular';
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
  products: any;
  gridShow = false;
  productNotFound = false;
  private productForm : FormGroup;
  modifMod = false;
  
  

  constructor(public viewCtrl: ViewController, private formBuilder: FormBuilder, 
    public navParams: NavParams, public rest: RestProvider,public alerCtrl: AlertController) {

    this.productForm = this.formBuilder.group({
      idProduct: [''],
      nameProduct: ['', Validators.required],
      adresseProduct: [''],
      nameOffical: [''],
      numberProduct: ['', Validators.required],
      unitProduct: ['', Validators.required],
      priceProduct: ['', Validators.required],
      typePriceProduct: [''],
      amount:['', Validators.required],
      datePayProduct:['',Validators.required],
      hadPaidProduct:[''],
      descriptProduct:['']
    });

    this.products = [];

    let infoProduct = this.navParams.get('infoProduct');
    if(infoProduct != undefined){
      this.productForm.setValue(infoProduct);
      this.modifMod = true;
    }
  }

  onBlur(event){
    const val = event.target.value;
    //this.gridShow = false;
    if (val == '') {
      this.gridShow = false;
    }
    if(val == this.products[0].name){
      this.gridShow = false;
    }
  }


  exit() {
    this.viewCtrl.dismiss();
  }

  logProductForm() {
    this.viewCtrl.dismiss({action : 1, content : this.productForm.value});
  }

  removeProduct(){
    let confirm = this.alerCtrl.create({
      title: '提示',
      message: '确认删除此商品吗?',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.viewCtrl.dismiss({action : 0, content : {}});
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


  getProduct(ev) {
    const val = ev.target.value;

    ev.stopPropagation();

    if (val && val.trim() != '') {

      this.rest.GetCargoByName(val,5) // 填写url的参数
          .subscribe(
          (f : any) => {
            this.products = f;
            console.log(this.products);
            if(this.products.length > 0){
              this.gridShow = true;
            }
          },
          error => {
            this.products = [{id:'-1', name:"请求错误",unit:"", typePrice:""}];
          });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductModelPage');
  }

  selectProduct(item){
    if(item.id != '-1'){
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
    console.log(val);
    
    for (let index = 0; index < this.products.length; index++) {
      if(val == this.products[index].name){
        let productTmp = this.productForm.value;
        productTmp["nameProduct"] = this.products[index].name;
        productTmp["unitProduct"] = this.products[index].unit;
        productTmp["typePriceProduct"] = this.products[index].typePrice;
        this.productForm.setValue(productTmp);
        this.productNotFound = false;
        return;
      }
    }

    this.productNotFound = true;
  }
}
