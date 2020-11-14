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
import { ShowproductsComponent } from './showproducts/showproducts.component';
import { BasketComponent } from './basket/basket.component';
import { PhonebookComponent } from './phonebook/phonebook.component';
import { BankComponent } from './bank/bank.component';
import { AuthGaurd1 } from './shared/service/auth-gaurd1';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { AuthGaurd2 } from './shared/service/auth-gaurd2';
import { AddproductComponent } from './addproduct/addproduct.component';
const appRoute: Routes = [
  { path: 'signupform', component: SignupformComponent },
  { path: 'addcontact', canActivate: [AuthGaurd2], component: AddcontactComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', canActivate: [AuthGaurd], component: LoginComponent },
  { path: 'homepage', canActivate: [AuthGaurd1], component: HomepageComponent },
  { path: 'showproducts', component: ShowproductsComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'phonebook', component: PhonebookComponent },
  { path: 'addadmin/:id', component: AddadminComponent },
  { path: 'showuser/:id', component: ShowuserComponent },
  { path: 'details/:name', component: DetailsComponent },
  { path: 'bank/:price/:pro_id/:pro_number', component: BankComponent },
  { path: 'addproduct', component: AddproductComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
