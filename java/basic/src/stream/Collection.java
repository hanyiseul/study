package stream;

/**
 * 파이프라인
 * 주문 데이터 생성
 * ↓
 * 전체 출력
 * ↓
 * 조건 필터링
 * ↓
 * 총합 계산
 * ↓
 * 정렬 출력
 * */


// 자바 내장 라이브러리 호출
import java.util.ArrayList; // 데이터를 여러개 저장하는 리스트 구현체
import java.util.Comparator; // 정렬 기준을 만드는 클래스
import java.util.List; // 리스트 인터페이스 List<타입> 변수명 = new ArrayList<>();

public class Collection {
    public static void main(String[] args) { // jvm이 가장 먼저 실행하는 메서드
        // List<Order> : Order 타입만 저장 가능
        // new ArrayList<>() : 실제 리스트 객체 생성
        List<Order> orders = new ArrayList<>(); // Order 객체들을 저장하는 리스트 생성

        // Order 객체 생성 후 리스트에 추가 생성자값 (고객명, 상품명, 가격, 수량)
        orders.add(new Order("홍길동", "노트북", 1500000, 1));
        orders.add(new Order("김영희", "마우스", 20000, 2));
        orders.add(new Order("이철수", "키보드", 50000, 1));
        orders.add(new Order("박민수", "모니터", 250000, 2));

        System.out.println("총 주문 목록");
        // Order::printInfo : 메서드 참조 문법 ( = order -> order.printInfo()) : 각 주문마다 printInfo 실행
        orders.forEach(Order::printInfo); // 리스트 반복

        System.out.println("주문 금액 100000원 이상");
        orders.stream() // 리스트를 Stream 흐름으로 변환
                .filter(order -> order.getTotalPrice() >= 100000) // 조건 필터링 (람다식)
                .forEach(Order::printInfo);

        int totalSales = orders.stream()
                .mapToInt(Order::getTotalPrice)
                .sum();

        System.out.println("총 매출: " + totalSales);

        System.out.println("주문 금액 높은 순 정렬");
        orders.stream()
                .sorted(Comparator.comparing(Order::getTotalPrice).reversed())
                .forEach(Order::printInfo);
    }
}

class Order {
    private String customerName;
    private String productName;
    private int price;
    private int quantity;

    public Order(String customerName, String productName, int price, int quantity) {
        this.customerName = customerName;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
    }

    public int getTotalPrice() {
        return price * quantity;
    }

    public void printInfo() {
        System.out.println(customerName + " / " + productName + " / " + getTotalPrice());
    }
}