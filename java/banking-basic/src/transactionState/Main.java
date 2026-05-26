package transactionState;

// 금융 거래 상태값 설계
public class Main {
    public static void main(String[] args) {
        int balance = 100000;
        int withdrawAmount = 70000;
        boolean accountActive = true;
        String transactionStatus = "READY";

        // 상태변경은 반드시 실패 조건을 모두 통과한 뒤에 수행
        if (!accountActive) { // fail 먼저 설계
            transactionStatus = "FAILED";
            System.out.println("거래할 수 없는 계좌입니다.");
        } else if (withdrawAmount <= 0) { // fail 먼저 설계
            transactionStatus = "FAILED";
            System.out.println("출금 금액은 0보다 커야 합니다.");
        } else if (withdrawAmount > balance) { // fail 먼저 설계
            transactionStatus = "FAILED";
            System.out.println("잔액이 부족합니다.");
        } else {
            balance = balance - withdrawAmount; //  state 변경
            transactionStatus = "SUCCESS"; //  state 변경

            System.out.println("출금이 완료되었습니다."); // output
            System.out.println("출금 후 잔액: " + balance); // output
        }
        // 거래 처리 결과를 내부적으로 표현하고, 마지막에 ouput으로 출력
        System.out.println("거래 상태: " + transactionStatus); // state
    }

}
