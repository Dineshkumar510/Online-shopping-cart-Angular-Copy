import { Component, OnInit } from '@angular/core';
import {cartItemsService} from './Components/Services/cart-items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'online-shopping-cart-Angular14';
  ShowPayment:boolean = false;

  ngOnInit(): void {
  }
  constructor(
    private router: Router,
    private cartItemsService: cartItemsService,
  ){
    this.ShowPayment = this.cartItemsService.IsFinalPrice();
    console.log("Show boolean for Main Component!",this.ShowPayment);
  }

  isPaymentRoute(): boolean {
    return this.router.url === '/Payment' && this.ShowPayment == true;
  }

  isProfile():boolean {
    return this.router.url === '/profile';
  }

  isHistory():boolean {
    return this.router.url === '/product-history';
  }

}
