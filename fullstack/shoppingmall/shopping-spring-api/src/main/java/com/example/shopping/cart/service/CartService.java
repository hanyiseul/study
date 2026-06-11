package com.example.shopping.cart.service;

import com.example.shopping.cart.dto.*;
import com.example.shopping.cart.entity.*;
import com.example.shopping.cart.repository.*;
import com.example.shopping.common.enums.ProductStatus;
import com.example.shopping.product.entity.Product;
import com.example.shopping.product.repository.ProductRepository;
import com.example.shopping.user.entity.User;
import com.example.shopping.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service @RequiredArgsConstructor
public class CartService {
 private final CartRepository cartRepository; private final CartItemRepository cartItemRepository; private final ProductRepository productRepository; private final UserRepository userRepository;
 @Transactional public CartResponse findMyCart(Long userId){ return response(getOrCreateCart(userId)); }
 @Transactional public CartResponse addItem(Long userId, AddCartItemRequest r){
  Cart cart=getOrCreateCart(userId); Product p=productRepository.findById(r.getProductId()).orElseThrow(()->new IllegalArgumentException("상품을 찾을 수 없습니다."));
  if(p.getStatus()!=ProductStatus.ON_SALE) throw new IllegalStateException("판매 중인 상품만 담을 수 있습니다.");
  CartItem item=cartItemRepository.findByCartIdAndProductId(cart.getId(),p.getId()).orElse(null);
  if(item==null) cartItemRepository.save(CartItem.builder().cart(cart).product(p).quantity(r.getQuantity()).build()); else item.increaseQuantity(r.getQuantity());
  return response(cart);
 }
 @Transactional public CartResponse updateItem(Long userId,Long itemId,UpdateCartItemRequest r){ CartItem i=item(itemId); own(i,userId); i.changeQuantity(r.getQuantity()); return response(i.getCart()); }
 @Transactional public CartResponse deleteItem(Long userId,Long itemId){ CartItem i=item(itemId); own(i,userId); Cart cart=i.getCart(); cartItemRepository.delete(i); return response(cart); }
 private Cart getOrCreateCart(Long userId){ return cartRepository.findByUserId(userId).orElseGet(()->{ User u=userRepository.findById(userId).orElseThrow(); return cartRepository.save(Cart.builder().user(u).build());}); }
 private CartItem item(Long id){ return cartItemRepository.findById(id).orElseThrow(()->new IllegalArgumentException("장바구니 상품을 찾을 수 없습니다.")); }
 private void own(CartItem i,Long userId){ if(!i.getCart().getUser().getId().equals(userId)) throw new IllegalStateException("본인 장바구니만 처리할 수 있습니다."); }
 private CartResponse response(Cart c){ List<CartItemResponse> items=cartItemRepository.findByCartId(c.getId()).stream().map(CartItemResponse::from).toList(); int total=items.stream().mapToInt(CartItemResponse::getTotalPrice).sum(); return new CartResponse(items,total); }
}
