import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { AccountService } from "../account.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-withdraw",
  templateUrl: "./withdraw.component.html",
  styleUrls: ["./withdraw.component.css"],
})
export class WithdrawComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  customerId = null;
  account = null;
  balanceFlag = { value: false };
  passwordFlag = { value: false };

  withdrawForm = this.formBuilder.group({
    amount: [null, [Validators.required, this.amountValidator]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });

  ngOnInit(): void {
    this.customerId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.getAccountDetails(this.customerId);
  }

  /**
   * ----------method to withdraw amount----------
   */

  async submits() {
    try {
      if (this.withdrawForm.get("password").value != this.account.password) {
        this.passwordFlag.value = true;
        this.withdrawForm.reset();
      } else {
        let response = await this.accountService.withdraw(
          this.withdrawForm.get("amount").value,
          this.customerId
        );
        if (response.ok) {
          this.router.navigate(["/navigation/home", { id: this.customerId }]);
        } else {
          this.balanceFlag.value = true;
          this.withdrawForm.reset();
        }
      }
    } catch (err) {
      this.router.navigate(["/error"]);
    }
  }

  /**
   * ----------method to get account details----------
   */

  async getAccountDetails(id) {
    try {
      let response = await this.accountService.getAccount(id);
      this.account = await response.json();
    } catch (err) {
      this.router.navigate(["/error"]);
    }
  }

  /**
   * ----------method to validate entered amount----------
   */

  amountValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== null && control.value <= 0) {
      return { invalid_amount: true };
    } else return null;
  }
}
