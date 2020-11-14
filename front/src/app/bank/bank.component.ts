import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  response;
  items = [];
  price;
  constructor(private cookieservice: CookieService, private router: ActivatedRoute, private route: Router, private title: Title, private http: HttpClient) { }
  ngOnInit() {
    this.response = {
      "price": this.router.snapshot.params['price'],
      "pro_id": this.router.snapshot.params['pro_id'],
      "pro_number": this.router.snapshot.params['pro_number']
    }
  }
  insert(item) {
    const model = {
      "refid": this.cookieservice.get("id"),
      "pro_id": item.pro_id,
      "pro_number": item.pro_number
    }
    this.http.post("http://localhost/phonebook/public/api/insertorder", model).subscribe(
      res => {
        console.log(res)
        sessionStorage.removeItem("pro_id")
        this.route.navigate(['/phonebook'])
      },
      err => {
        console.log(err)
      }
    )
  }

}
