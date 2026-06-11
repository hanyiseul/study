package com.example.demo.init;

import com.example.demo.contract.Contract;
import com.example.demo.contract.ContractRepository;
import com.example.demo.customer.Customer;
import com.example.demo.customer.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DataLoader implements CommandLineRunner {

    private final CustomerRepository customerRepository;
    private final ContractRepository contractRepository;

    public DataLoader(
            CustomerRepository customerRepository,
            ContractRepository contractRepository
    ) {
        this.customerRepository = customerRepository;
        this.contractRepository = contractRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        Customer customer1 = customerRepository.save(new Customer("customer1@test.com", "고객사A"));
        Customer customer2 = customerRepository.save(new Customer("customer2@test.com", "고객사B"));
        Customer customer3 = customerRepository.save(new Customer("customer3@test.com", "고객사C"));

        contractRepository.save(new Contract("CT-2026-001", "유압 실린더 보관", "REQUESTED", customer1));
        contractRepository.save(new Contract("CT-2026-002", "엔진 부품 보관", "CONFIRMED", customer2));
        contractRepository.save(new Contract("CT-2026-003", "전장 부품 보관", "CONFIRMED", customer3));
        contractRepository.save(new Contract("CT-2026-004", "브라켓 부품 보관", "REQUESTED", customer1));
        contractRepository.save(new Contract("CT-2026-005", "펌프 부품 보관", "CANCELLED", customer2));
    }
}