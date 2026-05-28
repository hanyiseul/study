package ByteStream;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class CopyFile {
    public static void main(String[] args) {
        try (
                FileInputStream input = new FileInputStream("basic/src/ByteStream/source.dat");
                FileOutputStream output = new FileOutputStream("basic/src/ByteStream/copy.dat")
        ) {
            int data;

            while ((data = input.read()) != -1) {
                output.write(data);
            }

            System.out.println("파일 복사가 완료되었습니다.");
        } catch (IOException e) {
            System.out.println("파일 복사 중 오류가 발생했습니다.");
            System.out.println(e.getMessage());
        }
    }
}