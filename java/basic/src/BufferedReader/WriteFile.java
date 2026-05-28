package BufferedReader;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class WriteFile {
    public static void main(String[] args) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("result.txt"))) {
            writer.write("회원 목록");
            writer.newLine();
            writer.write("홍길동");
            writer.newLine();
            writer.write("김영희");
            writer.newLine();
        } catch (IOException e) {
            System.out.println("파일 쓰기 중 오류가 발생했습니다.");
            System.out.println(e.getMessage());
        }
    }
}