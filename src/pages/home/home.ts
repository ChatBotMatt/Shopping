import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PantryMock } from '../../mocks/shopping-item'
import { ShoppingItem } from '../../models/shopping-item'

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private pantry: ShoppingItem[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pantry = PantryMock;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
