package com.example.shopping.product.service;

import com.example.shopping.common.enums.*;
import com.example.shopping.product.dto.*;
import com.example.shopping.product.entity.Product;
import com.example.shopping.product.repository.ProductRepository;
import com.example.shopping.seller.entity.Seller;
import com.example.shopping.seller.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service @RequiredArgsConstructor
public class ProductService {
 private final ProductRepository productRepository; private final SellerRepository sellerRepository;
 @Transactional(readOnly=true) public List<ProductResponse> findOnSaleProducts(String keyword,String category){
  List<Product> list;
  if(keyword!=null && !keyword.isBlank()) list=productRepository.findByNameContainingAndStatus(keyword,ProductStatus.ON_SALE);
  else if(category!=null && !category.isBlank()) list=productRepository.findByCategoryAndStatus(category,ProductStatus.ON_SALE);
  else list=productRepository.findByStatus(ProductStatus.ON_SALE);
  return list.stream().map(ProductResponse::from).toList();
 }
 @Transactional(readOnly=true) public ProductResponse findPublicProduct(Long id){ Product p=find(id); if(p.getStatus()!=ProductStatus.ON_SALE) throw new IllegalArgumentException("판매 중인 상품이 아닙니다."); return ProductResponse.from(p); }
 @Transactional(readOnly=true) public List<ProductResponse> findSellerProducts(Long userId){ Seller s=seller(userId); return productRepository.findBySellerId(s.getId()).stream().map(ProductResponse::from).toList(); }
 @Transactional(readOnly=true) public ProductResponse findSellerProduct(Long userId,Long id){ Seller s=seller(userId); Product p=find(id); own(p,s); return ProductResponse.from(p); }
 @Transactional public ProductResponse createProduct(Long userId, ProductRequest r){ Seller s=seller(userId); if(s.getStatus()!=SellerStatus.APPROVED) throw new IllegalStateException("승인된 판매자만 상품을 등록할 수 있습니다."); Product p=Product.builder().seller(s).name(r.getName()).price(r.getPrice()).stockQuantity(r.getStockQuantity()).category(r.getCategory()).description(r.getDescription()).imageUrl(r.getImageUrl()).status(ProductStatus.ON_SALE).build(); return ProductResponse.from(productRepository.save(p)); }
 @Transactional public ProductResponse updateProduct(Long userId,Long id,ProductRequest r){ Seller s=seller(userId); Product p=find(id); own(p,s); p.updateProduct(r.getName(),r.getPrice(),r.getStockQuantity(),r.getCategory(),r.getDescription(),r.getImageUrl()); return ProductResponse.from(p); }
 @Transactional public ProductResponse stopSelling(Long userId,Long id){ Seller s=seller(userId); Product p=find(id); own(p,s); p.stopSelling(); return ProductResponse.from(p); }
 @Transactional(readOnly=true) public List<ProductResponse> findAllForAdmin(){ return productRepository.findAll().stream().map(ProductResponse::from).toList(); }
 @Transactional public ProductResponse blockProduct(Long id){ Product p=find(id); p.block(); return ProductResponse.from(p); }
 private Product find(Long id){ return productRepository.findById(id).orElseThrow(()->new IllegalArgumentException("상품을 찾을 수 없습니다.")); }
 private Seller seller(Long userId){ return sellerRepository.findByUserId(userId).orElseThrow(()->new IllegalArgumentException("판매자 정보를 찾을 수 없습니다.")); }
 private void own(Product p,Seller s){ if(!p.getSeller().getId().equals(s.getId())) throw new IllegalStateException("본인 상품만 처리할 수 있습니다."); }
}
