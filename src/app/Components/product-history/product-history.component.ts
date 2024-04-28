import { StoredataService } from './../Services/storedata.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Country {
	id?: number;
	name: string;
	flag: string;
	area: number;
	population: number;
  status: string;
}


@Component({
  selector: 'app-product-history',
  templateUrl: './product-history.component.html',
  styleUrls: ['./product-history.component.scss']
})
export class ProductHistoryComponent implements OnInit {

  FinalProductsHistory:any[] = [];
  pageLen = [5,10,15,]
  selected = 10;
  page = 1;
	pageSize = 4;
	collectionSize = this.FinalProductsHistory.length;
  fetchData$ = this.StoredataService.fetchData;

  constructor(
    private router: Router,
    private StoredataService: StoredataService
  ) {
    this.refreshCountries()
  }

  ngOnInit(): void {
    if(this.fetchData$){
      this.fetchData$.subscribe(
        (data)=> {
          this.FinalProductsHistory = data;
        }
      )
    }
  }

  refreshCountries() {
		this.FinalProductsHistory.map((data, i) => ({ id: i + 1, ...data })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}


  getStatus(data:any){
    switch(data){
      case 'Ordered':
      return '#00aae7';
      case 'In-Progress':
      return '#e2e625';
      case 'Delivered':
      return '#1dbb99';
      case 'Cancelled':
      return '#f35958';
    }
    return;
  }

  back(){
    this.router.navigate(['/profile']);
  }


}
