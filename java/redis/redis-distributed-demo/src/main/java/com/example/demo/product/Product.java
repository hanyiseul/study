// product entity 파일
// 데이터베이스 테이블
package com.example.demo.product;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue; // id를 자동 생성할 수 있게 해주는 어노테이션
import jakarta.persistence.GenerationType; // GeneratedValue에서 어떤 방식으로 자동 생성할지 선택
import jakarta.persistence.Id; // pk 알려주는거 (PRIMARY KEY(id))

import java.io.Serializable; // 객체를 직렬화할 수 있게 하는 인터페이스 (Redis, 캐시, 세션 등에 저장할 때 많이 사용)

@Entity
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int price;
    private int stock;

    protected Product() {
    }

    public Product(String name, int price, int stock) {
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }

    public int getStock() {
        return stock;
    }

    public void update(String name, int price, int stock) {
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
}