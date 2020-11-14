import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AuthGaurdService {
    constructor(private cookieservice: CookieService, private httpclient: HttpClient) { }
    loggedIn = false;
    isnotAuthenticate() {
        if ((this.cookieservice.get("token") == "")) {
            this.loggedIn = true
        } else { this.loggedIn = false }
        const promis = new Promise(
            (resolve, reject) => {
                setTimeout(
                    () => {
                        resolve(this.loggedIn)
                    }, 800)
            }
        )
        return promis;
    }
    isAdmin() {
        if ((this.cookieservice.get("token") != "") && (this.cookieservice.get("scope") === "1")) {
            this.loggedIn = true
        } else { this.loggedIn = false }
        const promis = new Promise(
            (resolve, reject) => {
                setTimeout(
                    () => {
                        resolve(this.loggedIn)
                    }, 800)
            }
        )
        return promis;
    }
    hasorder() {
        const model = {
            'id': this.cookieservice.get("id")
        }
        this.httpclient.post("http://localhost/phonebook/public/api/getorder", model).subscribe(
            res => {
                if (res[0] !== undefined) {
                    this.loggedIn = true
                }
                else { this.loggedIn = false }
            },
            err => {
                console.log(err)
            }
        )
        const promis = new Promise(
            (resolve, reject) => {
                setTimeout(
                    () => {
                        resolve(this.loggedIn)
                    }, 800)
            }
        )
        return promis;
    }


}