package BufferedReader;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ReadFile {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("basic/src/BufferedReader/log.txt"))) {
            String line;

            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("파일 읽기 중 오류가 발생했습니다.");
            System.out.println(e.getMessage());
        }
    }
}