package com.example.shopping.seller.service;

import com.example.shopping.common.enums.SellerStatus;
import com.example.shopping.seller.dto.SellerResponse;
import com.example.shopping.seller.entity.Seller;
import com.example.shopping.seller.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service @RequiredArgsConstructor
public class SellerService {
 private final SellerRepository sellerRepository;
 @Transactional(readOnly=true) public List<SellerResponse> findAllSellers(){ return sellerRepository.findAll().stream().map(SellerResponse::from).toList(); }
 @Transactional(readOnly=true) public List<SellerResponse> findPendingSellers(){ return sellerRepository.findByStatus(SellerStatus.PENDING).stream().map(SellerResponse::from).toList(); }
 @Transactional public SellerResponse approveSeller(Long id){ Seller s=find(id); s.approve(); return SellerResponse.from(s); }
 @Transactional public SellerResponse rejectSeller(Long id){ Seller s=find(id); s.reject(); return SellerResponse.from(s); }
 private Seller find(Long id){ return sellerRepository.findById(id).orElseThrow(()->new IllegalArgumentException("판매자를 찾을 수 없습니다.")); }
}
