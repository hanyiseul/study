package com.example.wmspart4.service;

import com.example.wmspart4.domain.Contract;
import com.example.wmspart4.domain.Inbound;
import com.example.wmspart4.dto.InboundForm;
import com.example.wmspart4.repository.InboundRepository;
import com.example.wmspart4.repository.InventoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class InboundService {

    private final InboundRepository inboundRepository;
    private final InventoryRepository inventoryRepository;
    private final ContractService contractService;

    public InboundService(InboundRepository inboundRepository,
                          InventoryRepository inventoryRepository,
                          ContractService contractService) {
        this.inboundRepository = inboundRepository;
        this.inventoryRepository = inventoryRepository;
        this.contractService = contractService;
    }

    public List<Inbound> findAll() {
        return inboundRepository.findAll();
    }

    public void register(InboundForm form) {
        if (form.getContractId() == null) {
            throw new IllegalArgumentException("계약을 선택해야 합니다.");
        }

        Contract contract = contractService.findById(form.getContractId());

        if (!contract.isConfirmed()) {
            throw new IllegalStateException("계약확정 상태의 계약만 입고 등록할 수 있습니다.");
        }

        if (form.getReceivedQuantity() == null || form.getReceivedQuantity() <= 0) {
            throw new IllegalArgumentException("입고 수량은 1 이상이어야 합니다.");
        }

        if (isBlank(form.getWarehouseName())) {
            throw new IllegalArgumentException("창고명을 입력해야 합니다.");
        }

        if (isBlank(form.getStorageZone())) {
            throw new IllegalArgumentException("보관구역을 입력해야 합니다.");
        }

        inboundRepository.save(form);
    }

    @Transactional
    public void complete(Long id) {
        Inbound inbound = inboundRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("입고 정보를 찾을 수 없습니다."));

        if (!inbound.isRegistered()) {
            throw new IllegalStateException("입고등록 상태에서만 완료 처리할 수 있습니다.");
        }

        Contract contract = contractService.findById(inbound.getContractId());

        inboundRepository.complete(id);
        inventoryRepository.createFromInbound(inbound, contract);
    }

    public long countAll() {
        return inboundRepository.countAll();
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}