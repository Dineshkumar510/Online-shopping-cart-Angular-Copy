import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from "rxjs";
import { ToastService } from './toast.service';
export interface IProduct {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  count: number;
  rating: IRating;
}
interface IRating {
  rate: number;
  count: number;
}


@Injectable({
  providedIn: 'root',
})

export class cartItemsService implements OnInit, OnDestroy{

  private apiUrl = 'https://fakestoreapi.com/products/category';
  private totalUrl = 'https://fakestoreapi.com/products';
  cartItems:IProduct[] = [];
  AllItems:IProduct[] = [];
  passingCartItems:IProduct[] = [];
  filterItems:IProduct[] = [];
  sidebarShow: boolean = true;
  LocalStorage:any = [];

  private productsSubject = new BehaviorSubject<IProduct[]>(this.InCreDeCreValue);
  private cartItemsSubject = new BehaviorSubject<IProduct[]>([]);


  finalPrice: number;
  ShowPayment: boolean;
  RandomAccess:any;

  constructor(
    private http: HttpClient,
    private toast:ToastService,
    ) {}

    ngOnInit(): void {
      this.LocalStorageValue;
      localStorage.setItem("IncStack", JSON.stringify(this.productsSubject.value));
    }

  getTotalProducts():Observable<IProduct[]>{
    const url = this.totalUrl;
    return this.http.get<IProduct[]>(url);
  }

  getProductItems(params: {category: any}): Observable<IProduct[]>{
   const {category} = params;
   const url = `${this.apiUrl}/${category}`
   return this.http.get<IProduct[]>(url);
  }

  AddtoCart(item:any){
    this.AllItems.push(item);
    localStorage.setItem("cartItems", JSON.stringify(item));
    let ContentItem:any= localStorage.getItem("cartItems");
    const ItemArray:any = JSON.parse(ContentItem);
    //Filtering for duplicate Array elements
    if(this.cartItems.find((item)=> item.title === ItemArray.title) === undefined){
      this.cartItems.push(ItemArray);
      localStorage.setItem('IncStack', JSON.stringify(this.cartItems));
      this.filterItems = JSON.parse(localStorage.getItem('IncStack')!) || [];
      this.cartItemsSubject.next(this.getPastCartItems);
      this.toast.openSuccess(`Product : "${item?.title.length > 15 ? item?.title.substring(0,15) + "..." : item?.title}" Added to Cart Successfully`);
    } else {
      this.toast.openInfo("Product Already Added to Cart");
    }
  }

    getCartItemsObservable(): Observable<IProduct[]> {
      return this.cartItemsSubject.asObservable();
    }


    get getPastCartItems():any[]{
      this.passingCartItems = [...this.AllItems, ...this.filterItems];
        const ids = this.passingCartItems.map(({ title }:any) => title);
        const filtered = this.passingCartItems.filter(({ title }, index) =>
        !ids.includes(title, index + 1));
      console.log("Form Service to get Pass Values!", filtered);
      return filtered;
    }

    LocalStorageValue(value:any){
       this.LocalStorage = value;
       console.log(this.LocalStorage);
    }

   get InCreDeCreValue(){
      const Output = [...this.LocalStorage, ...this.getPastCartItems];
      return Output;
    }


  // getCartItems(items: any):void{
  //   this.passingCartItems = items;
  //   console.log("From Service!",this.passingCartItems);
  // }

  // get getKartItems() {
  //   return this.passingCartItems;
  // }



  IncrementCount(index: number): void {
    const updatedCartItems = [...this.InCreDeCreValue];
    if (index >= 0 && index < updatedCartItems.length) {
      const currentCount = updatedCartItems[index].count;
      if (typeof currentCount === 'number' && !isNaN(currentCount)) {
        updatedCartItems[index].count++;
        this.productsSubject.next(updatedCartItems);
      }
      localStorage.setItem("IncStack", JSON.stringify(this.productsSubject.value));
    }
  }

  DecrementCount(index: number): void {
    const DecrementCartItems = [...this.InCreDeCreValue];
    if (index >= 0 && index < DecrementCartItems.length) {
      const currentCount = DecrementCartItems[index].count;
      if (typeof currentCount === 'number' && !isNaN(currentCount)) {
        DecrementCartItems[index].count--;
        this.productsSubject.next(DecrementCartItems);
      }
      localStorage.setItem("IncStack", JSON.stringify(this.productsSubject.value));
    }
  }

  setFinalPrice(price: number) {
   if(price){
    localStorage.setItem("FinalPrice", JSON.stringify(price));
    const FinalPrice:any= localStorage.getItem("FinalPrice");
    const FinalpaymentPrice:any = JSON.parse(FinalPrice);
    this.finalPrice = FinalpaymentPrice;
    this.IsFinalPrice();
   }
  }

  getFinalPrice(): number {
    return this.finalPrice;
  }

  ShoppingCartToggle(){
    this.sidebarShow = !this.sidebarShow;
  }

  IsFinalPrice():boolean{
    console.log("Final Price from Service:", this.finalPrice);
    return this.finalPrice >= 1 ? false : true;
   }

  ngOnDestroy(): void {
   this.productsSubject.unsubscribe();
  }

}
