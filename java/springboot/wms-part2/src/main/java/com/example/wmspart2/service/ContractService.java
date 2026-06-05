package com.example.wmspart2.service;

import com.example.wmspart2.domain.Contract;
import com.example.wmspart2.dto.ContractForm;
import com.example.wmspart2.repository.ContractRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractService {

    private final ContractRepository contractRepository;

    public ContractService(ContractRepository contractRepository) {
        this.contractRepository = contractRepository;
    }

    public List<Contract> findContracts() {
        return contractRepository.findAll();
    }

    public void createContract(ContractForm form) {
        validateContractForm(form);
        normalizeForm(form);
        contractRepository.save(form);
    }

    public void confirmContract(Long id) {
        Contract contract = findExistingContract(id);

        if (!"REQUESTED".equals(contract.getContractStatus())) {
            throw new IllegalStateException("계약요청 상태에서만 계약확정이 가능합니다.");
        }

        contractRepository.updateStatus(id, "CONFIRMED");
    }

    public void cancelContract(Long id) {
        Contract contract = findExistingContract(id);

        if (!"REQUESTED".equals(contract.getContractStatus())) {
            throw new IllegalStateException("계약요청 상태에서만 계약취소가 가능합니다.");
        }

        contractRepository.updateStatus(id, "CANCELED");
    }

    private Contract findExistingContract(Long id) {
        return contractRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 계약입니다."));
    }

    private void validateContractForm(ContractForm form) {
        if (isBlank(form.getCustomerName())) {
            throw new IllegalArgumentException("고객명을 입력해야 합니다.");
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

        if (!isAllowedStorageType(form.getStorageType())) {
            throw new IllegalArgumentException("보관유형은 NORMAL, COLD, FROZEN 중 하나여야 합니다.");
        }
    }

    private void normalizeForm(ContractForm form) {
        form.setCustomerName(form.getCustomerName().trim());
        form.setProductName(form.getProductName().trim());
        form.setWarehouseName(form.getWarehouseName().trim());

        if (form.getRequestMemo() != null) {
            form.setRequestMemo(form.getRequestMemo().trim());
        }
    }

    private boolean isAllowedStorageType(String storageType) {
        return "NORMAL".equals(storageType)
                || "COLD".equals(storageType)
                || "FROZEN".equals(storageType);
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}