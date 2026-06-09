package com.example.wmspart4.service;

import com.example.wmspart4.domain.Inventory;
import com.example.wmspart4.domain.Outbound;
import com.example.wmspart4.dto.OutboundRequestForm;
import com.example.wmspart4.repository.InventoryRepository;
import com.example.wmspart4.repository.OutboundRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OutboundService {

    private final OutboundRepository outboundRepository;
    private final InventoryRepository inventoryRepository;

    public OutboundService(OutboundRepository outboundRepository,
                           InventoryRepository inventoryRepository) {
        this.outboundRepository = outboundRepository;
        this.inventoryRepository = inventoryRepository;
    }

    public void request(Long customerId, OutboundRequestForm form) {
        if (form.getInventoryId() == null) {
            throw new IllegalArgumentException("재고를 선택해야 합니다.");
        }

        Inventory inventory = inventoryRepository.findById(form.getInventoryId())
                .orElseThrow(() -> new IllegalArgumentException("재고를 찾을 수 없습니다."));

        if (!customerId.equals(inventory.getCustomerId())) {
            throw new IllegalStateException("본인 재고만 출고 요청할 수 있습니다.");
        }

        if (form.getRequestQuantity() == null || form.getRequestQuantity() <= 0) {
            throw new IllegalArgumentException("출고 수량은 1 이상이어야 합니다.");
        }

        if (form.getRequestQuantity() > inventory.getCurrentQuantity()) {
            throw new IllegalArgumentException("현재 재고 수량을 초과하여 출고 요청할 수 없습니다.");
        }

        outboundRepository.save(customerId, form);
    }

    public List<Outbound> findAll() {
        return outboundRepository.findAll();
    }

    public List<Outbound> findByCustomerId(Long customerId) {
        return outboundRepository.findByCustomerId(customerId);
    }

    @Transactional
    public void complete(Long id) {
        Outbound outbound = outboundRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("출고 요청을 찾을 수 없습니다."));

        if (!outbound.isRequested()) {
            throw new IllegalStateException("출고요청 상태에서만 완료 처리할 수 있습니다.");
        }

        Inventory inventory = inventoryRepository.findById(outbound.getInventoryId())
                .orElseThrow(() -> new IllegalArgumentException("재고를 찾을 수 없습니다."));

        if (outbound.getRequestQuantity() > inventory.getCurrentQuantity()) {
            throw new IllegalStateException("재고 수량이 부족합니다.");
        }

        outboundRepository.complete(id);
        inventoryRepository.decreaseQuantity(inventory.getId(), outbound.getRequestQuantity());
    }

    public long countAll() {
        return outboundRepository.countAll();
    }
}