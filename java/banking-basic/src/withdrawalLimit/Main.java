package withdrawalLimit;

public class Main {
    public static void main(String[] args) {
        int balance = 500000; // state
        int withdrawAmount = 200000; // input
        int todayWithdrawTotal = 900000; // state
        int dailyLimit = 1000000; // state
        String transactionStatus = "READY"; // state

        if (withdrawAmount <= 0) { // fail 설계
            transactionStatus = "FAILED";
            System.out.println("출금 금액은 0보다 커야 합니다."); // output
        } else if (withdrawAmount > balance) { // fail 설계
            transactionStatus = "FAILED";
            System.out.println("잔액이 부족합니다."); // output
        } else if (todayWithdrawTotal + withdrawAmount > dailyLimit) { // fail 설계
            transactionStatus = "FAILED";
            System.out.println("일일 출금 한도를 초과했습니다."); // output
            System.out.println("오늘 출금 누적액: " + todayWithdrawTotal); // output
            System.out.println("일일 출금 한도: " + dailyLimit); // output
        } else {
            balance = balance - withdrawAmount; // state
            todayWithdrawTotal = todayWithdrawTotal + withdrawAmount; // state
            transactionStatus = "SUCCESS";

            System.out.println("출금이 완료되었습니다."); // output
            System.out.println("출금 후 잔액: " + balance); // output
            System.out.println("오늘 출금 누적액: " + todayWithdrawTotal); // output
        }

        System.out.println("거래 상태: " + transactionStatus);
    }
}
