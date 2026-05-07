/**
 * 파이프라인
 * 1. 회원 가입 요청
 * 2. 아이디/비밀번호 가져오기
 * 3. 비밀번호 암호화
 * 4. 회원 테이블 저장
 * 5. 권한 객체 생성
 * 6. 권한 테이블 저장
 * 7. 결과 반환
 */

package com.signup.security.service; // 이 클래스가 속한 패키지(폴더 구조) 지정

// 스프링부트 라이브러리 임폴트
import org.springframework.stereotype.Service; // @Service 어노테이션 사용
import org.springframework.transaction.annotation.Transactional; // db를 원래 상태로 되돌리는 역할 (원자성)
import org.springframework.security.crypto.password.PasswordEncoder; // 비밀번호 암호화 클래스
// import org.springframework.beans.factory.annotation.Autowired;

// dto 클래스 임폴트 (데이터를 담는 객체)
import com.signup.security.dto.UserAuth;
import com.signup.security.dto.Users;

import com.signup.security.mapper.UserMapper; // db랑 연결하는 객체

// 롬복 라이브러리 임폴트
import lombok.RequiredArgsConstructor;

@Service // 이 클래스는 서비스 객체라는 것을 알려주는 것 -> Spring이 자동으로 객체 생성해서 관리해줌
@RequiredArgsConstructor // final 붙은 변수들 생성자 자동 생성

// 인터페이스 : 이 기능들을 반드시 구현해라
public class UserServiceImpl implements UserService { // UswerService 인터페이스 구현 클래스

    // @Autowired private UserMapper userMapper; // @Autowired : 의존성 주입 방식
    // @Autowired private PasswordEncoder passwordEncoder;

    // 의존성 주입(다른 객체를 가져다 쓰는 것)
    // final : 한번만 초기화 가능(안정성 증가, 객체 변경 방지)
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    // 회원 조회 메서드
    @Override // 부모 인터페이스 메서드 재정의 (UserSerivce에 있는 메서드 구현)
    public Users select(String username) throws Exception { // throws Exception : 예외 발생 가능
        Users user = userMapper.select(username); // Mapper를 통해 DB 조회
        return user; // 조회한 회원 반환
    }

    // 회원 가입 절차
    @Override // 부모 인터페이스에 있는 메서드 구현 (UserMapper.java -> UserService.java -> UserServiceImpl.java)
    @Transactional // 회원가입 도중 문제 생기면 전부 취소 시킴
    public int join(Users user) throws Exception {
        // getter : 객체 내부 값 꺼내는 메서드  
        String username = user.getUsername(); // user 객체 안에 있는 username 꺼내기
        String password = user.getPassword(); // user 객체 안에 있는 password 꺼내기
        // 123456 -> 🔒 F123N905123890N3138932N4 (암호화)
        String encodedPassword = passwordEncoder.encode(password);  // 🔒 비밀번호 암호화
        // setter : 객체값 수정
        user.setPassword(encodedPassword); 

        // getter/setter 사용 이유 : 객체지향에서 데이터 보호하기 위해서

        // 회원 등록
        int result = userMapper.join(user); // db에 회원 저장 요청 (반환값 성공하면 1, 실패하면 0)

        // 성공 여부 확인
        if( result > 0 ) { // 성공이면 1이라 true
          // 회원 기본 권한 등록
          // new : 객체 생성 키워드
          // 객체 생성시 새로운 UserAuth 생김
          UserAuth userAuth = new UserAuth(); // 권한 저장용 객체 생성
          userAuth.setUsername(username); // 누구 권한인지 저장
          // ROLE_USER : Spring Security 권한 이름
          userAuth.setAuth("ROLE_USER"); // 기본 회원 권한 부여
          result = userMapper.insertAuth(userAuth); // 권한 테이블 저장
        }
        return result; // 최종 결과 반환
    }

    // 회원 정보 수정
    @Override // 부모 인터페이스(UserService)에 있는 메서드 재정의
    public int update(Users user) throws Exception {
        // 비밀번호 변경하는 경우 암호화 처리
        String password = user.getPassword();
        if( password != null && !password.isEmpty() ) {
          String encodedPassword = passwordEncoder.encode(password);  // 🔒 비밀번호 암호화
          user.setPassword(encodedPassword);
        }
        int result = userMapper.update(user);
        return result;
    }

    @Override
    public int insertAuth(UserAuth userAuth) throws Exception {
        int result = userMapper.insertAuth(userAuth);
        return result;
    }
    
}


/**
 * @RequiredArgsConstructor : final 붙은 변수들 생성자 자동 생성
 * 
 * 원래
 *  // final 선언 (의존성 주입) -> 한번만 초기화 가능
 *  private final UserMapper userMapper;
 *  private final PasswordEncoder passwordEncoder;
 * 
 *  // 생성자
 *  public UserServiceImpl(UserMapper userMapper, PasswordEncoder passwordEncoder) {
 *    this.userMapper = userMapper;
 *    this.passwordEncoder = passwordEncoder;
 *  }
 */