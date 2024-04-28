import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CartItemsComponent} from './Components/cart-items/cart-items.component'
import {RazorPaymentComponent} from './Components/razor-payment/razor-payment.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ProductHistoryComponent } from './Components/product-history/product-history.component';
import {UserloginComponent} from './Components/userlogin/userlogin.component';

const routes: Routes = [
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: UserloginComponent},
  {path:':element', component: CartItemsComponent},
  {path:'profile', component: ProfileComponent},
  {path:'product-history', component: ProductHistoryComponent},
  {path:'Payment', component:RazorPaymentComponent}
  //{path:'payment-page', loadChildren: () => import('./Components/razor-payment/razor-payment.module').then(m => m.RazorPaymentRoutingModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
