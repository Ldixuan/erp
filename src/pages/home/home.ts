import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicSelectableComponent  } from 'ionic-selectable';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login'
class Port {
  public id: number;
  public name: string;
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ports: Port[];
  port: Port;
  constructor(public navCtrl: NavController,public storage : Storage) {
    this.ports = [
      { id: 1, name: 'Tokai' },
      { id: 2, name: 'Vladivostok' },
      { id: 3, name: 'Navlakhi' }
    ];
  }
  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', this.port);
  }

  logout(){
    Promise.all([this.storage.remove("userId"),this.storage.remove("token")]).then(values => {
        this.navCtrl.setRoot(LoginPage);
    });
  }

}
