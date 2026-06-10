package com.example.backend.share.exception;

// RuntimeException을 상속받는 사용자 정의 예외 클래스
// 프로젝트에서 발생하는 비즈니스 예외를 처리하기 위해 사용
public class CustomException extends RuntimeException {

    // 어떤 종류의 예외인지 저장
    // MEMBER_NOT_FOUND, PRODUCT_NOT_FOUND 등
    private final ErrorCode errorCode;

    // 예외 객체 생성 시 ErrorCode를 전달받음
    public CustomException(ErrorCode errorCode) {

        // 부모 클래스(RuntimeException)의 message 필드에
        // ErrorCode에 저장된 메시지를 넣어줌
        // 예: "회원을 찾을 수 없습니다."
        super(errorCode.getMessage());

        // 전달받은 ErrorCode를 현재 객체에 저장
        this.errorCode = errorCode;
    }

    // 저장된 ErrorCode를 반환
    // 예외 처리 시 어떤 에러인지 확인하기 위해 사용
    public ErrorCode getErrorCode() {
        return errorCode;
    }
}