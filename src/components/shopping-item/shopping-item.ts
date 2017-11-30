import { Component, Input, Output } from '@angular/core';
import { ShoppingItem } from '../../models/shopping-item';
import { ActionSheetController } from 'ionic-angular';
import { UtilityProvider } from '../../providers/utility/utility';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'shopping-item',
  templateUrl: 'shopping-item.html'
})
export class ShoppingItemComponent {

  @Input() private item: ShoppingItem;
  @Output() private emit: EventEmitter<Object>;

  constructor(private actionCtrl: ActionSheetController, private utility: UtilityProvider) {
    this.emit = new EventEmitter<string>();
  }

  private showOptions() {

    const optionsSheet = this.actionCtrl.create({
      title: "Options",
      buttons: [
        {
          text: "Edit",
          handler: () => {
            this.emit.emit({
              type: "edit", 
              itemName: this.item.name
            })
          },
          cssClass: "sheet-button edit-button",
        },
        
        {
          text: "Delete",
          handler: () => {
            this.emit.emit({
              type: "delete", 
              itemName: this.item.name
            })
          },
          cssClass: "sheet-button delete-button",
        },
      ],
      cssClass: "sheet options-sheet"
    });

    let data = optionsSheet.present();
      
  }

}
