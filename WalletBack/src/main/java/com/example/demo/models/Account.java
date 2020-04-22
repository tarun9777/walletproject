package com.example.demo.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "accounts",schema = "hr")
@JsonIgnoreProperties({ "hibernateLazyInitializer" })
public class Account implements Serializable {
	
	private static final long serialVersionUID = -5605160730919931731L;

	@Id
	private Long customerId;
	
	private String password;
	
	private Long accountNumber;

	private String firstName;

	private String lastName;

	@JsonIgnore
	private Long balance;

	private String email;

	private Long contactNumber;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "cust_id")
	@JsonIgnore
	private List<Transaction> transactions = new ArrayList<Transaction>();

	public Account() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Account(String password, String firstName, String lastName,
			Long balance, Long contactNumber, String email) {
		super();
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.balance = balance;
		this.contactNumber = contactNumber;
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public Long getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(Long accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Long getBalance() {
		return balance;
	}

	public void setBalance(Long balance) {
		this.balance = balance;
	}

	public Long getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(Long contactNumber) {
		this.contactNumber = contactNumber;
	}

	public List<Transaction> getTransactions() {
		return transactions;
	}

	public void setTransactions(List<Transaction> transactions) {
		this.transactions = transactions;
	}

	@Override
	public String toString() {
		return "Account [customerId=" + customerId + ", password=" + password + ", accountNumber=" + accountNumber
				+ ", firstName=" + firstName + ", lastName=" + lastName + ", balance=" + balance + ", contactNumber="
				+ contactNumber + "]";
	}

}
