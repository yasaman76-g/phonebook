import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupformComponent } from './signupform/signupform.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthGaurd } from './shared/service/auth-gaurd';
import { AuthGaurdService } from './shared/service/auth-gaurd.service';
import { AddadminComponent } from './addadmin/addadmin.component';
import { NgSelectModule } from '@ng-select/ng-select';
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
import { HomepageComponent } from './homepage/homepage.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupformComponent,
    LoginComponent,
    AddadminComponent,
    DetailsComponent,
    LogoutComponent,
    ShowuserComponent,
    ShowproductsComponent,
    BasketComponent,
    PhonebookComponent,
    BankComponent,
    AddcontactComponent,
    AddproductComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule
  ],
  exports: [
    NgSelectModule
  ],
  providers: [CookieService, AuthGaurd, AuthGaurd1, AuthGaurd2, AuthGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
