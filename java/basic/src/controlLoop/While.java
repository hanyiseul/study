package controlLoop;

public class While {
    public static void main(String[] args) {
        int count1 = 1;

        while (count1 <= 5) {
            System.out.println(count1 + "번째 실행");
            count1++;
        }

        // while문과 조건 변화
        int money = 10000;
        int price = 2500;
        int count2 = 0;

        while (money >= price) {
            money = money - price;
            count2++;
        }

        System.out.println("구매 수량: " + count2);
        System.out.println("남은 금액: " + money);
    }
}
