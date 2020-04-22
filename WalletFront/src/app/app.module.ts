import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { HttpClientModule } from "@angular/common/http";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserHomepageComponent } from "./user-homepage/user-homepage.component";
import { UserNavigationComponent } from "./user-navigation/user-navigation.component";
import { UpdateAccountComponent } from "./update-account/update-account.component";
import { DepositComponent } from "./deposit/deposit.component";
import { WithdrawComponent } from "./withdraw/withdraw.component";
import { TransferComponent } from "./transfer/transfer.component";
import { AccountService } from "./account.service";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminLoginComponent,
    UserHomepageComponent,
    UserNavigationComponent,
    UpdateAccountComponent,
    DepositComponent,
    WithdrawComponent,
    TransferComponent,
    PageNotFoundComponent,
    AdminHomepageComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AccountService],
  bootstrap: [AppComponent],
})
export class AppModule {}
