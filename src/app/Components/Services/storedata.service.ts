import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoredataService {

  constructor(private http: HttpClient) { }

  private FirebasePushArray:any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  firebaseUrl="https://angular---online-shopping-kart-default-rtdb.asia-southeast1.firebasedatabase.app/data.json";

  get CartItems():Observable<any>{
    this.FirebasePushArray = JSON.parse(localStorage.getItem('IncStack')|| '{}');
    this.cartItemsSubject.next(this.FirebasePushArray);
    return this.cartItemsSubject.asObservable();
  }

  get guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  storeData(): void {
    this.CartItems.subscribe(data => {
      const finalData = data.map(
        (value: any) => (
          { ...value,
            time: new Date().getTime(),
            Id: this.guidGenerator,
            Status: 'Ordered',
          }
          ));
      this.http.post(this.firebaseUrl, finalData)
        .subscribe(
          (data) => console.log("Data stored successfully on Firebase",data),
          error => console.error("Error storing data on Firebase:", error)
        );
      console.log("Final Data", finalData);
    });
  }

  get fetchData():Observable<any>{
    const url = this.firebaseUrl;
    return this.http.get(url);
  }

   DeleteData(RemoveElement: any) {
    // Check if RemoveElement is valid
    if (RemoveElement === null || RemoveElement === undefined) {
        console.error("Invalid RemoveElement:", RemoveElement);
        return;
    }
    // Get TotalCartItems from localStorage
    let TotalCartItems = JSON.parse(localStorage.getItem('TotalCartItems') || '[]');
    TotalCartItems = TotalCartItems.filter((item: any) => item !== RemoveElement);
    // Save the updated TotalCartItems back to localStorage
    localStorage.setItem('TotalCartItems', JSON.stringify(TotalCartItems));
    console.log("Item removed successfully.");
}


  // RemoveData(){
  //   return this.http.delete(this.fireBaseKey);
  // }
}
