import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PantryMock } from '../../mocks/shopping-item'
import { ShoppingItem } from '../../models/shopping-item'
import { UtilityProvider } from '../../providers/utility/utility';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private pantry: ShoppingItem[];

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams, 
    private utility: UtilityProvider,
    private alertCtrl: AlertController,
  ) {
    this.pantry = Array.from(new Set(PantryMock)); //Filter out duplicates
  }

  /**
   * Handles emitted events from the ShoppingItem components.
   * @param data The data emitted from the component.
   */
  private async handle(data) {

    let item = this.pantry.filter(checkItem => checkItem.name == data.itemName)[0];
    
    switch (data.type) {
      case "edit":
        let data: any = await this.edit(item);

        item.quantity = data.qty;
        item.name = data.name;
        item.warningQuantity = data.warningQty;
        break;

      case "delete":
        let deleteItem = await this.delete(item.name);
        if (deleteItem) {
          this.pantry = this.pantry.filter(checkItem => checkItem != item);
        }
        break;
    }
  }

  /**
   * Handles the editing of an item. Displays an alert with an input field for it, and edits the item in the pantry.
   * @param item The item to edit.
   */
  private async edit(item: ShoppingItem): Promise<Object> {
    let data: any = await this.showEditAlert(item);
    return data;
  }

  /**
   * Displays an alert to the user asking if they really want to delete the item or not.
   * @param name The item-to-delete's name.
   */
  private async delete(name: string): Promise<boolean> {
    let deleteItem: any = await this.showDeleteAlert(name);
    return deleteItem;  
  }

    /**
   * Shows the Edit Alert, which displays data for the user to edit as they wish.
   * @param item The item to edit. Used to populate the input fields initially, but not modified.
   * @return The data from the user input wrapped in a promise.
   */
  private showEditAlert(item: ShoppingItem) {
    return new Promise((resolve, reject) => this.utility.showAlert(
        "",
        "Edit",
        [{
          text: "submit",
          handler: (data) => {return resolve(data)},
          cssClass: "shopping-alert-button"
        }],
        [
          {
            name: "name",
            type: "text",
            value: item.name,
            placeholder: "New Name",
          },
          {
            name: "qty",
            type: "number",
            value: item.quantity,
            placeholder: "New Quantity",
          },
          {
            name: "warningQty",
            type: "number",
            value: item.warningQuantity,
            placeholder: "New Warning Quantity",
          },
        ]
      ));
  }

  private showDeleteAlert(name: string) {
    return new Promise((resolve, reject) => this.utility.showAlert(
      `Are you sure you want to delete the item ${name}?`,
      `Delete ${name}?`,
      [
        {
          text: "Yes, delete it.",
          handler: () => {return resolve(true)},
          cssClass: "shopping-alert-button delete-button"
        },
        {
          text: "No, keep it.",
          handler: () => {return resolve(false)},
          cssClass: "shopping-alert-button submit-button"
        }
      ]
    ));
  }

}