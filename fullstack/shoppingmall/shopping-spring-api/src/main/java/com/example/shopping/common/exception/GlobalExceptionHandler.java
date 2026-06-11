package com.example.shopping.common.exception;

import com.example.shopping.common.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> badRequest(IllegalArgumentException e) { return ResponseEntity.badRequest().body(ErrorResponse.of(e.getMessage())); }
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ErrorResponse> conflict(IllegalStateException e) { return ResponseEntity.status(HttpStatus.CONFLICT).body(ErrorResponse.of(e.getMessage())); }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> badCredential(BadCredentialsException e) { return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ErrorResponse.of("이메일 또는 비밀번호가 올바르지 않습니다.")); }
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> forbidden(AccessDeniedException e) { return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ErrorResponse.of("접근 권한이 없습니다.")); }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> invalid(MethodArgumentNotValidException e) { return ResponseEntity.badRequest().body(ErrorResponse.of("입력값을 확인하십시오.")); }
}
