package com.signup.security.controller; // 현재 클래스의 패키지 위치

import org.springframework.beans.factory.annotation.Autowired; // 객체 자동 주입 기능
import org.springframework.http.HttpStatus; // HTTP 상태 코드
import org.springframework.http.ResponseEntity; // HTTP 응답 전체를 객체로 반환 -> 상태코드 + 데이터
import org.springframework.stereotype.Controller; // 해당 클래스를 스프링 MVC 컨트롤러로 등록
import org.springframework.web.bind.annotation.GetMapping; // GET 요청 매핑용 어노테이션
import org.springframework.web.bind.annotation.PathVariable; // URL 경로 값을 변수로 받음
import org.springframework.web.bind.annotation.PostMapping; // POST 요청 매핑용 어노테이션
import org.springframework.web.bind.annotation.ResponseBody; // 데이터를 그대로 응답 (화면 반환 x)

import com.signup.security.dto.Users; // Users DTO 클래스 사용
import com.signup.security.service.UserService; // 회원 관련 비즈니스 로직 서비스 사용

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j; // 로그 객체(log) 자동 생성

@Slf4j // log.info() 같은 로그 기능 사용 가능
@Controller // 현재 클래스를 컨트롤러로 등록
@RequiredArgsConstructor // final 필드에 대한 생성자 자동 생성 (의존성 주입)
// HomeCiontroller 클래스 - 메인 화면, 회원 가입 화면, 회원 가입 처리, 아이디 중복 검사 기능 제공
public class HomeController {

  // @Autowired // UserService 객체 자동 주입
  // private UserService userService; // userService의 회원가입/조회 기능 사용
  private final UserService userService; // final로 선언하여 불변 객체로 만듦

  /**
   * 메인 화면
   * 🔗 [GET] - /
   * 📄 index.html
   * 
   * @return
   */
  @GetMapping("") // GET / 요청 처리
  public String home() { // 메인 페이지 처리 메서드
    log.info(":::::::::: 메인 화면 ::::::::::");
    return "index"; // index.html 화면 반환
  }

  /**
   * 회원 가입 화면
   * 🔗 [GET] - /join
   * 📄 join.html
   * 
   * @return
   */
  @GetMapping("/join") // get /join 요청 처리
  public String join() { // 회원가입 페이지 메서드
    log.info(":::::::::: 회원 가입 화면 ::::::::::");
    return "join"; // join.html 화면 반환
  }

  /**
   * 회원 가입 처리
   * 🔗 [POST] - /join
   * ➡ ⭕ /login
   * ❌ /join?error
   * 
   * @param user
   * @return
   * @throws Exception
   */
  @PostMapping("/join") // POST /join 요청 처리
  public String joinPro(Users user) throws Exception { // form 데이터를 Users 객체로 받음
    log.info(":::::::::: 회원 가입 처리 ::::::::::");
    log.info("user : " + user);

    int result = userService.join(user); // 회원가입 서비스 실행

    if (result > 0) { // 회원가입 성공 여부 확인
      return "redirect:/login"; // 성공시 로그인 페이지 이동
    }
    return "redirect:/join?error"; // 실패 시 에러 파라미터와 함께 이동

  }

  /**
   * 아이디 중복 검사
   * 
   * @param username
   * @return
   * @throws Exception
   */
  @ResponseBody // html 말고 데이터 자체 반환
  @GetMapping("/check/{username}") // url 경로의 username 받음
  // @PathVariable("username") : URL 값을 변수로 저장
  public ResponseEntity<Boolean> userCheck(@PathVariable("username") String username) throws Exception {
    log.info("아이디 중복 확인 : " + username);
    Users user = userService.select(username); // username으로 회원 조회
    // 아이디 중복
    if (user != null) { // 이미 존재하는 아이디면
      log.info("중복된 아이디 입니다 - " + username);
      return new ResponseEntity<>(false, HttpStatus.OK); // 중복된 아이디 -> false 반환
    }
    // 사용 가능한 아이디입니다.
    log.info("사용 가능한 아이디 입니다." + username);
    return new ResponseEntity<>(true, HttpStatus.OK); // 사용 가능 아이디 -> true 반환
  }
}

// 전체 흐름
// 브라우저 -> controller -> service -> mapper -> db