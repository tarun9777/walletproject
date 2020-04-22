package com.example.demo.models;

import org.springframework.stereotype.Component;

@Component
public class UserIdPass {
	private Long customerId;
	private String password;

	public UserIdPass() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserIdPass(Long customerId, String password) {
		super();
		this.customerId = customerId;
		this.password = password;
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "UserIdPass [customerId=" + customerId + ", password=" + password + "]";
	}

}
