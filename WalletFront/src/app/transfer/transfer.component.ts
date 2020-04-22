import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { AccountService } from "../account.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-transfer",
  templateUrl: "./transfer.component.html",
  styleUrls: ["./transfer.component.css"],
})
export class TransferComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  failure = { value: false };
  success = { value: false };
  passwordFlag = { value: false };
  balanceFlag = { value: false };
  otherAccount = null;
  customerId = null;
  account = null;

  beneficiaryForm = this.formBuilder.group({
    accountNumber: [null, [Validators.required]],
  });

  transferForm = this.formBuilder.group({
    amount: [null, [Validators.required, this.amountValidator]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });

  ngOnInit(): void {
    this.transferForm.get("amount").disable();
    this.transferForm.get("password").disable();
    this.customerId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.getAccountDetails(this.customerId);
  }

  /**
   * ----------method to transfer amount from one account to another-----------
   */

  async submit() {
    try {
      if (this.transferForm.get("password").value != this.account.password) {
        this.passwordFlag.value = true;
        this.transferForm.reset();
      } else {
        let response = await this.accountService.transfer(
          this.otherAccount.customerId,
          this.customerId,
          this.transferForm.get("amount").value
        );
        if (response.ok) {
          this.router.navigate(["/navigation/home", { id: this.customerId }]);
        } else {
          this.balanceFlag.value = true;
          this.transferForm.reset();
        }
      }
    } catch (err) {
      this.router.navigate(["/error"]);
    }
  }

  /**
   * ----------method to get account details -----------
   */

  async getAccountDetails(id) {
    let response = await this.accountService.getAccount(id);
    this.account = await response.json();
  }

  /**
   * ----------method to validate account number -----------
   */

  async validate() {
    try {
      let response = await this.accountService.validateAccount(
        this.beneficiaryForm.get("accountNumber").value
      );
      if (response.ok) {
        this.otherAccount = await response.json();
        this.failure.value = false;
        this.success.value = true;
        this.beneficiaryForm.get("accountNumber").disable();
        this.transferForm.get("amount").enable();
        this.transferForm.get("password").enable();
      } else {
        this.failure.value = true;
        this.success.value = false;
        this.transferForm.get("amount").disable();
        this.transferForm.get("password").disable();
        this.transferForm.reset();
      }
    } catch (err) {
      this.router.navigate(["/error"]);
    }
  }
  
  /**
   * ----------method to validate entered amount-----------
   */

  amountValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== null && control.value <= 0) {
      return { invalid_amount: true };
    } else return null;
  }
}
