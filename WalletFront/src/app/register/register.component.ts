import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { AccountService } from "../account.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService
  ) {}

  regForm = this.formBuilder.group(
    {
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      contactNumber: [
        null,
        [Validators.required, Validators.pattern("[6789][0-9]{9}")],
      ],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]],
    },
    { validator: passwordValidator }
  );

  ngOnInit(): void {}

  /**
   * --------method to add new users---------
   */

  async submit() {
    try{
      this.regForm.removeControl("confirmPassword");
      let response = await this.accountService.addAcount(this.regForm.value);
      let data = await response.json();
      this.router.navigate(["/navigation", { id: data.customerId }]);
    } catch (err){
      this.router.navigate(['/error']);
    }
  }
}

/**
 * ------- function to check password and confirm password field are same---------
 */

function passwordValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const pass = control.get("password");
  const cnfm = control.get("confirmPassword");
  if (pass && cnfm && pass.value !== cnfm.value) {
    return { mismatch: true };
  } else {
    return null;
  }
}
