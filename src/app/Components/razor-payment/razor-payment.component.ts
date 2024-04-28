import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { cartItemsService } from '../Services/cart-items.service';
import confetti from 'canvas-confetti';
import { WindowRef } from './WindowRef';
import { StoredataService } from '../Services/storedata.service';


//Razorpay imported via CDN;
declare var Razorpay:any;

@Component({
  selector: 'app-razor-payment',
  templateUrl: './razor-payment.component.html',
  styleUrls: ['./razor-payment.component.scss']
})

export class RazorPaymentComponent implements OnInit, AfterViewInit {

  @ViewChild('activeDropdown', { static: true }) activeDropdown: ElementRef<any>;

  //activeDropdown: HTMLElement | null;
  element: any;
  finalPrice: number;
  ShowPrice: boolean;
  Congrats: boolean = false;
  TotalAddedtoCart:any[] = [];

  constructor(
    private router: Router,
    private CartService: cartItemsService,
    private winRef: WindowRef,
    private renderer: Renderer2,
    private StoredataService: StoredataService,
  ) {}

  ngOnInit(): void {
    const taskOutput = JSON.parse(localStorage.getItem('IncStack')!) || [];
    this.TotalAddedtoCart = taskOutput;
    this.LoadValues();
    //this.fetchData();
  }

  // fetchData(){
  //   this.StoredataService.fetchData().subscribe(
  //     (data)=> {
  //       this.TotalAddedtoCart = data;
  //     }
  //   )
  // }

  LoadValues(){
    const FinalPrice:any= localStorage.getItem("FinalPrice");
    const FinalpaymentPrice:any = JSON.parse(FinalPrice);
    this.finalPrice = FinalpaymentPrice;
  }

  shootConfetti() {
    // Implement confetti animation logic here
    // Use the canvas-confetti library
    confetti({
      particleCount: 400,
      spread: 140,
      origin: { y: 0.8 }
    });
  }

  PaymentMethod(){
    this.LoadValues();
    const RazorpayOptions = {
      description: 'Sample Payment Method',
      currency: 'INR',
      receipt: 'order_receipt_123',
      payment_capture: 1, // auto-capture payment
      amount: this.finalPrice * 100,
      key: 'rzp_test_cXsS8lBOEB4kZt',
      image: 'https://cdn-icons-png.flaticon.com/512/743/743131.png',
      handler: (response:any) => {
        if(response){
          this.StoredataService.storeData();
          localStorage.clear();
          function reloadPage() {
            window.location.reload();
          }
          const reloadInterval = 1 * 20 * 50;
          setTimeout(function() {
            reloadPage(); // Reload the page
        }, reloadInterval);
        }
      },
      prefill:{
        name: 'Dinesh kumar Boddepalli',
        email: 'Dk60891@gmail.com',
        phone: '9502955643'
      },
      theme: {
        color: '#35a179',
      },
      modal: {
        ondismiss:()=>{
          console.log('Modal dismissed');
        }
      }
    }

    const successCallBack = (paymentId:any) => {
      console.log(paymentId);
    }
    const failureCallback = (error:any) => {
      console.log(error);
    }
    Razorpay.open(RazorpayOptions, successCallBack, failureCallback);
  }


  Redirect(){
    this.router.navigate(['/electronics']);
    window.close();
  }


  ngAfterViewInit(): void {
    if(this.finalPrice == null){
      this.shootConfetti();
    }
  }


}
