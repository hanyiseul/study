package transactionTotal;

public class Main {
    public static void main(String[] args) {
        int[] deposits = {100000, 50000, -30000, 200000}; // Input
        int totalDeposit = 0; // State
        boolean hasInvalidData = false; // State

        for (int i = 0; i < deposits.length; i++) {
            if (deposits[i] <= 0) { // Fail
                hasInvalidData = true;
                System.out.println("잘못된 입금 데이터 발견: " + deposits[i]); // Output
                continue;
            }

            totalDeposit = totalDeposit + deposits[i];
        }

        System.out.println("정상 입금 합계: " + totalDeposit); // Output
        System.out.println("오류 데이터 존재 여부: " + hasInvalidData); // Output
    }
}
