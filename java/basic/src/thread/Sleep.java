package thread;

public class Sleep {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println("작업 스레드: " + i);

                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    System.out.println("스레드가 중단되었습니다.");
                }
            }
        });

        thread.start();

        System.out.println("main 스레드 종료");
    }
}