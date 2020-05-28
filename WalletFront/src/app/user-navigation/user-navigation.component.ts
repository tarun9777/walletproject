import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AccountService } from "../account.service";

@Component({
  selector: "app-user-navigation",
  templateUrl: "./user-navigation.component.html",
  styleUrls: ["./user-navigation.component.css"],
})
export class UserNavigationComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  customerId: number = null;

  ngOnInit(): void {
    this.customerId = parseInt(this.accountService.getCustomerId);
    this.router.navigate(["/user/home"]);
  }

  /**
   * ------method to navigate to users homepage------
   */

  home() {
    this.router.navigate(["/user/home"]);
  }

  /**
   * ------method to navigate to users update details page------
   */

  updateDetails() {
    this.router.navigate(["/user/updateDetails"]);
  }

  /**
   * ------method to navigate to withdraw page------
   */

  withdraw() {
    this.router.navigate(["/user/withdraw"]);
  }

  /**
   * ------method to navigate to users deposit page------
   */

  deposit() {
    this.router.navigate(["/user/deposit"]);
  }

  /**
   * ------method to navigate to users transfer page------
   */

  transfer() {
    this.router.navigate(["/user/transfer"]);
  }
}
