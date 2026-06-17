package com.example.backend.service;

import com.example.backend.domain.Counter;
import com.example.backend.repository.CounterRepository;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StateService {

    private static final Long COUNTER_ID = 1L;
    private static final String REDIS_COUNT_KEY = "redis:count";

    private final CounterRepository counterRepository;
    private final StringRedisTemplate stringRedisTemplate;

    public StateService(
            CounterRepository counterRepository,
            StringRedisTemplate stringRedisTemplate
    ) {
        this.counterRepository = counterRepository;
        this.stringRedisTemplate = stringRedisTemplate;
    }

    @Transactional(readOnly = true)
    public StateResponse current() {
        long dbCount = counterRepository.findById(COUNTER_ID)
                .map(Counter::getValue)
                .orElse(0L);

        long redisCount = getRedisCount();

        return new StateResponse(dbCount, redisCount);
    }

    @Transactional
    public StateResponse increase() {
        Counter counter = counterRepository.findByIdForUpdate(COUNTER_ID)
                .orElseThrow(() -> new IllegalStateException("Counter row가 초기화되지 않았습니다."));

        counter.increase();

        Long redisCount = stringRedisTemplate.opsForValue().increment(REDIS_COUNT_KEY);

        return new StateResponse(counter.getValue(), redisCount == null ? 0L : redisCount);
    }

    @Transactional
    public StateResponse reset() {
        Counter counter = counterRepository.findByIdForUpdate(COUNTER_ID)
                .orElseThrow(() -> new IllegalStateException("Counter row가 초기화되지 않았습니다."));

        counter.reset();
        stringRedisTemplate.opsForValue().set(REDIS_COUNT_KEY, "0");

        return new StateResponse(counter.getValue(), 0L);
    }

    private long getRedisCount() {
        String value = stringRedisTemplate.opsForValue().get(REDIS_COUNT_KEY);
        if (value == null) {
            return 0L;
        }
        return Long.parseLong(value);
    }

    public record StateResponse(long dbCount, long redisCount) {
    }
}
