package com.example.demo.exceptions;

import org.springframework.http.HttpStatus;

public class ApiException {
	private final String message;
	private final HttpStatus httpStatus;

	public ApiException(String message, HttpStatus httpStatus) {
		super();
		this.message = message;
		this.httpStatus = httpStatus;
	}

	public String getMessage() {
		return message;
	}

	public HttpStatus getHttpStatus() {
		return httpStatus;
	}
}
