package errorException;

public class ThrowException {
    public static void main(String[] args) {
        try {
            validateAge(-5);
            System.out.println("정상 입력입니다.");
        } catch (IllegalArgumentException e) {
            System.out.println("입력 오류: " + e.getMessage());
        }
    }

    public static void validateAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("나이는 0보다 작을 수 없습니다.");
        }
    }
}