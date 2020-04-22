import { Component, OnInit } from "@angular/core";
import { AccountService } from "../account.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-homepage",
  templateUrl: "./admin-homepage.component.html",
  styleUrls: ["./admin-homepage.component.css"],
})
export class AdminHomepageComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}

  allAccounts = null;
  detailsFlag = { value: false };
  transactionsFlag = { value: false };
  balanceFlag = { value: false };
  transactionFlag = { value: false };
  transactions = null;
  activeAccount = null;
  balance = null;

  ngOnInit(): void {
    this.getAllAccountsdetail();
  }

  /*-------method to delete user account---------*/

  async deleteAccount(id) {
    try {
      if (confirm("Are you sure ?")) {
        let response = await this.accountService.delete(id);
        if (response.ok) {
          this.detailsFlag.value = false;
          this.transactionFlag.value = false;
          this.getAllAccountsdetail();
        }
      }
    } catch (err) {
      this.router.navigate(["/error"]);
    }
  }

  /*--------------method to get all accounts in list-------------------*/

  async getAllAccountsdetail() {
    try {
      let response = await this.accountService.getAllAccounts();
      if (response.ok) {
        this.allAccounts = await response.json();
      } else {
        this.router.navigate(["/*"]);
      }
    } catch (err) {
      this.router.navigate(["/error"]);
    }
  }

  /*--------------method to get balance-------------------*/

  async showBalance() {
    try {
      let response = await this.accountService.getBalance(
        this.activeAccount.customerId
      );
      if (response.ok) {
        this.balance = await response.json();
        this.balanceFlag.value = true;
      }
    } catch (err) {
      this.router.navigate(["/error"]);
    }
  }

  /*--------------method to show transactions-------------------*/

  async showTransactions() {
    try {
      let response = await this.accountService.getTransactions(
        this.activeAccount.customerId
      );
      if (response.ok) {
        this.transactions = await response.json();
        this.transactionFlag.value = true;
      }
    } catch (err) {
      this.router.navigate(["/error"]);
    }
  }

  /*--------------nethod to get user details-----------------*/

  async getDetails(id) {
    try{
      let response = await this.accountService.getAccount(id);
      if (response.ok) {
        this.activeAccount = await response.json();
        this.detailsFlag.value = true;
        this.balanceFlag.value = false;
        this.transactionFlag.value = false;
      } else {
        console.log("error error");
      }
    } catch (err){
      this.router.navigate(["/error"]);
    }
  }
}
