import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.css']
})
export class SignupformComponent implements OnInit {
  errormessage;
  errormode = false;
  public phonenumbers: any[] = [{
    'phonenumber': '',
    'type': ''
  }];
  type = [{ 'value': '1', 'name': 'تلفن همراه' },
  { 'value': '2', 'name': ' خانه' },
  { 'value': '3', 'name': ' محل کار' }]
  constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router) { }
  @ViewChild('f') signupform: NgForm
  ngOnInit(): void {
  }
  add() {
    this.phonenumbers.push({
      'phonenumber': '',
      'type': ''
    })
  }
  remove(i) {

    this.phonenumbers.splice(i, 1);

  }
  insert(f: NgForm) {
    const token = this.cookieService.get("token");
    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json; charset=utf-8'
      })
    }
    const model = {
      'name': f.value.first_name,
      'email': f.value.email,
      'password': f.value.password,
      'phone': this.phonenumbers,
      'scope': 2
    }
    this.httpClient.post("http://localhost/phonebook/public/api/register", model, httpOptions)
      .subscribe(
        responseModel => {
          console.log("POST Request is successful ", responseModel);
          this.router.navigate([''])
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
