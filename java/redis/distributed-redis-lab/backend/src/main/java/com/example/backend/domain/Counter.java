package com.example.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "counters")
public class Counter {

    @Id
    private Long id;

    @Column(nullable = false)
    private long value;

    protected Counter() {
    }

    public Counter(Long id, long value) {
        this.id = id;
        this.value = value;
    }

    public void increase() {
        this.value++;
    }

    public void reset() {
        this.value = 0;
    }

    public Long getId() {
        return id;
    }

    public long getValue() {
        return value;
    }
}
