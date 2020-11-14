import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  pro_id = [];
  products;
  totalprice = 0;
  totalnumber = 0;
  showmessage = false;
  message;
  constructor(private router: ActivatedRoute, private route: Router, private httpclient: HttpClient) {
    if (sessionStorage.getItem("pro_id") !== null) {
      this.pro_id = JSON.parse(sessionStorage.getItem("pro_id"));
    }
    else {

      this.showmessage = true;
      this.message = 'محصولی برای نمایش در سبد خرید موجود نیست'
    }
  }

  ngOnInit(): void {

    this.totalprice = 0;
    this.httpclient.post("http://localhost/phonebook/public/api/basket", this.pro_id).subscribe(
      res => {
        this.products = res;
        for (var val of this.products) {
          this.totalprice = this.totalprice + parseInt(val.price);
          this.totalnumber = this.totalnumber + parseInt(val.number);
        }

      },
      err => {
        console.log(err);
      }
    );
  }
  delete(id) {
    for (var i = 0; i < this.pro_id.length; i++) {
      if (this.pro_id[i] === id) {
        this.pro_id.splice(i, 1);
      }
    }
    console.log(this.pro_id)
    if (this.pro_id.length == 0) {
      sessionStorage.removeItem("pro_id")
      this.showmessage = true;
      this.message = 'محصولی برای نمایش در سبد خرید موجود نیست'
    }
    else {
      sessionStorage.setItem("pro_id", JSON.stringify(this.pro_id));
    }
    this.ngOnInit();
  }
  bank(price) {
    if (price === 0) {
      alert("کالایی برای خرید موجود نیست")
    }
    this.route.navigate(['bank/' + price + "/" + this.pro_id + "/" + this.totalnumber]);
  }
}
