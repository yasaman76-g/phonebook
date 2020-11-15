import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {
  id;
  accesslevel;
  access;
  selected;
  constructor(private router: ActivatedRoute, private httpclient: HttpClient, private route: Router) { }
  @ViewChild('f') form: NgForm
  ngOnInit(): void {
    this.id = this.router.snapshot.params['id']
    this.httpclient.get("http://localhost/phonebook/public/api/accesslevel").subscribe(
      res => {
        this.accesslevel = res;
        for (var val of this.accesslevel) {
          this.access = [val.access];
        }

      },
      err => {
        console.log(err)
      }
    )
  }
  getSelectedValue() {
    var model = {
      'refid': this.id,
      'accesslevel': this.selected
    }
    this.httpclient.post("http://localhost/phonebook/public/api/insertadmin", model).subscribe(
      res => {
        console.log(res);
        this.route.navigate(['/homepage']);
      },
      err => {
        console.log(err)
      }
    )

  }
}
