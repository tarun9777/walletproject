package com.example.demo.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import com.example.demo.models.Account;
import com.example.demo.models.UserIdPass;

@Component
public interface AccountService extends JpaRepository<Account, Long> {
	
	@Query("select a from Account a where a.accountNumber = ?1")
	Account findAccountNumber(Long accountNumber);
	
	@Query("select a from Account a where a.customerId = ?1 and a.password = ?2")
	Account validate(Long id,String pass);
	
}
