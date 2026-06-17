package com.example.backend.service;

import com.example.backend.domain.Counter;
import com.example.backend.repository.CounterRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CacheService {

    private static final Long COUNTER_ID = 1L;

    private final CounterRepository counterRepository;

    public CacheService(CounterRepository counterRepository) {
        this.counterRepository = counterRepository;
    }

    @Cacheable(value = "dbCount", key = "'current'")
    @Transactional(readOnly = true)
    public CachedDbCountResponse getCachedDbCount() {
        System.out.println("MariaDB 조회 실행: DB Count current");

        long dbCount = counterRepository.findById(COUNTER_ID)
                .map(Counter::getValue)
                .orElse(0L);

        return new CachedDbCountResponse(dbCount, "MariaDB 조회 후 Redis Cache 저장");
    }

    @CacheEvict(value = "dbCount", key = "'current'")
    public void evictDbCountCache() {
        System.out.println("Redis Cache 삭제: dbCount::current");
    }

    public record CachedDbCountResponse(long dbCount, String source) {
    }
}
