package errorException;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("숫자를 입력하세요: ");
        String input = scanner.nextLine();

        try {
            int number = Integer.parseInt(input);
            System.out.println("입력한 숫자: " + number);
        } catch (NumberFormatException e) {
            System.out.println("숫자만 입력할 수 있습니다.");
        }
    }
}