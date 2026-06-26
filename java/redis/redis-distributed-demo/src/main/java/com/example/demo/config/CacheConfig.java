// Redis 캐시의 설정을 담당하는 클래스
// 캐시에 저장되는 데이터는 60초 동안만 유지하고, 그 이후에는 자동으로 삭제해라 라는 규칙을 설명
package com.example.demo.config;

import java.time.Duration; // 시간 표현

import org.springframework.boot.autoconfigure.cache.RedisCacheManagerBuilderCustomizer; // Redis ChachManager를 수정할 수 있게 해주는 인터페이스 (Redis 캐시 설정을 내가 직접 바꾸겠다)
import org.springframework.context.annotation.Bean; // Bean 등록을 위한 어노테이션 -> Spring이 객체를 생성해서 관리하게 됨
import org.springframework.context.annotation.Configuration; // 설정 클래스 -> Spring Boot가 실행될 때 가장 먼저 읽음
import org.springframework.data.redis.cache.RedisCacheConfiguration; //

@Configuration
public class CacheConfig {

    @Bean
    public RedisCacheManagerBuilderCustomizer redisCacheManagerBuilderCustomizer() {
        return builder -> builder.withCacheConfiguration(
                "product",
                RedisCacheConfiguration.defaultCacheConfig()
                        .entryTtl(Duration.ofSeconds(60))
        );
    }
}