import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { AccountService } from "../account.service";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.css"],
})
export class ForgetPasswordComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {}

  invalidFlag = { value: false };

  forgetForm = this.formBuilder.group(
    {
      customerId: [null, Validators.required],
      contactNumber: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8)]],
    },
    { validators: passwordValidator }
  );

  async submit() {
    let response = await this.accountService.getAccount(
      this.forgetForm.get("customerId").value
    );
    let contact:number = this.forgetForm.get("contactNumber").value;
    let email:string = this.forgetForm.get("email").value;
    if (response.ok) {
      let data = await response.json();
      if (data.contactNumber == contact && data.email == email) {
        this.forgetForm.removeControl('confirmPassword');
        console.log(this.forgetForm.value);
        await this.accountService.resetPassword(this.forgetForm.value);
        console.log("password reset");
        this.router.navigate(["/login"])
      } else {
        this.invalidFlag.value = true;
        this.forgetForm.reset();
      }
    } else {
      this.invalidFlag.value = true;
      this.forgetForm.reset();
    }
  }
}
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
