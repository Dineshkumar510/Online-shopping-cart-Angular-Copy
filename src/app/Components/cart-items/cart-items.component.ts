import { Subscription } from 'rxjs';
import { cartItemsService } from '../Services/cart-items.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit {

  cartItems:any;
  searchTerm:any;
  starWidth: number = 0;
  discount = Math.floor(Math.random() * 100);
  aspectdiscount = Math.floor(Math.random() * 1000);

  private routeSub: Subscription;
  elementContent: any;
  isLoading:boolean = true;
  elementValue: any;
  Math: Math;

  constructor(
    private cartItemsService: cartItemsService,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.elementContent = params['element'];
      //this.Condition(this.elementContent);
      this.OnDataLoad();
    })
  }

  OnDataLoad(){
    if(this.elementContent !== 'products'){
       this.cartItemsService.getProductItems({ category: this.elementContent }).subscribe(
        (response) => {
          this.isLoading = true;
          const data = response.map(
            (item, index) => ({...item, count: 1})
          )
          this.cartItems = data;
          this.isLoading = false;
        }
      );
    } else {
       this.cartItemsService.getTotalProducts().subscribe(
        (response) => {
          this.isLoading = true;
          const data = response.map(
            (item, index) => ({...item, count: 1})
          )
          this.cartItems = data;
          this.isLoading = false;
        }
      );
    }
  }

  getStarClasses(item: any): string[] {
    const starList: string[] = [];
    if (item && item.rating && typeof item.rating.rate === 'number') {
      const StarRating = item.rating.rate;
      for (let i = 1; i <= 5; i++) {
        if (i <= StarRating) {
          starList.push("fas fa-star");
        } else if (i <= StarRating + 0.5) {
          starList.push("fas fa-star-half");
        } else {
          starList.push("far fa-star");
        }
      }
    }
    return starList;
  }

  rateProduct(rateValue: number) {
    this.starWidth = rateValue * 75 / 5;
  }

// async OnDataLoad() {
//   try {
//     this.loading = true;
//     const data: any = await this.cartItemsService.getProductItems({ category: this.elementContent }).toPromise();
//     console.log(data);
//     this.cartItems = data;
//   } catch (error) {
//     console.error("Error loading data:", error);
//   } finally {
//     this.loading = false;
//   }
// }


  addedToCart(event:any){
   this.cartItemsService.AddtoCart(event);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  get isSubMenuOpen(): boolean {
    return this.cartItemsService.sidebarShow;
  }


}
