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
import { HomepageComponent } from './homepage/homepage.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupformComponent,
    LoginComponent,
    HomepageComponent,
    AddadminComponent,
    DetailsComponent,
    LogoutComponent,
    ShowuserComponent
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
  providers: [CookieService, AuthGaurd, AuthGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
