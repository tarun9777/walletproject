import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-user-navigation",
  templateUrl: "./user-navigation.component.html",
  styleUrls: ["./user-navigation.component.css"],
})
export class UserNavigationComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  customerId: number = null;

  ngOnInit(): void {
    this.customerId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.router.navigate(["/navigation/home", { id: this.customerId }]);
  }

  /**
   * ------method to navigate to users homepage------
   */

  home() {
    this.router.navigate(["/navigation/home", { id: this.customerId }]);
  }

  /**
   * ------method to navigate to users update details page------
   */

  updateDetails() {
    this.router.navigate([
      "/navigation/updateDetails",
      { id: this.customerId },
    ]);
  }

  /**
   * ------method to navigate to withdraw page------
   */

  withdraw() {
    this.router.navigate(["/navigation/withdraw", { id: this.customerId }]);
  }

  /**
   * ------method to navigate to users deposit page------
   */

  deposit() {
    this.router.navigate(["/navigation/deposit", { id: this.customerId }]);
  }

  /**
   * ------method to navigate to users transfer page------
   */

  transfer() {
    this.router.navigate(["/navigation/transfer", { id: this.customerId }]);
  }
}
