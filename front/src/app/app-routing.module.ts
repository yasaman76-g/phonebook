import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupformComponent } from './signupform/signupform.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGaurd } from './shared/service/auth-gaurd';
import { AddadminComponent } from './addadmin/addadmin.component';
import { DetailsComponent } from './details/details.component';
import { LogoutComponent } from './logout/logout.component';
import { ShowuserComponent } from './showuser/showuser.component';
const appRoute: Routes = [
  { path: 'signupform', component: SignupformComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', canActivate: [AuthGaurd], component: LoginComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'addadmin/:id', component: AddadminComponent },
  { path: 'showuser/:id', component: ShowuserComponent },
  { path: 'details/:name', component: DetailsComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
