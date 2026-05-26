// 비밀번호 인코딩하는 클래스
package com.example.memberapi.component; // 유틸성 객체, 공통 기능, 도구 클래스

import org.springframework.stereotype.Component;

@Component // 이 객체를 spring bean으로 등록
public class SimplePasswordEncoder {

    // rawPassword : 가공 안된 평문 비밀번호를 매개변수로 받음
    public String encode(String rawPassword) {
        return "encoded-" + rawPassword; // 학습용 임의 해시비밀번호
    }
}