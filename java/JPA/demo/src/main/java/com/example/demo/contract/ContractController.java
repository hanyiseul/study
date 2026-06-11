package com.example.demo.contract;

import com.example.demo.dto.ContractResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ContractController {

    private final ContractService contractService;

    public ContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    @GetMapping("/api/contracts/n-plus-one")
    public List<ContractResponse> findAllNPlusOne() {
        return contractService.findAllNPlusOne();
    }

    @GetMapping("/api/contracts/fetch-join")
    public List<ContractResponse> findAllFetchJoin() {
        return contractService.findAllFetchJoin();
    }

    @GetMapping("/api/contracts/entity-graph")
    public List<ContractResponse> findAllEntityGraph() {
        return contractService.findAllEntityGraph();
    }

    @GetMapping("/api/contracts/dto-projection")
    public List<ContractResponse> findAllDtoProjection() {
        return contractService.findAllDtoProjection();
    }
}