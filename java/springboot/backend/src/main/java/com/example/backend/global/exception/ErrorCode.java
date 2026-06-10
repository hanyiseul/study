package com.example.backend.share.exception;

// HTTP 상태코드(200, 400, 404 등)를 사용하기 위한 import
import org.springframework.http.HttpStatus;


// enum = 정해진 상수들의 집합
// 프로젝트에서 사용할 에러 종류를 미리 정의
public enum ErrorCode {

    // 회원을 찾지 못했을 때 사용할 에러
    // HTTP 상태코드 : 404 NOT_FOUND
    // 메시지 : 회원을 찾을 수 없습니다.
    MEMBER_NOT_FOUND(
            HttpStatus.NOT_FOUND,
            "회원을 찾을 수 없습니다."
    ),

    // 상품을 찾지 못했을 때 사용할 에러
    PRODUCT_NOT_FOUND(
            HttpStatus.NOT_FOUND,
            "상품을 찾을 수 없습니다."
    ),

    // 요청값이 잘못되었을 때 사용할 에러
    INVALID_REQUEST(
            HttpStatus.BAD_REQUEST,
            "잘못된 요청입니다."
    );

    // HTTP 상태코드 저장
    // 예: 404, 400
    private final HttpStatus status;

    // 사용자에게 보여줄 에러 메시지 저장
    private final String message;


    // enum 생성자
    // enum 객체 생성 시 status와 message를 초기화
    ErrorCode(
            HttpStatus status,
            String message
    ) {

        // 전달받은 상태코드 저장
        this.status = status;

        // 전달받은 메시지 저장
        this.message = message;
    }


    // 상태코드 반환
    public HttpStatus getStatus() {
        return status;
    }

    // 메시지 반환
    public String getMessage() {
        return message;
    }
}