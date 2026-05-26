package controlLoop;

public class Continue {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            if (i == 3) {
                continue; // 조건이 참일 때 현재 반복 건너뜀
            }

            System.out.println(i);
        }
    }
}
