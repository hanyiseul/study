package controlLoop;

public class Switch {
    public static void main(String[] args) {
        int menu = 2; // 2이므로

        switch (menu) {
            case 1:
                System.out.println("회원 조회");
                break;
            case 2: // 이 코드 실행
                System.out.println("회원 등록");
                break; // switch 문을 빠져나가게 함
            case 3:
                System.out.println("회원 삭제");
                break;
            default: // 어떤 case도 해당하지 않을 때 실행
                System.out.println("잘못된 메뉴입니다.");
        }
    }
}
