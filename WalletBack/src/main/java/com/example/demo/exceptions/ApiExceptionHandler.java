package com.example.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApiExceptionHandler {
	
	@ExceptionHandler(value= {ApiRequestException.class})
	public ResponseEntity<ApiException> handleApiRequestException(ApiRequestException e) {
		ApiException apiException =  new ApiException(e.getMessage(), HttpStatus.NOT_FOUND);
		return new ResponseEntity<ApiException>(apiException, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(value = {ApiLoginException.class})
	public ResponseEntity<ApiException> handleApiLoginException(ApiLoginException e){
		ApiException apiException = new ApiException(e.getMessage(), HttpStatus.NOT_FOUND);
		return new ResponseEntity<ApiException>(apiException, HttpStatus.NOT_FOUND);
	}
	
	public ResponseEntity<ApiException> handleApiBalanceException(ApiBalanceException e){
		ApiException apiException = new ApiException(e.getMessage(), HttpStatus.NOT_FOUND);
		return new ResponseEntity<ApiException>(apiException,HttpStatus.NOT_FOUND);
	}

}
