package controlLoop;

public class Break {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            if (i == 5) {
                break; // 조건이 참이 되는 순간 반복문 즉시 종료
            }

            System.out.println(i);
        }
    }
}
