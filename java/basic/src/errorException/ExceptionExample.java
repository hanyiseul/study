package errorException;

public class ExceptionExample {
    public static void main(String[] args) {
        Account account = new Account(10000);

        try {
            account.withdraw(20000);
        } catch (InsufficientBalanceException e) {
            System.out.println("출금 실패: " + e.getMessage());
        }
    }
}

class Account {
    private int balance;

    public Account(int balance) {
        this.balance = balance;
    }

    public void withdraw(int amount) throws InsufficientBalanceException {
        if (amount > balance) {
            throw new InsufficientBalanceException("잔액이 부족합니다.");
        }

        balance -= amount;
    }
}

class InsufficientBalanceException extends Exception {
    public InsufficientBalanceException(String message) {
        super(message);
    }
}