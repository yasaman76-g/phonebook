import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  errormessage;
  errormode = false;
  constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router) { }
  @ViewChild('f') signupform: NgForm
  ngOnInit(): void {
  }
  insert(f: NgForm) {
    const model = {
      'title': f.value.first_name,
      'number': f.value.number,
      'price': f.value.price
    }
    this.httpClient.post("http://localhost/phonebook/public/api/addproduct", model)
      .subscribe(
        responseModel => {
          console.log("POST Request is successful ", responseModel);
          this.router.navigate(['/showproducts'])
        },
        errorDate => {
          console.log(errorDate.error);

          this.errormode = true;
          for (var prop in errorDate.error) {
            console.log(errorDate.error[prop]);
            this.errormessage = errorDate.error[prop];
          }

        }
      );
  }
}
