package com.gigi.server.exception;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateException.class)
    public ResponseEntity<String> handleDuplicateNameException(DuplicateException e) {
        String error = e.getMessage();
        return new ResponseEntity<>(error, HttpStatus.CONFLICT); // 409
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationException(MethodArgumentNotValidException e) {
        BindingResult bindingResult = e.getBindingResult();
        String error = bindingResult.getFieldErrors().get(0).getDefaultMessage();
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleNotFoundException(EntityNotFoundException e) {
        String error = e.getMessage();
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}