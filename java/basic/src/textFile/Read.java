package textFile;

import java.io.FileReader;
import java.io.IOException;

public class Read {
    public static void main(String[] args) {
        try (FileReader reader = new FileReader("basic/src/textFile/log.txt")) {
            int data;

            while ((data = reader.read()) != -1) {
                System.out.print((char) data);
            }
        } catch (IOException e) {
            System.out.println("파일 읽기 중 오류가 발생했습니다.");
            System.out.println(e.getMessage());
        }
    }
}