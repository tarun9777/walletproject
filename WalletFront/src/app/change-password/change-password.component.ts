import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { AccountService } from "../account.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  customerId = null;
  account = null;

  flag = {value: false};

  changeForm = this.formBuilder.group(
    {
      oldPassword: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null],
    },
    { validators: passwordValidator }
  );

  ngOnInit(): void {
    this.customerId = this.accountService.getCustomerId;
    this.getAccountDetails(this.customerId);
  }

  async submit(){
    if (this.changeForm.get('oldPassword').value == this.account.password){
      this.changeForm.removeControl('oldPassword');
      this.changeForm.removeControl('confirmPassword');
      let form = this.changeForm.value;
      form.customerId = this.customerId;
      let response = await this.accountService.resetPassword(form);
      if (response.ok){
        this.router.navigate(['/user/home']);
      } else {
        this.router.navigate(['/error']);
      }
    } else {
      this.flag.value = true;
      this.changeForm.reset();
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
}
/**
 * -------method to validate password ------------
 * */
function passwordValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const pass = control.get("password");
  const cnfm = control.get("confirmPassword");
  if (pass && cnfm && pass.value !== cnfm.value) {
    return { mismatch: true };
  } else {
    return null;
  }
}
