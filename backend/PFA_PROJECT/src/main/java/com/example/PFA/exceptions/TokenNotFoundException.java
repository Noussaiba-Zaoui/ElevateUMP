package com.example.PFA.exceptions;

public class TokenNotFoundException extends RuntimeException {

    public TokenNotFoundException(String message) {
        super(message);
    }
}