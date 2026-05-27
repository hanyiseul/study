package stream;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class ProductListProcessor {
    public static void main(String[] args) {
        List<Product> products = new ArrayList<>();

        products.add(new Product("키보드", "PC", 50000));
        products.add(new Product("마우스", "PC", 20000));
        products.add(new Product("모니터", "PC", 250000));
        products.add(new Product("의자", "가구", 120000));

        System.out.println("50000원 이상 상품");
        products.stream()
                .filter(product -> product.getPrice() >= 50000)
                .forEach(Product::printInfo);

        System.out.println("상품명 목록");
        products.stream()
                .map(Product::getName)
                .forEach(System.out::println);

        int totalPrice = products.stream()
                .mapToInt(Product::getPrice)
                .sum();

        System.out.println("전체 상품 가격 합계: " + totalPrice);

        System.out.println("가격 높은 순");
        products.stream()
                .sorted(Comparator.comparing(Product::getPrice).reversed())
                .forEach(Product::printInfo);
    }
}

class Product {
    private String name;
    private String category;
    private int price;

    public Product(String name, String category, int price) {
        this.name = name;
        this.category = category;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }

    public void printInfo() {
        System.out.println(name + " / " + category + " / " + price);
    }
}