import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {
  name;
  id;
  products;
  isadmin = false;
  addmode = false;
  accesslevel;
  count;
  pro_id = [];
  constructor(private router: Router, private httpclient: HttpClient, private cookieserveice: CookieService) {
    if (sessionStorage.getItem("pro_id") !== null) {
      this.pro_id.push(JSON.parse(sessionStorage.getItem("pro_id")));
      this.count = JSON.parse(sessionStorage.pro_id).length;
    }
  }


  ngOnInit(): void {
    this.id = this.cookieserveice.get("id");
    const model = {
      'id': this.cookieserveice.get("id")
    }
    this.httpclient.post("http://localhost/phonebook/public/api/getusername", model).subscribe(
      res => {
        this.name = res[0]['name'];
        this.cookieserveice.set("name", this.name)
      },
      err => {
        console.log(err)
      }
    )
    if (this.cookieserveice.get("scope") === '1') {
      this.isadmin = true;
      this.httpclient.post("http://localhost/phonebook/public/api/getuserbyid", model).subscribe(
        res => {
          this.accesslevel = res;

          for (var val of this.accesslevel) {
            if (val.id == 1) {
              this.addmode = true;
            }
          }
        },
        err => {
          console.log(err)
        })
    }
    else {
      this.isadmin = false;
    }
    this.httpclient.get("http://localhost/phonebook/public/api/getproduct").subscribe(
      res => {
        this.products = res;
      },
      err => {
        console.log(err);
      }
    );

  }
  order(id) {
    this.pro_id.push(id)
    sessionStorage.setItem("pro_id", JSON.stringify(this.pro_id));
    console.log(JSON.parse(sessionStorage.pro_id));
    this.count = JSON.parse(sessionStorage.pro_id).length;
  }
  basket() {
    this.router.navigate(['basket']);
  }
}
