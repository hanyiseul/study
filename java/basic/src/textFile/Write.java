package textFile;

import java.io.FileWriter; // 파일에 문자열을 작성할 때 사용하는 클래스
import java.io.IOException; // 파일 입출력 중 발생할 수 있는 예외 클래스를 가져옴 (파일 경로 문제, 권한 문제 등이 발생하면 사용됨)

public class Write {
    public static void main(String[] args) {
        FileWriter writer = null;

        try {
            writer = new FileWriter("basic/src/textFile/log.txt");
            writer.write("프로그램이 시작되었습니다.\n");
            writer.write("파일 쓰기 테스트입니다.\n");
        } catch (IOException e) {
            System.out.println("파일 쓰기 중 오류가 발생했습니다.");
            System.out.println(e.getMessage());
        } finally {
            try {
                if (writer != null) {
                    writer.close();
                }
            } catch (IOException e) {
                System.out.println("파일 닫기 중 오류가 발생했습니다.");
            }
        }
    }
}