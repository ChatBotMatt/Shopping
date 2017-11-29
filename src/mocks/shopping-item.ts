import { ShoppingItem } from '../models/shopping-item';

const Pantry: ShoppingItem[] = [
    {
        name: "Apple", 
        quantity: 1, 
        warningQuantity: 0,
    }, 
    {
        name: "Pear", 
        quantity: 4, 
        warningQuantity: 0,
    }, 
    {
        name: "Cheese", 
        quantity: 0, 
        warningQuantity: 0,
    },
];

export const PantryMock = Pantry ;