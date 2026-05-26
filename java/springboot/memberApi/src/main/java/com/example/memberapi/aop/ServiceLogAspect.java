// AOP : Service 실행 전/후에 공통 로그 자동 출력 (공통 기능을 따로 분리해서 자동 적용)
// ex) 로그, 실행 시간 측정, 권한 검사, 트랜잭션
package com.example.memberapi.aop;

import org.aspectj.lang.ProceedingJoinPoint; // 현재 실행 중인 메서드 정보 객체
import org.aspectj.lang.annotation.Around; // 메서드 실행 전후 감싸기 aop 어노테이션
import org.aspectj.lang.annotation.Aspect; // aop 클래스 선언용
import org.springframework.stereotype.Component; // bean 등록용

@Aspect // 이 클래스는 AOP 처리 클래스임을 명시
@Component // spring bean 등록 (스프링이 객체 생성)
public class ServiceLogAspect { // service 로그 처리 클래스
    // @Around : 메서드 실행 전 + 후 둘 다 개입
    @Around("execution(* com.example.memberapi.service..*(..))") // AOP 적용 대상 지정
    public Object logServiceExecution(
            ProceedingJoinPoint joinPoint // 현재 실행 중인 메서드 정보 객체 (메서드 이름, 파라미터, 실제 실행 등)
    ) throws Throwable { // throws Throwable : 예외 발생 가능하다는 의미

        long start = System.currentTimeMillis(); // 시간 시작 저장
        // System.currentTimeMillis() : 현재 시간을 밀리초(ms)로 반환

        // joinPoint.getSignature() : 현재 실행 메서드 정보
        System.out.println("[Service 시작] " + joinPoint.getSignature().getName()); // getName(): 메서드 호출

        // Object result : 원래 메서드 반환값 저장
        Object result = joinPoint.proceed(); // 실행시 진짜 create() 실행됨

        long end = System.currentTimeMillis();

        System.out.println(
                "[Service 종료] "
                        + joinPoint.getSignature().getName()
                        + " 실행 시간: "
                        + (end - start)
                        + "ms"
        );

        return result; // 원래 메서드 결과 다시 반환 (AOP가 중간에서 가로챘기 때문에 반환값 다시 넘겨줘야 정상 동작)
    }
}

/**
 * @Aspect : 어노테이션
 * -> 클래스/메서드에 추가 정보 붙이는 문법
 * */

/**
 * 실행 로직
 * AOP 시작
 * ↓
 * 시작 시간 저장
 * ↓
 * 로그 출력
 * ↓
 * 진짜 create() 실행
 * ↓
 * 종료 시간 저장
 * ↓
 * 실행 시간 출력
 * ↓
 * 원래 결과 반환
 * */