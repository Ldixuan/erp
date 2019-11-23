import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, LoadingController } from 'ionic-angular';
import { BaseUI } from '../../app/common/baseui';
import { Network } from '@ionic-native/network';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home'


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {
  userList : any = [];
  selectedUserId : string;
  password : string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public network : Network,
              public rest : RestProvider,
              public toastCtrl : ToastController,
              public viewCtrl : ViewController,
              public storage : Storage,
              public loadingCtrl: LoadingController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewDidEnter(){
    var userId;
    var token;
    Promise.all([this.storage.get("userId"), this.storage.get("token")]).then(values => {
      userId = values[0];
      token = values[1];

      if( userId != null || token !=null){
        this.navCtrl.setRoot(HomePage);
      }
      else{
        if(this.network.type !='none'){//todo: add the waiting
          this.rest.GetUserList() // 填写url的参数
          .subscribe(
          (f : any) => {
            this.userList = f["Data"];
          },
          error => {
            alert(error);//TODO remove
          });
        }
        else{
            super.showToast(this.toastCtrl, "您处于离线状态，请连接网络!");
        }
      }
    });
  }

  login(){
    if(this.network.type !='none'){
      if(this.selectedUserId!=null && this.password!=null && this.selectedUserId !=''&& this.password !=''){
       var userTosend = this.userList.filter(p=>p.id == this.selectedUserId);
       var user={} ;
       if(userTosend!=null && userTosend[0]!=null){
         user["Password"] = this.password;
         user["Id"] = userTosend[0].id;
         user["Username"] = userTosend[0].username;
         var loading = super.showLoading(this.loadingCtrl,"请稍等");
         this.rest.Login(user) // 填写url的参数
         .subscribe(
         (f : any) => {
           loading.dismiss();
           if(f["Success"]==true){
            this.storage.set("userId",userTosend[0].id);
            this.storage.set("token",f["Data"].token);
            this.navCtrl.setRoot(HomePage);
           }
           else{
             super.showToast(this.toastCtrl,"登录失败，请检查用户名与密码是否正确");
           }
         },
         error => {
           alert(error);//TODO remove
         });
        }
        else{
          super.showToast(this.toastCtrl,"请输入正确的账号及密码");
        }
       }
    
    }
    else{
      super.showToast(this.toastCtrl, "您处于离线状态，请连接网络!");
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
