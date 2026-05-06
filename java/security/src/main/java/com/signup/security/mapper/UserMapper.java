@Mapper // Mybatis Mapper 명시 -> Spring 실행 시 이 인터페이스를 구현체로 자동 생성

// UserMapper 인터페이스 : 회원 관련 DB 작업을 위한 메서드 선언
public interface UserMapper { // DB에 어떤 sql 실행할지 목록 적는 곳

    // 회원 조회
    public Users select(String id) throws Exception;

    // 회원 가입
    public int join(Users user) throws Exception;

    // 회원 수정
    public int update(Users user) throws Exception;

    // 회원 권한 등록
    public int insertAuth(UserAuth userAuth) throws Exception;

}

/**
 * - MyBatis Mapper 인터페이스
 *  @Mapper
 * 
 * - 직접 구현 클래스
 *  class UserMapperImpl imolements UserMapper
 */

/**
 * public 반환타입 메서드이름(매개변수) 예외 발생 가능성 선언
 * 
 * public : 어디서든 호출 가능
 * Users : 반환 타입 (회원 조회 결과를 Users 객체로 반환)
 * select : 메서드 이름 
 * (String id) : 매개변수 -> 조회 조건 전달
 * throws Exception : 예외 발생 가능성 선언 -> DB 작업 중 예외 발생할 수 있으므로 예외 처리 필요
 */

/**
 * 실제 동작 흐름
 * userMapper,select("admin"); 
 * -> MyBatis가 xml 찾음
 * -> <select id="select" resultMap="UserMap"> 쿼리 실행
 * -> Users 객체 반환
 */