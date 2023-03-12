import { Component, OnInit } from '@angular/core';
import { items, productCount} from '../../models/items'
import { DetailService } from 'src/app/service/detail.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { CartItem } from '../../models/cartItem'


@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {

  item: items = new items();
  quantity: number = 1;
  
  constructor(
    private route: ActivatedRoute,
    private detailService: DetailService,
    private cartService: CartService,
    private productService: ProductService
    ) {}

  ngOnInit(): void {
   this.route.params.subscribe((params) => {
      this.detailService.getProduct().subscribe((res): any => {
        const data = res as items[];
        this.item = data.find(
          (item: items) => item.id == params['id']
        ) as any;
      });
    }); 
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