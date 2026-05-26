package withdrawal;

public class Main {
    public static void main(String[] args) {
        String accountNumber = "100-200-300";
        int balance  = 1000000;
        int withdrawAmount = 120000;
        boolean accountActive = true;

        if(!accountActive) {
            System.out.println("거래 불가능 계좌");
        } else if(withdrawAmount > balance) {
            System.out.println("잔액 부족");
            System.out.println("현재 잔액" + balance);
        } else {
            balance = balance - withdrawAmount;

            System.out.println("출금 완료");
            System.out.println("계좌번호 : " + accountNumber);
            System.out.println("출금 완료 : " + balance);
        }
    }
}
