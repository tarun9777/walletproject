package com.example.demo.models;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "transactions",schema = "hr")
public class Transaction implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 2925361535707467146L;

	@Id
	@GeneratedValue
	private Long transactionId;

	private String transactionType;

	private Long accountNumber;

	private Long amount;

	public Transaction() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Transaction(String transactionType, Long accountNumber, Long amount) {
		super();
		
		this.transactionType = transactionType;
		this.accountNumber = accountNumber;
		this.amount = amount;
	}

	public Long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}

	public String getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}

	public Long getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(Long accountNumber) {
		this.accountNumber = accountNumber;
	}

	public Long getAmount() {
		return amount;
	}

	public void setAmount(Long amount) {
		this.amount = amount;
	}

	@Override
	public String toString() {
		return "Transaction [transactionId=" + transactionId + ", transactionType=" + transactionType
				+ ", accountNumber=" + accountNumber + ", amount=" + amount + ", custId=" + "]";
	}

}
