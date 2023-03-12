import { Component, OnInit, Input } from '@angular/core';
import { items, productCount } from 'src/app/models/items';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/service/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit{
  
  quantity: number = 1;
  selectedItem = '1';
  title: string = "My Store";
  productCount: string[] = productCount;
  @Input() items: items = new items;

  constructor( private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService ) {}

  ngOnInit(): void { }
  
 addToCart(items: items):void {
    this.cartService.addToCart(this.items);
    alert('Added to Cart!');
  }

setQuantity(e: Event): void {
    this.quantity = parseInt( (e.target as HTMLSelectElement).value );
  }
  
    onSubmit(cartProduct: items, event: any): boolean{
    let newCartProduct: CartItem[] = [];
    let message: string = '';
    let isCartOptionExist: boolean = false;

    const selectedOption = event.target[0].options[event.target[0].options.selectedIndex].value;
    const cartProducts: CartItem[] | [] = this.productService.getCartProduct();

    const cartIdx = cartProducts.findIndex(cart => cart.id === cartProduct.id)
    newCartProduct = cartProducts;

    if((cartIdx === -1) || (cartProducts.length === 0)){
      newCartProduct.push(Object.assign(cartProduct, {option: selectedOption}))
      message = `New Item '${cartProduct.name}' added to cart`;
    } else{
      const option: string = newCartProduct[cartIdx].option;
      isCartOptionExist = selectedOption === option

      if (isCartOptionExist){
        message = `${option} Item(s) of '${cartProduct.name}' already exist in cart.`;
      }else{
        newCartProduct[cartIdx].id = cartProduct.id;
        newCartProduct[cartIdx].option = selectedOption;
        message = `${option} Item(s) of '${cartProduct.name}' already exist in cart. Will be updated to ${selectedOption}`;
      }
      
    }
    !isCartOptionExist? this.productService.addToCart(newCartProduct): null;

    alert(message);

    this.printLocalData(); 
    return false;
  }

   printLocalData(): void{
    console.log(this.productService.getCartProduct())
  }


}
