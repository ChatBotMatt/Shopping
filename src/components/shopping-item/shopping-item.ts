import { Component, Input } from '@angular/core';
import { ShoppingItem } from '../../models/shopping-item';


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

  constructor() {
    console.log('Hello ShoppingItemComponent Component');
  }

}
