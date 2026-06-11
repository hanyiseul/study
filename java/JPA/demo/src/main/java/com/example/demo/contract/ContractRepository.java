package com.example.demo.contract;

import com.example.demo.dto.ContractResponse;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ContractRepository extends JpaRepository<Contract, Long> {

    @Query("select c from Contract c join fetch c.customer")
    List<Contract> findAllWithCustomerFetchJoin();

    @EntityGraph(attributePaths = {"customer"})
    @Query("select c from Contract c")
    List<Contract> findAllWithCustomerEntityGraph();

    @Query("""
            select new com.example.demo.dto.ContractResponse(
                c.id,
                c.contractNo,
                c.productName,
                c.status,
                cu.name,
                cu.email
            )
            from Contract c
            join c.customer cu
            """)
    List<ContractResponse> findAllContractResponses();
}