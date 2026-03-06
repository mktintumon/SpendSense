package com.expenseTracker.exception;

public class ResourceNotFoundException extends  RuntimeException{

    // CUSTOM EXCEPTION
    public ResourceNotFoundException(String message){
        super(message);
    }
}
