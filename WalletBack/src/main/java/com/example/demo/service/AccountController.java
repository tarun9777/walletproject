package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exceptions.ApiBalanceException;
import com.example.demo.exceptions.ApiLoginException;
import com.example.demo.exceptions.ApiRequestException;
import com.example.demo.models.Account;
import com.example.demo.models.Transaction;
import com.example.demo.models.UserIdPass;

@RestController
@RequestMapping("/account")
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class AccountController {

	@Autowired
	AccountService ser;

	@PostMapping(value = "/validate")
	public boolean validateAccount(@RequestBody UserIdPass iD_Pass) {
		Account acc = ser.validate(iD_Pass.getCustomerId(), iD_Pass.getPassword());
		if (acc == null) {
			throw new ApiLoginException("invalid id or password");
		} else
			return true;
	}

	@PostMapping(value = "/addAccount")
	public Account addAccount(@RequestBody Account account) {
		double temp1 =(long) ((Math.random() * 900000) + 100000);
		double temp2 = (long) ((Math.random() * 9000) + 1000);
		account.setAccountNumber((long)temp1);
		account.setCustomerId((long)temp2);
		account.setBalance(0l);	
		ser.save(account);
		return ser.getOne(account.getCustomerId());
	}

	@PostMapping("/updateAccount")
	public Account updateAccount(@RequestBody Account account) {
		Account acc = ser.getOne(account.getCustomerId());
		acc.setFirstName(account.getFirstName());
		acc.setLastName(account.getLastName());
		acc.setEmail(account.getEmail());
		acc.setContactNumber(account.getContactNumber());
		ser.save(acc);
		return acc;
	}
	
	@PostMapping("/resetPassword")
	public Account resetPassword(@RequestBody Account account) {
		Account acc = ser.getOne(account.getCustomerId());
		acc.setPassword(account.getPassword());
		ser.save(acc);
		return acc;
	}

	@GetMapping("/getBalance/{id}")
	public Long getBalance(@PathVariable Long id) {
		return ser.getOne(id).getBalance();
	}

	@GetMapping("/checkAccountNumber/{accNum}")
	public Account checkAccountNumber(@PathVariable Long accNum) {
		Account acc = ser.findAccountNumber(accNum);
		if (acc == null) {
			throw new ApiRequestException("invalid account number not found");
		} else
			return acc;
	}

	@GetMapping(value = "/getAccountById/{id}")
	public Account getAccountById(@PathVariable Long id) {
		return ser.getOne(id);

	}

	@GetMapping("/getTransactions/{id}")
	public List<Transaction> getTransactions(@PathVariable Long id) {
		return ser.getOne(id).getTransactions();
	}

	@GetMapping("/deposit/{id}/{amount}")
	public Account deposit(@PathVariable Long id, @PathVariable Long amount) {
		Account acc = ser.getOne(id);
		Transaction t = new Transaction("credit", acc.getAccountNumber(), amount);
		List<Transaction> list = acc.getTransactions();
		list.add(t);
		acc.setTransactions(list);
		acc.setBalance(acc.getBalance() + amount);
		ser.save(acc);
		return ser.getOne(id);
	}

	@GetMapping("/withdraw/{id}/{amount}")
	public Account withdraw(@PathVariable Long id, @PathVariable Long amount) {
		Account acc = ser.getOne(id);
		if (amount > acc.getBalance()) {
			throw new ApiBalanceException("insufficient balance");
		} else {
			Transaction t = new Transaction("debit", acc.getAccountNumber(), amount);
			List<Transaction> list = acc.getTransactions();
			list.add(t);
			acc.setTransactions(list);
			acc.setBalance(acc.getBalance() - amount);
			ser.save(acc);
			return ser.getOne(id);
		}
	}

	@DeleteMapping("/deleteAccount/{id}")
	public boolean deleteAccount(@PathVariable Long id) {
		ser.deleteById(id);
		return true;
	}

	@GetMapping("/transfer/{id1}/{id2}/{amount}")
	public boolean transfer(@PathVariable Long id1, @PathVariable Long id2, @PathVariable Long amount) {
		withdraw(id2, amount);
		deposit(id1, amount);
		return true;
	}
	
	@GetMapping("/getAll")
	public List<Account> getAllAccounts(){
		return ser.findAll();
	}
}
