import { Component } from '@angular/core';
import { CartItem } from '../../model/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {
cartItems: CartItem[] = [];
  shippingCost: number = 100;
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  updateQuantity(item: CartItem): void {
    this.cartService.updateCartItem(item.id!, item).subscribe(() => {
      this.calculateTotal();
    });
  }

  deleteItem(id: number): void {
    this.cartService.deleteCartItem(id).subscribe(() => {
      this.loadCart();
    });
  }

  calculateTotal(): void {
    const productCost = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.total = productCost + this.shippingCost;
  }
}
