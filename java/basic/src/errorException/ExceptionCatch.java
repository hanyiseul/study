package errorException;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;

public class ExceptionCatch {
    public static void main(String[] args) {
        try {
            int result = divide(10, 0);
            System.out.println("결과: " + result);
        } catch (ArithmeticException e) {
            writeErrorLog("나눗셈 처리 중 오류 발생", e);
            System.out.println("오류가 발생했습니다. error.log 파일을 확인하세요.");
        }
    }

    public static int divide(int a, int b) {
        if (b == 0) {
            throw new ArithmeticException("0으로 나눌 수 없습니다.");
        }

        return a / b;
    }

    public static void writeErrorLog(String message, Exception e) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("basic/src/errorException/error.log", true))) {
            writer.write("시간: " + LocalDateTime.now());
            writer.newLine();
            writer.write("메시지: " + message);
            writer.newLine();
            writer.write("예외 타입: " + e.getClass().getName());
            writer.newLine();
            writer.write("예외 메시지: " + e.getMessage());
            writer.newLine();
            writer.write("--------------------");
            writer.newLine();
        } catch (IOException logException) {
            System.out.println("로그 파일 저장 중 오류가 발생했습니다.");
        }
    }
}
