import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import {  Router } from "@angular/router";
import { AccountService } from "../account.service";

@Component({
  selector: "app-update-account",
  templateUrl: "./update-account.component.html",
  styleUrls: ["./update-account.component.css"],
})
export class UpdateAccountComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  customerid = null;
  account = null;
  flag = { value: false };

  updateForm = this.formBuilder.group({
    customerId: [this.customerid],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required],
    contactNumber: [
      null,
      [Validators.required, Validators.pattern("[6789][0-9]{9}")],
    ],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });

  /**
   * --------- method to update user details------------
   */

  async submit() {
    try {
      if (this.updateForm.get("password").value == this.account.password) {
        let x = this.updateForm.value;
        x.customerId = this.customerid;
        let response = await this.accountService.updateAccount(x);
        if (response.ok) {
          // console.log(await response.json());
          this.router.navigate(["/user/home"]);
        } else {
          console.log("error");
        }
      } else {
        this.flag.value = true;
        this.updateForm.reset();
      }
    } catch (err) {
      this.router.navigate(["/error"]);
    }
  }

  /**
   * --------- method to get user details------------
   */

  async getAccountDetails(id) {
    try{
      let response = await this.accountService.getAccount(id);
      if (response.ok) {
        this.account = await response.json();
        this.customerid = this.account.customerId;
      } else {
        this.router.navigate(["/*"]);
      }
    } catch(err){
      this.router.navigate(["/error"]);
    }
  }

  ngOnInit(): void {
    this.customerid = this.accountService.getCustomerId;
    this.getAccountDetails(this.customerid);
  }
}
