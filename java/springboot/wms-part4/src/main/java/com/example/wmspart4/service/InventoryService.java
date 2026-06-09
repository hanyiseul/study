package com.example.wmspart4.service;

import com.example.wmspart4.domain.Inventory;
import com.example.wmspart4.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public List<Inventory> findAll() {
        return inventoryRepository.findAll();
    }

    public List<Inventory> findByCustomerId(Long customerId) {
        return inventoryRepository.findByCustomerId(customerId);
    }

    public Inventory findById(Long id) {
        return inventoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("재고를 찾을 수 없습니다."));
    }

    public long countAll() {
        return inventoryRepository.countAll();
    }
}