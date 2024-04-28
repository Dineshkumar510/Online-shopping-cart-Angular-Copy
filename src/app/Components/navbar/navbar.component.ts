import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct, cartItemsService } from '../Services/cart-items.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { StoredataService } from '../Services/storedata.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy{

  @ViewChild("priceTag") priceTag: ElementRef;
  @ViewChild('profile', { static: true }) profile: ElementRef;
  @ViewChild('menu', { static: true }) menu: ElementRef;

  CartItems$ = this.cartItemsService.getCartItemsObservable();

  counter = 1;
  TotalAddedtoCart:any[] = [];
  IncrementArray:any[] = [];
  DecrementArray:any[] = [];
  IncrementValue:any = 0;
  DecrementValue:any = 0;
  elementPrice:any;
  totalPrice:any;
  couponCodeBar:boolean = false;
  isActive: boolean = false;
  couponValue:any = 0;
  CouponInput:any;
  Cart: Subscription;

  constructor(
    private router: Router,
    private cartItemsService: cartItemsService,
    private storeDataService: StoredataService,
  ) { }

  ngOnInit(): void {
    if (this.CartItems$) {
      this.CartItems$.subscribe(cartItems => {
        if (!cartItems || cartItems.length === 0) {
          var storedCartItems = JSON.parse(localStorage.getItem('IncStack') || '[]');
          this.TotalAddedtoCart = storedCartItems;
          this.cartItemsService.LocalStorageValue(this.TotalAddedtoCart);
        } else {
          this.TotalAddedtoCart = cartItems;
        }
        console.log("From NavBar", this.TotalAddedtoCart);
      });
    }

  }

  // OnCardItem(){
  //   console.log("Total Kart Items in NavBar",this.cartItemsService.getKartItems);
  //   this.TotalAddedtoCart = this.CartItems$;
  //  }

  ShoppingCartToggle(event:any){
    if(event){
      event.stopPropagation();
      this.cartItemsService.ShoppingCartToggle();
    }
  }

  toggleActive() {
    this.isActive = !this.isActive;
  }

  get isSubMenuOpen(): boolean {
    return this.cartItemsService.sidebarShow;
  }

  get TotalCost(): number{
    return this.Totalprice(this.TotalAddedtoCart)
  }


  //Need to get only price Values from the arrays of Object
  Totalprice(array:any[]){
    var totalCost = 0;
    for(var i = 0; i < array.length; i++){
      totalCost += array[i].price;
    }
    return Math.round(totalCost);
  }

  //Alternative method to get the total cost of products
  // TotalPriceProduct(){
  //   const TotalValue = this.TotalAddedtoCart.reduce((prev:any, curr:any)=>{
  //     return prev + curr.price
  //   },0)
  //   return TotalValue;
  // }

  CouponCode(){
    this.couponCodeBar = !this.couponCodeBar;
    if(this.couponCodeBar == true && this.FinalPrice >= 1000){
      this.couponValue = 100;
    } else{
      this.couponValue = 0;
    }
  }

  // ShippingFees(){
  //   if(this.TotalCost >= 500){
  //     this.ShippingCharges = 150;
  //   } else{
  //     this.ShippingCharges = 0;
  //   }
  // }


  get ShippingCharges():number {
    return this.TotalCost<500 ? 150 : 0;
  }

  plus(index: number, item:any) {
    this.cartItemsService.IncrementCount(index);
    if(item){
      this.IncrementArray.push(item);
      return this.IncrementValues;
      }
    return 0;
  }

  get IncrementValues(){
    return this.IncrementValue = this.IncrementArray.reduce((prev:any, curr:any)=>{
      return prev + curr.price
    },0)
  }

  minus(index: number, item: any): number {
    this.cartItemsService.DecrementCount(index);
    if (item) {
      this.DecrementArray.push(item);
      return this.DecrementValues;
    }
    return 0;
  }
  get DecrementValues(): number {
    return this.DecrementValue = this.DecrementArray.reduce((prev: any, curr: any) => {
      return prev + curr.price;
    }, 0);
  }

  get FinalPrice(): number{
    return Math.round(this.TotalCost + this.ShippingCharges + this.IncrementValue - this.couponValue - this.DecrementValue);
  }

  removeEle(item:any, i:number){
    this.TotalAddedtoCart.splice(i, 1);
    this.storeDataService.DeleteData(item);
    let FinalCartItems = this.TotalAddedtoCart;
    localStorage.setItem('IncStack', JSON.stringify(FinalCartItems));
  }

  Pay(){
    this.updateFinalPrice();
    //this.storeDataService.StoreData();
    this.cartItemsService.ShoppingCartToggle();
    this.isActive = false;
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`Payment`]));
      window.open(url, '_blank');
  }

  updateFinalPrice() {
    const finalPrice = this.FinalPrice;
    this.cartItemsService.setFinalPrice(finalPrice);
  }


  ngOnDestroy(): void {
    this.Cart.unsubscribe();
  }
}
