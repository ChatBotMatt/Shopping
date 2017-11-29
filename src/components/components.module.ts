import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular'
import { ShoppingItemComponent } from './shopping-item/shopping-item';

@NgModule({
	declarations: [ShoppingItemComponent],
	imports: [IonicModule],
	exports: [ShoppingItemComponent]
})
export class ComponentsModule {}