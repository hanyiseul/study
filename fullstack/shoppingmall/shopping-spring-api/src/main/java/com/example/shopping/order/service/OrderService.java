package com.example.shopping.order.service;

import com.example.shopping.cart.entity.Cart;
import com.example.shopping.cart.entity.CartItem;
import com.example.shopping.cart.repository.*;
import com.example.shopping.common.enums.*;
import com.example.shopping.order.dto.*;
import com.example.shopping.order.entity.*;
import com.example.shopping.order.repository.*;
import com.example.shopping.product.entity.Product;
import com.example.shopping.seller.entity.Seller;
import com.example.shopping.seller.repository.SellerRepository;
import com.example.shopping.user.entity.User;
import com.example.shopping.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service @RequiredArgsConstructor
public class OrderService {
 private final UserRepository userRepository; private final SellerRepository sellerRepository; private final CartRepository cartRepository; private final CartItemRepository cartItemRepository; private final OrderRepository orderRepository; private final OrderItemRepository orderItemRepository; private final PaymentRepository paymentRepository; private final DeliveryRepository deliveryRepository;
 @Transactional public OrderResponse createOrder(Long userId,CreateOrderRequest r){
  User u=userRepository.findById(userId).orElseThrow(); Cart c=cartRepository.findByUserId(userId).orElseThrow(()->new IllegalStateException("장바구니가 비어 있습니다."));
  List<CartItem> items=cartItemRepository.findByCartId(c.getId()); if(items.isEmpty()) throw new IllegalStateException("장바구니가 비어 있습니다.");
  int total=0; for(CartItem ci:items){ Product p=ci.getProduct(); if(p.getStatus()!=ProductStatus.ON_SALE) throw new IllegalStateException("판매 중인 상품만 주문할 수 있습니다."); p.decreaseStock(ci.getQuantity()); total+=ci.getTotalPrice(); }
  Order o=orderRepository.save(Order.builder().user(u).orderNumber("ORD-"+System.currentTimeMillis()).totalAmount(total).status(OrderStatus.ORDERED).receiverName(r.getReceiverName()).receiverPhone(r.getReceiverPhone()).deliveryAddress(r.getDeliveryAddress()).build());
  for(CartItem ci:items){ Product p=ci.getProduct(); orderItemRepository.save(OrderItem.builder().order(o).product(p).seller(p.getSeller()).productName(p.getName()).orderPrice(p.getPrice()).quantity(ci.getQuantity()).build()); }
  Payment pay=paymentRepository.save(Payment.builder().order(o).amount(total).status(PaymentStatus.READY).build()); pay.complete();
  deliveryRepository.save(Delivery.builder().order(o).receiverName(r.getReceiverName()).receiverPhone(r.getReceiverPhone()).address(r.getDeliveryAddress()).status(DeliveryStatus.READY).build());
  cartItemRepository.deleteByCartId(c.getId()); return OrderResponse.from(o);
 }
 @Transactional(readOnly=true) public List<OrderResponse> findMyOrders(Long userId){ return orderRepository.findByUserIdOrderByOrderedAtDesc(userId).stream().map(OrderResponse::from).toList(); }
 @Transactional(readOnly=true) public OrderDetailResponse findMyOrderDetail(Long userId,Long orderId){ Order o=orderRepository.findById(orderId).orElseThrow(()->new IllegalArgumentException("주문을 찾을 수 없습니다.")); if(!o.getUser().getId().equals(userId)) throw new IllegalStateException("본인 주문만 조회할 수 있습니다."); return detail(o); }
 @Transactional(readOnly=true) public List<SellerOrderItemResponse> findSellerOrderItems(Long userId){ Seller s=sellerRepository.findByUserId(userId).orElseThrow(); return orderItemRepository.findBySellerId(s.getId()).stream().map(i->SellerOrderItemResponse.of(i, deliveryRepository.findByOrderId(i.getOrder().getId()).orElseThrow())).toList(); }
 @Transactional public SellerOrderItemResponse updateDeliveryStatusBySeller(Long userId,Long orderItemId,UpdateDeliveryStatusRequest r){ Seller s=sellerRepository.findByUserId(userId).orElseThrow(); OrderItem i=orderItemRepository.findById(orderItemId).orElseThrow(); if(!i.getSeller().getId().equals(s.getId())) throw new IllegalStateException("본인 상품 주문만 처리할 수 있습니다."); Delivery d=deliveryRepository.findByOrderId(i.getOrder().getId()).orElseThrow(); if(r.getDeliveryStatus()==DeliveryStatus.SHIPPING) d.startShipping(); else if(r.getDeliveryStatus()==DeliveryStatus.DELIVERED) d.completeDelivery(); else throw new IllegalArgumentException("변경할 수 없는 배송 상태입니다."); return SellerOrderItemResponse.of(i,d); }
 @Transactional(readOnly=true) public List<OrderResponse> findAllOrdersForAdmin(){ return orderRepository.findAll().stream().map(OrderResponse::from).toList(); }
 private OrderDetailResponse detail(Order o){ return new OrderDetailResponse(OrderResponse.from(o), orderItemRepository.findByOrderId(o.getId()).stream().map(OrderItemResponse::from).toList(), PaymentResponse.from(paymentRepository.findByOrderId(o.getId()).orElseThrow()), DeliveryResponse.from(deliveryRepository.findByOrderId(o.getId()).orElseThrow())); }
}
