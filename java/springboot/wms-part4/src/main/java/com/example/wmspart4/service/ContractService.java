package com.example.wmspart4.service;

import com.example.wmspart4.domain.Contract;
import com.example.wmspart4.dto.ContractForm;
import com.example.wmspart4.repository.ContractRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractService {

    private final ContractRepository contractRepository;

    public ContractService(ContractRepository contractRepository) {
        this.contractRepository = contractRepository;
    }

    public List<Contract> findAll() {
        return contractRepository.findAll();
    }

    public List<Contract> findByCustomerId(Long customerId) {
        return contractRepository.findByCustomerId(customerId);
    }

    public void create(ContractForm form) {
        if (form.getCustomerId() == null) {
            throw new IllegalArgumentException("고객을 선택해야 합니다.");
        }

        if (isBlank(form.getProductName())) {
            throw new IllegalArgumentException("상품명을 입력해야 합니다.");
        }

        if (form.getQuantity() == null || form.getQuantity() <= 0) {
            throw new IllegalArgumentException("수량은 1 이상이어야 합니다.");
        }

        if (isBlank(form.getWarehouseName())) {
            throw new IllegalArgumentException("창고명을 입력해야 합니다.");
        }

        if (isBlank(form.getStorageType())) {
            throw new IllegalArgumentException("보관유형을 선택해야 합니다.");
        }

        contractRepository.save(form);
    }

    public void confirm(Long id) {
        Contract contract = findById(id);

        if (!contract.isRequested()) {
            throw new IllegalStateException("계약요청 상태에서만 확정할 수 있습니다.");
        }

        contractRepository.updateStatus(id, "CONFIRMED");
    }

    public Contract findById(Long id) {
        return contractRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("계약을 찾을 수 없습니다."));
    }

    public long countAll() {
        return contractRepository.countAll();
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}