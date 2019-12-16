import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
username : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage :Storage) {
  }

  ionViewDidLoad() {
    this.storage.get('username').then(p=>this.username=p);
  }
  logout(){
    Promise.all([this.storage.remove("userId"),this.storage.remove("token")]).then(values => {
        this.navCtrl.setRoot('LoginPage');
    });
  }
  newFunctionality(){
      this.navCtrl.push('NewFunctionalityPage');
  }
  showSalesOrder(){
    this.navCtrl.push('ReadSalsOrderCategoriesPage',{
      commandTypeLabel:'销售',
      commandTypeId  : 'O'
    });
  }
  showPurcharseOrder(){
    this.navCtrl.push('ReadSalsOrderCategoriesPage',{
      commandTypeLabel:'采购',
      commandTypeId  : 'I'
    });
  }
  editOrder(){
    this.navCtrl.push('SalsOrderPage');
  }
  valideOrder(){
    
  }
}
