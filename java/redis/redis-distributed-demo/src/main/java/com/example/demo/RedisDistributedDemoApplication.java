package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching // Spring Cache 어노테이션이 동작
@SpringBootApplication
public class RedisDistributedDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(RedisDistributedDemoApplication.class, args);
	}
}