import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { permission } from '../../providers/constants/constants'
/**
 * Generated class for the MyInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-info',
  templateUrl: 'my-info.html',
})
export class MyInfoPage {
  permissionList= [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage : Storage) {
  }

  ionViewDidLoad() {
      this.storage.get('permission').then(p=>{
        var Permission = JSON.parse(p);

        if(permission!=null && Permission.length>0){
          Permission.forEach(val => {
           if(val.permissionCode== 'OrderModule_financialValidation'){
            this.permissionList.push(permission.financialPermission.label);
           }
           if(val.permissionCode== 'OrderModule_managerValidation'){
            this.permissionList.push(permission.managerPermission.label);
           }
           else{
            this.permissionList.push('普通权限');
           }
         });
        }
      });
  }

}
