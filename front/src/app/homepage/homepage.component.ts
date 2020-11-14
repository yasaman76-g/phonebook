import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  name;
  id;
  remove = false;
  addadmin = false;
  updateuser = false;
  update = true;
  contacts;
  accesslevel;
  constructor(private cookieservice: CookieService, private httpclient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (this.cookieservice.get("token") != "") {
      this.id = this.cookieservice.get("id");
    }
    const id = {
      'id': this.id
    }
    this.httpclient.post("http://localhost/phonebook/public/api/getusername", id).subscribe(
      res => {
        this.name = res[0]['name'];
        this.cookieservice.set("name", this.name)
      },
      err => {
        console.log(err)
      }
    )
    if (this.cookieservice.get("scope") === "1") {
      const model = {
        'id': this.cookieservice.get("id")
      }
      this.httpclient.post("http://localhost/phonebook/public/api/getuserbyid", model).subscribe(
        res => {
          this.accesslevel = res;

          for (var val of this.accesslevel) {
            if (val.id == 2) {
              this.remove = true;
            }
            if (val.id == 3) {
              this.addadmin = true;
            }
            if (val.id == 4) {
              this.updateuser = true;
            }
          }
        },
        err => {
          console.log(err)
        })
    }
    const model = {
      'name': this.cookieservice.get("name")
    }
    this.httpclient.post("http://localhost/phonebook/public/api/getuser", model).subscribe(
      res => {

        this.contacts = res;

      },
      err => {
        console.log(err)
      }
    )
  }
  admin(id) {
    this.router.navigate(['addadmin/' + id])
  }
  edituser(id) {
    this.router.navigate(['showuser/' + id])
  }
  deleteuser(id) {
    const model = {
      'id': id
    }
    this.httpclient.post("http://localhost/phonebook/public/api/deleteuser", model).subscribe(
      res => {
        console.log(res)
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    )
  }
  details(name) {
    this.router.navigate(['details/' + name])
  }
  onSelect(f) {
    const model = {
      'name': f.value.name,
      'user': this.name
    }
    this.httpclient.post("http://localhost/phonebook/public/api/searchuser", model).subscribe(
      res => {
        console.log(res)
        this.contacts = res;
      },
      err => {
        console.log(err);
      }
    )
  }
  advancesearch(form) {
    const model = {
      'email': form.value.email,
      'phonenumber': form.value.phonenumber,
      'user': this.name
    }
    this.httpclient.post("http://localhost/phonebook/public/api/advancesearch", model).subscribe(
      res => {
        console.log(res)
        this.contacts = res;
      },
      err => {
        console.log(err);
      }
    )
  }
}
