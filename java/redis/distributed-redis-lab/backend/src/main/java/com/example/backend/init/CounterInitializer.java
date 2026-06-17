package com.example.backend.init;

import com.example.backend.domain.Counter;
import com.example.backend.repository.CounterRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class CounterInitializer implements ApplicationRunner {

    private static final Long COUNTER_ID = 1L;

    private final CounterRepository counterRepository;

    public CounterInitializer(CounterRepository counterRepository) {
        this.counterRepository = counterRepository;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        if (!counterRepository.existsById(COUNTER_ID)) {
            counterRepository.save(new Counter(COUNTER_ID, 0));
        }
    }
}
