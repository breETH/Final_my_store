import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { items } from '../models/items';
import { CartItem } from '../models/cartItem'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   myStorage = window.localStorage;

  constructor(private http: HttpClient) { }

  getProduct(): Observable<items[]>{
    return this.http.get<items[]>('http://localhost:4200/assets/data.json');
  }

  getCartProduct(): CartItem[] | []{
    const getProduct = this.myStorage.getItem('cart')
    return getProduct? JSON.parse(getProduct): [];
  }

  addToCart(product: CartItem[]): void{
    this.myStorage.setItem('cart', JSON.stringify(product));
  }

  clearCart(): void{
    this.myStorage.clear();
  }
}
