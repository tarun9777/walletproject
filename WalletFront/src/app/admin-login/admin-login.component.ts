import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.css"],
})
export class AdminLoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  passwordFlag = { value: false };

  loginForm = this.formBuilder.group({
    customerId: [null, [Validators.required, Validators.pattern("admin")]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });

  /*-----navigate to admin homepage------*/ 

  submit() {
    if (
      this.loginForm.get("customerId").value == "admin" &&
      this.loginForm.get("password").value == "admin123"
    ) {
      this.router.navigate(["/adminHome"]);
    } else {
      this.passwordFlag.value = true;
      this.loginForm.reset();
    }
  }

  ngOnInit(): void {}
}
