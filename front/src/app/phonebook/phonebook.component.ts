import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.css']
})
export class PhonebookComponent implements OnInit {

  name;
  id;
  addmode = false;
  contacts;
  number;
  constructor(private cookieservice: CookieService, private httpclient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (this.cookieservice.get("token") != "") {
      this.id = this.cookieservice.get("id");
    }
    const model = {
      'id': this.id
    }
    this.httpclient.post("http://localhost/phonebook/public/api/getusername", model).subscribe(
      res => {
        this.name = res[0]['name'];
        this.cookieservice.set("name", this.name)
      },
      err => {
        console.log(err)
      }
    )
    this.httpclient.post("http://localhost/phonebook/public/api/getcontact", model).subscribe(
      res => {
        this.contacts = res;

        for (var val of this.contacts) {
          for (var val1 of val.phones) {
            if (val1.type == 1) {
              val1.type = 'تلفن همراه'
            }
            if (val1.type == 2) {
              val1.type = 'خانه'
            }
            if (val1.type == 3) {
              val1.type = 'محل کار '
            }
          }
        }
        console.log(this.contacts)

      },
      err => {
        console.log(err)
      }
    )
    this.httpclient.post("http://localhost/phonebook/public/api/getorder", model).subscribe(
      res => {
        if (res[0] !== undefined) {
          this.number = res[0].pro_number;
          if (this.number != 0) {
            this.addmode = true;
          }
          else {
            this.addmode = false;
          }
        }
      },
      err => {
        console.log(err)
      }
    )
  }

}
