import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: "root",
})
export class AccountService {
  private baseUrl = "http://localhost:8081/account";

  constructor(private http: HttpClient) {}

  validateLogin(loginData) {
    let fetchoptions = {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: new Headers({ "Content-Type": "application/json" }),
    };
    return fetch(this.baseUrl + "/validate", fetchoptions);
  }

  getAccount(id) {
    return fetch(this.baseUrl + "/getAccountById/" + id);
  }

  getBalance(id) {
    return fetch(this.baseUrl + "/getBalance/" + id);
  }

  getTransactions(id) {
    return fetch(this.baseUrl + "/getTransactions/" + id);
  }

  updateAccount(account) {
    let options = {
      method: "POST",
      body: JSON.stringify(account),
      headers: new Headers({ "Content-Type": "application/json" }),
    };
    return fetch(this.baseUrl + "/updateAccount", options);
  }

  addAcount(acc) {
    let options = {
      method: "POST",
      body: JSON.stringify(acc),
      headers: { "Content-Type": "application/json" },
    };
    return fetch(this.baseUrl + "/addAccount", options);
  }

  deposit(amount, id) {
    return fetch(this.baseUrl + "/deposit/" + id + "/" + amount);
  }

  withdraw(amount, id) {
    return fetch(this.baseUrl + "/withdraw/" + id + "/" + amount);
  }

  validateAccount(acc) {
    return fetch(this.baseUrl + "/checkAccountNumber/" + acc);
  }

  transfer(credit, debit, amount) {
    return fetch(
      this.baseUrl + "/transfer/" + credit + "/" + debit + "/" + amount
    );
  }

  getAllAccounts() {
    return fetch(this.baseUrl + "/getAll");
  }

  delete(id){
    let options={
      method: "DELETE",
    }
    
    return fetch(this.baseUrl + "/deleteAccount/" + id,options);
  }
}
