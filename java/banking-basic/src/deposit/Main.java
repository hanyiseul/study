package deposit;

public class Main {
    public static void main(String[] args) {
        String accountNumber = "100-200-300"; // input
        int balance = 100000; // state
        int depositAmount = 50000;  // input
        boolean accountActive = true; // state

        if(!accountActive) {
            System.out.println("거래 불가능 계좌"); // fail
        } else if(depositAmount <= 0) {
            System.out.println("입금 금액은 0보다 커야함"); // fail
        } else {
            balance = balance + depositAmount;

            System.out.println("입금 완료"); // output
            System.out.println("계좌번호" + accountNumber); // output
            System.out.println("입금 후 잔액: " + balance); // output
        }
    }
}
