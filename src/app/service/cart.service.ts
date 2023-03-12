import { Injectable } from '@angular/core';
import { items } from '../models/items';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  storage = window.localStorage;
  items: items[] = []
  // cart: CartItem[] = [];

  constructor() { }

  getCart() {
    return this.items;
  }
  
  addToCart(team: items){
    const alreadyAdded: Boolean = !!this.items.find((item) => item.id === team.id);
    if (alreadyAdded) 
      window.alert("already added");
    else 
    this.items.push(team);
  }
   
  clearCart() {
    this.items = [];
    return this.items;
  }

 getCartProduct() {
    const getProduct = this.storage.getItem('items');
    return getProduct ? JSON.parse(getProduct) : [];
  }
}