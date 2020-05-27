package com.example.demo.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.example.demo.models.Account;
import com.example.demo.models.Transaction;

@RunWith(SpringJUnit4ClassRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
class AccountControllerTest {
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private AccountService ser;
	
	private Account getAccount() {
		Account acc = new Account();
		acc.setAccountNumber(456789l);
		acc.setBalance(1000l);
		acc.setContactNumber(987654321l);
		acc.setCustomerId(123456l);
		acc.setEmail("test@junit.com");
		acc.setFirstName("junit");
		acc.setLastName("test");
		acc.setPassword("test");
		Transaction t1 = new Transaction("credit", 456789l, 1000l);
		Transaction t2 = new Transaction("debit", 456789l, 500l);
		List<Transaction> list = new ArrayList<Transaction>();
		list.add(t1);
		list.add(t2);
		acc.setTransactions(list);
		return acc;
	}

	@Test
	void testAddAccount() {
		Account acc = getAccount();
		Account savedAccount = ser.save(acc);
		Account emAccount = entityManager.find(Account.class, savedAccount.getCustomerId());
		assertThat(savedAccount).isEqualToComparingFieldByField(emAccount);
	}

	@Test
	void testGetBalance() {
		Account acc = getAccount();
		Account emAccount = entityManager.persist(acc);
		Long savedbalance = ser.getOne(acc.getCustomerId()).getBalance();
		assertThat(acc.getBalance()).isEqualTo(savedbalance);
	}

	@Test
	void testCheckAccountNumber() {
		Account acc = getAccount();
		Account emAccount = entityManager.persist(acc);
		long emAccountNumber = acc.getAccountNumber();
		long savedAccountNumber = ser.findAccountNumber(acc.getAccountNumber()).getAccountNumber();
		assertThat(savedAccountNumber).isEqualTo(emAccountNumber);	
	}

	@Test
	void testGetAccountById() {
		Account acc = getAccount();
		Account emAccount = entityManager.persist(acc);
		Account retrivedAccount = ser.getOne(acc.getCustomerId());
		assertThat(retrivedAccount).isEqualToComparingFieldByField(emAccount);
	}

	@Test
	void testGetTransactions() {
		Account acc = getAccount();
		Account emAccount = entityManager.persist(acc);
		Account savedAccount = ser.getOne(acc.getCustomerId());
		assertThat(savedAccount.getTransactions()).isEqualTo(acc.getTransactions());
		
	}

}
