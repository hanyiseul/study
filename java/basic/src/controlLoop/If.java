package controlLoop;

public class If {
    public static void main(String[] args) {
        int score = 85;

        if (score >= 80) { // 조건이 참일 때만 특정 코드 실
            System.out.println("좋은 점수입니다.");
        }

        System.out.println("프로그램 종료"); // false 시 실
    }
}
