import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  url:any = '' || null;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target?.result;
      }
    }
  }

  public delete(){
    this.url = null;
  }

  back(){
    this.router.navigate(['/products']);
  }

  redirect(){
    this.router.navigate(['/product-history']);
  }

}
