import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { AccountService } from "../account.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginData = null;
  failure = { value: false };

  loginForm = this.formBuilder.group({
    customerId: [null, [Validators.required, this.adminValidator]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });

  /**
   * ----------method to go to user homepage----------
   */

  async submit() {
    try {
      let response = await this.accountService.validateLogin(
        this.loginForm.value
      );
      if (response.ok) {
        this.loginData = await response.json();
        this.failure.value = false;
        this.router.navigate([
          "/navigation",
          { id: this.loginForm.get("customerId").value },
        ]);
      } else {
        console.log("error");
        this.failure.value = true;
        this.loginForm.reset();
      }
    } catch (err){
      this.router.navigate(['/error']);
    }
  }
  
  /**
   * --------- method to validate entered id is not admin id-------
   */

  adminValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const s = control.value;
    if (s === "admin") {
      return { notallowed: true };
    } else {
      return null;
    }
  }
}
