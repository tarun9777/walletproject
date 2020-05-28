import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AccountService } from "../account.service";

@Component({
  selector: "app-deposit",
  templateUrl: "./deposit.component.html",
  styleUrls: ["./deposit.component.css"],
})
export class DepositComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  customerId = null;
  account = null;

  flag = { value: false };

  depositForm = this.formBuilder.group({
    amount: [null, [Validators.required, this.amountValidator]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });

  ngOnInit(): void {
    this.customerId = this.accountService.getCustomerId;
    this.getAccountDetails(this.customerId);
  }

  /**
   * -------method to deposit amount------------
   * */

  async submit() {
    try {
      if (this.depositForm.get("password").value == this.account.password) {
        let response = await this.accountService.deposit(
          this.depositForm.get("amount").value,
          this.customerId
        );
        if (response.ok) {
          this.router.navigate(["/user/home"]);
        } else {
          console.log("error");
        }
      } else {
        this.flag.value = true;
        this.depositForm.reset();
      }
    } catch (err) {
      this.router.navigate(["/error"]);
    }
  }

  /**
   * -------method to get account details------------
   * */

  async getAccountDetails(id) {
    try {
      let response = await this.accountService.getAccount(id);
      if (response.ok) {
        this.account = await response.json();
        this.customerId = this.account.customerId;
      } else {
        this.router.navigate(["/*"]);
      }
    } catch (err) {
      this.router.navigate(["/error"]);
    }
  }

  /**
   * -------method to validate entered amount ------------
   * */

  amountValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== null && control.value <= 0) {
      return { invalid_amount: true };
    } else return null;
  }
}
