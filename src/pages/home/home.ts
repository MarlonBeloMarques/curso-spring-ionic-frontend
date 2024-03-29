import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciasDTO } from '../../models/credencias.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciasDTO = {
    email: "",
    senha: ""
  }

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService) {

  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidEnter(){
    this.auth.refreshToken()
    .subscribe(res => {
      this.auth.successfulLogin(res.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  login(){
    this.auth.authenticate(this.creds)
    .subscribe(res => {
      this.auth.successfulLogin(res.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }

}
