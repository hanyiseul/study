package com.example.backend.repository;

import com.example.backend.domain.Counter;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CounterRepository extends JpaRepository<Counter, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select c from Counter c where c.id = :id")
    Optional<Counter> findByIdForUpdate(@Param("id") Long id);
}
