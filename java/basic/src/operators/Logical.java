package operators;

public class Logical {
    public static void main(String[] args) {
        int age = 25;
        boolean hasTicket = true;

        if (age >= 19 && hasTicket == true) { // 둘 다 참
            System.out.println("입장 가능합니다.");
        } else {
            System.out.println("입장할 수 없습니다.");
        }


        if (age >= 19 || hasTicket == true) { // 둘 중 하나라도
            System.out.println("입장 가능합니다.");
        } else {
            System.out.println("입장할 수 없습니다.");
        }

        if (!hasTicket) {
            System.out.println("false 상태입니다");
        }
    }
}
