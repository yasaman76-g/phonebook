import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  name;
  detail;
  email;
  constructor(private router: ActivatedRoute, private httpclient: HttpClient) { }

  ngOnInit(): void {
    this.name = this.router.snapshot.params['name'];
    const model = {
      'name': this.name
    }
    this.httpclient.post("http://localhost/phonebook/public/api/getuserdetails", model).subscribe(
      res => {
        this.detail = res;
        for (var val of this.detail) {
          if (val.type == 1) {
            val.type = 'تلفن همراه'
          }
          if (val.type == 2) {
            val.type = 'خانه'
          }
          if (val.type == 3) {
            val.type = 'محل کار '
          }
          this.email = val.email;

        }
        console.log(this.detail)
      },
      err => {
        console.log(err)
      }
    )
  }

}
