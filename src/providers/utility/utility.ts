import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/*
  Generated class for the UtilityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilityProvider {

  constructor(public http: HttpClient, private alertCtrl: AlertController) {
    
  }

  /**
   * A method to show a generic alert based on the options passed in.
   * 
   * @param message The message to display.
   * @param title The alert's title. Optional.
   * @param buttons The buttons to show. Optional.
   * @param inputs The inputs to show. Optional.
   * @param cssClasses An array of CSS classes to apply to the Alert, optional. 
   *  Will be appended to the default class of "shopping-alert"
   *  Note: Classes that are empty or contain spaces will be annoyed.
   */
  public async showAlert(
    message: string, 
    title: string = "", 
    buttons: Object[] = [], 
    inputs: Object[] = [], 
    cssClasses: string[] = []
  ){
    let alertCSSClass: string = "shopping-alert";
    cssClasses.forEach((cssClass) => {
      if (cssClass.length > 0 && (cssClass.includes(" "))) {
        alertCSSClass += ", " + cssClass;
      }
    });
    return await this.alertCtrl.create({
      message: message,
      title: title,
      buttons: buttons,
      inputs: inputs,
      cssClass: alertCSSClass,
    }).present();
  }

}
