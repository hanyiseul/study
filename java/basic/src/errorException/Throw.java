package errorException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Throw {
    public static void main(String[] args) {
        try {
            String content = readFile("data.txt");
            System.out.println(content);
        } catch (IOException e) {
            System.out.println("파일을 읽을 수 없습니다.");
            System.out.println(e.getMessage());
        }
    }

    public static String readFile(String path) throws IOException {
        return Files.readString(Path.of(path));
    }
}
