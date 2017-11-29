import { Component, Input } from '@angular/core';
import { ShoppingItem } from '../../models/shopping-item';
import { ActionSheetController } from 'ionic-angular';


/**
 * Generated class for the ShoppingItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'shopping-item',
  templateUrl: 'shopping-item.html'
})
export class ShoppingItemComponent {

  @Input() private item: ShoppingItem;

  constructor(private actionCtrl: ActionSheetController) {
    
  }

  private showOptions() : void {
    const optionsSheet = this.actionCtrl.create({
      title: "Options",
      buttons: [
        {
          text: "Edit",
          handler: () => {this.edit()},
          cssClass: "sheet-button edit-button",
        },
        {
          text: "Change Quantity",
          handler: () => {this.changeQuantity()},
          cssClass: "sheet-button qty-button",
        },
        {
          text: "Delete",
          handler: () => {this.delete()},
          cssClass: "sheet-button delete-button",
        },
      ],
      cssClass: "sheet options-sheet"
    });

    optionsSheet.present();
  }

  private edit() : void {
    console.log("Edit");
  }

  private changeQuantity() : void {
    console.log("Change Quantity");
  }

  private delete() : void {
    console.log("Delete");
  }

}
