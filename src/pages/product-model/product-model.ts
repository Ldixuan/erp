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
  productSelect : any;
  
  

  constructor(public viewCtrl: ViewController, private formBuilder: FormBuilder, 
    public navParams: NavParams, public rest: RestProvider,public alerCtrl: AlertController) {
    
    this.initProducts();
    this.productForm = this.formBuilder.group({
      idProduct: [''],
      nameProduct: ['', Validators.required],
      adresseProduct: [''],
      nameOffical: [''],
      numberProduct: ['', Validators.required],
      unitProduct: ['', Validators.required],
      priceProduct: ['', Validators.required],
      typePriceProduct: [''],
      datePayProduct:['',Validators.required],
      hadPaidProduct:[''],
      descriptProduct:['']
    });

    this.products = [];

    let infoProduct = this.navParams.get('infoProduct');
    if(infoProduct != undefined){
      this.productForm.setValue(infoProduct);
      this.productSelect = {
        id:infoProduct.idProduct,
        name:infoProduct.nameProduct,
        unit:infoProduct.unitProduct,
        typePrice:infoProduct.typePriceProduct
      };
      this.modifMod = true;
    }
  }

  initProducts(){
    this.rest.GetCargoByName(-1) // 填写url的参数
          .subscribe(
          (f : any) => {
            this.products = f;
            console.log(this.products);
          },
          error => {
            alert(error);
          });
  }

  changeProduct(){
    let productTmp = this.productForm.value;
      productTmp["nameProduct"] = this.productSelect.name;
      productTmp["unitProduct"] = this.productSelect.unit;
      productTmp["typePriceProduct"] = this.productSelect.typePrice;
      this.productForm.setValue(productTmp);
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductModelPage');
  }


}
