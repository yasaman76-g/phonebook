import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  clientId = "webapp";
  clientSecret = "123";
  errormessage: string;
  errormode = false;
  constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }
  @ViewChild('f') signupform: NgForm

  login(f: NgForm) {
    class TokenModel {
      access_token: string;
      expires_in: number;
      token_type: string;
      id: number
      name: string;
      scope: number;
      refresh_token: string;
    }
    const user = {
      "email": f.value.email,
      "password": f.value.password
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.clientId + ":" + this.clientSecret)
      })
    }
    return this.httpClient.post<TokenModel>("http://localhost/phonebook/public/api/login", {
      "grant_type": "password",
      "email": user.email,
      "password": user.password
    }, httpOptions).subscribe(
      res => {

        console.log("POST Request is successful ", res);
        this.cookieService.set("token", res['data'].token, null, null, null, null, null);
        this.cookieService.set("name", res['data'].name, null, null, null, null, null)
        this.cookieService.set("scope", res['data'].scope, null, null, null, null, null);
        this.cookieService.set("id", res['data'].id, null, null, null, null, null);
        this.router.navigate(['/showproducts']);
      },
      errorDate => {
        console.log("errorDate", errorDate);
        this.errormode = true;
        this.errormessage = 'نام کاربری یا رمز عبور اشتباه است'
      }
    );
  }

}
