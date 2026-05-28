package errorException;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;

public class ExceptionHandler {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (ArithmeticException e) {
            writeErrorLog("계산 오류 발생", e);
            System.out.println("처리 중 오류가 발생했습니다. 로그를 확인하세요.");
        }
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