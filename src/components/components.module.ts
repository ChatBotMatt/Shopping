import { NgModule } from '@angular/core';
import { ShoppingItemComponent } from './shopping-item/shopping-item';
import { IonicModule } from 'ionic-angular'

@NgModule({
	declarations: [ShoppingItemComponent],
	imports: [IonicModule],
	exports: [ShoppingItemComponent]
})
export class ComponentsModule {}
