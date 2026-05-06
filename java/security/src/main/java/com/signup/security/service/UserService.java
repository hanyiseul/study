// 회원 관련 비즈니스 기능 정의 (비즈니스 로직 담당)
// 비밀번호 암호화, 권한 추가, 중복 검사 등 회원 관련 기능 구현

// 인터페이스 : 기능으 규칙(설계도)만 정의한 것
public interface UserService { // userService 인터페이스
    
    // 조회
    public Users select(String username) throws Exception;

    // 회원 가입
    public int join(Users user) throws Exception;

    // 회원 수정
    public int update(Users user) throws Exception;

    // 회원 권한 등록
    public int insertAuth(UserAuth userAuth) throws Exception;

}
