package IOSF;

public class IOSF {
    public static void main(String[] args) {
        String fromAccount = "100-111";
        String toAccount = "200-222";

        int fromBalance = 300000; // input
        int toBalance = 50000; // input
        int transferAmount = 100000; // input

        boolean fromAccountActive = true; // state
        boolean toAccountActive = true; // state

        String transactionStatus = "READY"; // state

        if (fromAccount.equals(toAccount)) { // false
            transactionStatus = "FAILED";
            System.out.println("같은 계좌로 이체할 수 없습니다.");
        } else if (!fromAccountActive || !toAccountActive) { // false
            transactionStatus = "FAILED";
            System.out.println("거래할 수 없는 계좌가 포함되어 있습니다.");
        } else if (transferAmount <= 0) { // false
            transactionStatus = "FAILED";
            System.out.println("이체 금액은 0보다 커야 합니다.");
        } else if (transferAmount > fromBalance) { // false
            transactionStatus = "FAILED";
            System.out.println("출금 계좌의 잔액이 부족합니다.");
        } else { // state
            fromBalance = fromBalance - transferAmount;
            toBalance = toBalance + transferAmount;
            transactionStatus = "SUCCESS";

            System.out.println("이체가 완료되었습니다."); // output
            System.out.println("출금 계좌 잔액: " + fromBalance); // output
            System.out.println("입금 계좌 잔액: " + toBalance); // output
        }

        System.out.println("거래 상태: " + transactionStatus); // output
    }
}