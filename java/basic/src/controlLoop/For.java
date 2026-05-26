package controlLoop;

public class For {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) { // 반복을 시작할 때 사용할 변수의 초기값
            System.out.println(i + "번째 실행");
        }

        // for문을 이용한 합계 계산
        int total = 0;
        for (int i = 1; i <= 10; i++) {
            total = total + i;
        }
        System.out.println("1부터 10까지의 합계: " + total);
    }

}
