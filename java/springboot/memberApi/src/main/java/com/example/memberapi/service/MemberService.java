// service : 업무 규칙 처리
package com.example.memberapi.service;

import com.example.memberapi.component.SimplePasswordEncoder;
import com.example.memberapi.domain.Member;
import com.example.memberapi.dto.MemberCreateRequest;
import com.example.memberapi.dto.MemberResponse;
import com.example.memberapi.dto.MemberUpdateRequest;
import com.example.memberapi.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service // 이 클래스가 업무 로직 계층이라는 뜻
public class MemberService { // 회원 업무 처리 클래스

    private final MemberRepository memberRepository; // db 처리 객체 저장
    private final SimplePasswordEncoder passwordEncoder; // 비밀번호 암호화 객체 저장

    // 생성자 주입
    public MemberService(
            MemberRepository memberRepository,
            SimplePasswordEncoder passwordEncoder
    ) {
        this.memberRepository = memberRepository; // 전달 받은 객체 저장
        this.passwordEncoder = passwordEncoder; // 전달 받은 객체 저장
    }

    public List<MemberResponse> findAll() { // 회원 전체 조회
        return memberRepository.findAll() // db 조회 : repository 호출
                .stream() // 리스트 가공
                .map(MemberResponse::from) // Member 하나씩 꺼내서 MemberResponse로 변환
                .toList(); // 다시 리스트로 변환
        // MemberResponse::from: 메서드 참조 문법 (member -> MemberResponse.from(member))
    }

    public MemberResponse findById(Long id) { // 회원 1명 조회
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다. id=" + id)); // 값 없으면 예외 객체 만들어서 예외 발생
        // () -> new IllegalArgumentException(...) : 람다 문법
        return MemberResponse.from(member);
    }

    @Transactional // 이 메서드의 db 작업을 하나의 트랜잭션으로 묶음
    public MemberResponse create(MemberCreateRequest request) {
        memberRepository.findByEmail(request.getEmail()) // 이메일 조회
                .ifPresent(member -> { // 회원 존재하면 실행
                    throw new IllegalArgumentException("이미 사용 중인 이메일입니다."); // 중복시 예외 : 회원 생성 중단
                });
        // curl -X POST http://localhost:3100/api/members -H "Content-Type: application/json" -d "{\"email\":\"newuser@test.com\",\"name\":\"중복회원\",\"password\":\"1234\"}"

        String encodedPassword =
                passwordEncoder.encode(request.getPassword()); // 평문 비밀번호 변환

        // DB INSERT
        Member savedMember = memberRepository.save(
                request.getEmail(),
                request.getName(),
                encodedPassword
        );

        // 회원 생성 기록 저장 (로그 저장)
        memberRepository.insertLog(
                savedMember.getId(),
                "CREATE",
                savedMember.getName() + " 회원 생성"
        );

        return MemberResponse.from(savedMember); // 응답 DTO 반환
    }

    @Transactional
    public MemberResponse update(Long id, MemberUpdateRequest request) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("수정할 회원을 찾을 수 없습니다. id=" + id));

        memberRepository.update(
                id,
                request.getName(),
                request.getStatus()
        );

        memberRepository.insertLog(
                id,
                "UPDATE",
                member.getName() + " 회원 정보 수정"
        );

        return findById(id); // 수정 후 최신 정보 다시 조회해서 반환
    }

    @Transactional
    public MemberResponse increaseLoginCount(Long id) { // 로그인 횟수 증가
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("로그인 처리할 회원을 찾을 수 없습니다. id=" + id));

        memberRepository.increaseLoginCount(id);

        memberRepository.insertLog(
                id,
                "LOGIN",
                member.getName() + " 로그인 횟수 증가"
        );

        return findById(id);
    }

    @Transactional
    public void delete(Long id) { // 회원 삭제
        Member member = memberRepository.findById(id)
                // orElseThrow : 없으면 예외 던져 (Optional 클래스 메서드)
                .orElseThrow(() -> new IllegalArgumentException("삭제할 회원을 찾을 수 없습니다. id=" + id));

        memberRepository.insertLog(
                id,
                "DELETE",
                member.getName() + " 회원 삭제"
        );

        memberRepository.deleteById(id);
    }
}

/**
 * 람다식 : 이름 없는 함수 (함수를 변수처럼 전달 가능)
 * () -> 실행코드 : 나중에 실행할 코드
 */