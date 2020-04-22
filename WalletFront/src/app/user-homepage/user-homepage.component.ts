import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { AccountService } from "../account.service";

@Component({
  selector: "app-user-homepage",
  templateUrl: "./user-homepage.component.html",
  styleUrls: ["./user-homepage.component.css"],
})
export class UserHomepageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router
  ) {}

  customerId: number;
  name: string;
  email: string;
  contactNumber: number;
  accountNumber: number;
  balance: number;
  transactions: any = null;

  balanceFlag = { value: false };
  transactionFlag = { value: false };

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.customerId = parseInt(params.get("id"));
    });
    this.getAccountDetails(this.customerId);
  }

  /**
   * ------ method to get account details--------
   */

  async getAccountDetails(id) {
    try {
      let response = await this.accountService.getAccount(id);
      if (response.ok) {
        let accountData = await response.json();
        this.name = accountData.firstName + " " + accountData.lastName;
        this.accountNumber = accountData.accountNumber;
        this.email = accountData.email;
        this.contactNumber = accountData.contactNumber;
        this.customerId = accountData.customerId;
      }
    } catch (err) {
      this.router.navigate(["/error"]);
    }
  }

  /**
   * ------ method to show balance--------
   */

  async showBalance() {
    try {
      let response = await this.accountService.getBalance(this.customerId);
      if (response.ok) {
        this.balance = await response.json();
        this.balanceFlag.value = true;
      }
    } catch (err) {
      this.router.navigate(["/error"]);
    }
  }

  /**
   * ------ method to show transcations--------
   */

  async showTransactions() {
    try{
      let response = await this.accountService.getTransactions(this.customerId);
      if (response.ok) {
        this.transactions = await response.json();
        this.transactionFlag.value = true;
      }
    } catch (err){
      this.router.navigate(["/error"]);
    }
  }
}
