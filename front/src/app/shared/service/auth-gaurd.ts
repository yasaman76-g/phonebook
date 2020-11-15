import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthGaurdService } from './auth-gaurd.service';
@Injectable()
export class AuthGaurd implements CanActivate {
    constructor(private authgaurdservice: AuthGaurdService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authgaurdservice.isnotAuthenticate().then(
            (logedIn: boolean) => {
                if (logedIn) {
                    return true
                } else {

                    this.router.navigate(['/homepage'])
                }
            }
        )

    }
}