import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { UserNavigationComponent } from "./user-navigation/user-navigation.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { UserHomepageComponent } from "./user-homepage/user-homepage.component";
import { UpdateAccountComponent } from "./update-account/update-account.component";
import { DepositComponent } from "./deposit/deposit.component";
import { WithdrawComponent } from "./withdraw/withdraw.component";
import { TransferComponent } from "./transfer/transfer.component";
import { AdminHomepageComponent } from "./admin-homepage/admin-homepage.component";
import { ErrorComponent } from "./error/error.component";
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "adminLogin", component: AdminLoginComponent },
  { path: "forgetPassword", component: ForgetPasswordComponent },
  {
    path: "navigation",
    component: UserNavigationComponent,
    children: [
      // { path: "", redirectTo:"/home", pathMatch:"full" },
      { path: "home", component: UserHomepageComponent },
      { path: "updateDetails", component: UpdateAccountComponent },
      { path: "deposit", component: DepositComponent },
      { path: "withdraw", component: WithdrawComponent },
      { path: "transfer", component: TransferComponent },
    ],
  },
  { path: "register", component: RegisterComponent },
  { path: "adminHome", component: AdminHomepageComponent },
  { path: "error", component: ErrorComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
