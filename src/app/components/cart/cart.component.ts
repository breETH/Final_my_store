import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { items, productCount} from '../../models/items';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  address: string | undefined;
  credit: string | undefined;
  username: string | undefined;
  item: items[] = [];
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  productCount: string[] = productCount;
  @Output() Confirmation: EventEmitter<string> = new EventEmitter();
  
  items:items[] = [];

  constructor(private cartService: CartService, private productService: ProductService, private route: Router) {}

  ngOnInit(): void {
    this.cartItems = this.productService.getCartProduct();
    this.calculateTotalPrice();
      
  }
  selectChange(id: number, event: any): void{
    const selectedOption = event.target.options[event.target.options.selectedIndex].value;
    const cartIdx = this.cartItems.findIndex(cart => cart.id === id);
    cartIdx != -1 && this.cartItems.length > 0 ? this.cartItems[cartIdx].option = selectedOption: null;
    this.cartItems.length > 0 ? this.productService.addToCart(this.cartItems): null;
    this.calculateTotalPrice()
  }

  removeCart(id: number): void{
    const cartIdx = this.cartItems? this.cartItems.findIndex(cart => cart.id === id): -1;
    if(cartIdx != -1 && this.cartItems.length > 0){
      this.cartItems.splice(cartIdx,1)
      this.productService.addToCart(this.cartItems)
      this.calculateTotalPrice()
    }
  }
  calculateTotalPrice(): void{
    this.totalPrice = this.cartItems.reduce((acc: number, val: any) =>{
      return acc + val.price * Number(val.option);
    }, 0);
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }
  
  onSubmit(): void {
    alert('ACCEPTED!')
    this.Confirmation.emit(this.username);
    this.productService.clearCart();
    this.route.navigateByUrl(`success/${this.username}/${this.totalPrice}`);
  
  }
}
