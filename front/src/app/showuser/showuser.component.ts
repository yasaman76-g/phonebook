import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-showuser',
  templateUrl: './showuser.component.html',
  styleUrls: ['./showuser.component.css']
})
export class ShowuserComponent implements OnInit {
  id;
  user;
  userphone
  errormessage;
  errormode = false;
  // public phonenumbers: any[] = [{
  //   'phonenumber': '',
  //   'type': ''
  // }];
  phonenumbers: any[] = [];
  public users: any[] = [{
    'name': '',
    'email': ''
  }];
  type = [{ 'value': '1', 'name': 'تلفن همراه' },
  { 'value': '2', 'name': ' خانه' },
  { 'value': '3', 'name': ' محل کار' }]
  constructor(private router: ActivatedRoute, private httpclient: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    const model = {
      'id': this.id
    }
    this.httpclient.post("http://localhost/phonebook/public/api/showuser", model).subscribe(
      res => {
        this.user = [res[0]];
        this.userphone = res;
        for (var val of this.userphone) {
          console.log(val)
          this.phonenumbers.push({
            'phonenumber': val.phonenumber,
            'type': val.type,
            'phoneid': val.phoneid
          })
        }
      },
      err => {
        console.log(err)
      }
    )
  }
  add() {
    this.phonenumbers.push({
      'phonenumber': '',
      'type': '',
      'phoneid': 'null'
    })
  }
  remove(i) {

    this.phonenumbers.splice(i, 1);

  }
  insert(f: NgForm) {
    console.log(this.phonenumbers)
    const model = {
      'id': this.id,
      'name': f.value.first_name,
      'email': f.value.email,
      'password': f.value.password,
      'phone': this.phonenumbers
    }
    this.httpclient.post("http://localhost/phonebook/public/api/updateuser", model)
      .subscribe(
        responseModel => {
          console.log("POST Request is successful ", responseModel);
          this.route.navigate(['/details/' + f.value.first_name])
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
