package com.example.demo.contract;

import com.example.demo.dto.ContractResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ContractService {

    private final ContractRepository contractRepository;

    public ContractService(ContractRepository contractRepository) {
        this.contractRepository = contractRepository;
    }

    @Transactional(readOnly = true)
    public List<ContractResponse> findAllNPlusOne() {
        System.out.println("1. 일반 findAll() 호출");
        List<Contract> contracts = contractRepository.findAll();

        System.out.println("2. DTO 변환 시작: customer 접근 시 추가 SQL 발생 가능");

        return contracts.stream()
                .map(contract -> new ContractResponse(
                        contract.getId(),
                        contract.getContractNo(),
                        contract.getProductName(),
                        contract.getStatus(),
                        contract.getCustomer().getName(),
                        contract.getCustomer().getEmail()
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ContractResponse> findAllFetchJoin() {
        System.out.println("1. Fetch Join 조회 호출");
        List<Contract> contracts = contractRepository.findAllWithCustomerFetchJoin();

        System.out.println("2. DTO 변환 시작: customer는 이미 함께 조회됨");

        return contracts.stream()
                .map(contract -> new ContractResponse(
                        contract.getId(),
                        contract.getContractNo(),
                        contract.getProductName(),
                        contract.getStatus(),
                        contract.getCustomer().getName(),
                        contract.getCustomer().getEmail()
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ContractResponse> findAllEntityGraph() {
        System.out.println("1. EntityGraph 조회 호출");
        List<Contract> contracts = contractRepository.findAllWithCustomerEntityGraph();

        System.out.println("2. DTO 변환 시작: EntityGraph로 customer 함께 조회");

        return contracts.stream()
                .map(contract -> new ContractResponse(
                        contract.getId(),
                        contract.getContractNo(),
                        contract.getProductName(),
                        contract.getStatus(),
                        contract.getCustomer().getName(),
                        contract.getCustomer().getEmail()
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ContractResponse> findAllDtoProjection() {
        System.out.println("1. DTO Projection 조회 호출");
        return contractRepository.findAllContractResponses();
    }
}