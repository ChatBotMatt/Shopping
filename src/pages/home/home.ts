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

  private async addItem() {
    console.log("Test");
    let newItem: ShoppingItem = {} as ShoppingItem;
    let data: any = await this.showEditAlert("", 0,0,);
    newItem.quantity = data.qty;
    newItem.name = data.name;
    newItem.warningQuantity = data.warningQty;

    this.pantry.push(newItem);
  }

  /**
   * Handles emitted events from the ShoppingItem components.
   * @param data The data emitted from the component.
   */
  private async handle(data) {

    let item = this.pantry.filter(checkItem => checkItem.name == data.itemName)[0];
    
    switch (data.type) {
      case "edit":
        let data: any = await this.edit(item.name, item.quantity, item.warningQuantity);

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
   * Handles the editing of an item. 
   * Displays an alert with an input field for it, returns the edited form of the data.
   * 
   * @param name The item's name to use as an initial value.
   * @param qty The item's quantity to use as an initial value.
   * @param warningQty The item's warning quantity to use as an initial value.
   * 
   * @param namePlaceholder The placeholder for the name input. Optional, default value of "Item Name".
   * @param qtyPlaceholder The placeholder for the quantity input. Optional, default value of "Item Quantity".
   * @param warningPlaceholder The placeholder for the warning quantity input. Optional, default value of "Item Warning Quantity".
   * 
   * @return The edited data.
   */
  private async edit(
    name: string, 
    qty: number,
    warningQty: number,

    namePlaceholder?: string, 
    qtyPlaceholder?: string, 
    warningPlaceholder?: string
  ): Promise<Object> {
    let data: any = await this.showEditAlert(name, qty, warningQty, namePlaceholder, qtyPlaceholder, warningPlaceholder);
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
   * @param name The item's name to use as an initial value.
   * @param qty The item's quantity to use as an initial value.
   * @param warningQty The item's warning quantity to use as an initial value.
   * 
   * @param namePlaceholder The placeholder for the name input. Default value of "Item Name".
   * @param qtyPlaceholder The placeholder for the quantity input. Default value of "Item Quantity".
   * @param warningPlaceholder The placeholder for the warning quantity input. Default value of "Item Warning Quantity".
   * 
   * @return The data from the user input wrapped in a promise.
   */
  private showEditAlert(
    name: string, 
    qty: number,
    warningQty: number,
    namePlaceholder: string = "Item Name", 
    qtyPlaceholder: string = "Item Quantity", 
    warningPlaceholder: string = "Item Warning Quantity"
  ) {
    return new Promise((resolve, reject) => this.utility.showAlert(
        "",
        "Edit",
        [{
          text: "submit",
          handler: (data) => {return resolve(data)},
          cssClass: "shopping-alert-button submit-button"
        }],
        [
          {
            name: "name",
            type: "text",
            placeholder: namePlaceholder,
            value: name,
          },
          {
            name: "qty",
            type: "number",
            placeholder: qtyPlaceholder,
            value: qty,
          },
          {
            name: "warningQty",
            type: "number",
            placeholder: warningPlaceholder,
            value: warningQty,
          },
        ],
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