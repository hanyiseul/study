package com.example.corestatedemo.member;

import org.springframework.stereotype.Repository;

@Repository
public class MemberRepository {

    public MemberRepository() {
        System.out.println("MemberRepository 생성자 실행: Repository Bean 생성");
    }

    public String findNameById(Long id) {
        System.out.println("MemberRepository.findNameById 실행: 데이터 조회 역할 수행");
        return "홍길동-" + id;
    }
}