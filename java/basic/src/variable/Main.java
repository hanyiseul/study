package variable;

public class Main {
    public static void main(String[] args) {
        int age = 25; // 정수형 변수
        String name = "이영희"; // 문자열 변수
        double height = 162.5; // 실수형 변수
        boolean isStudent = true; // 논리형 변

        System.out.println(name);
        System.out.println(age);
        System.out.println(height);
        System.out.println(isStudent);

        // 문자열과 변수 함께 출력 가능 (+ : 숫자끼리는 덧셈 / 문자열과 숫자는 이어붙임)
        System.out.println("이름: " + name);
        System.out.println("나이: " + age);

        // 변수값 변경
        int score = 70;
        System.out.println("변경 전 점수: " + score); // score: 70

        score = 90;
        System.out.println("변경 후 점수: " + score); // score: 90
    }
}