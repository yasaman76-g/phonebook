import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthGaurdService {
    constructor(private cookieservice: CookieService) { }
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


}