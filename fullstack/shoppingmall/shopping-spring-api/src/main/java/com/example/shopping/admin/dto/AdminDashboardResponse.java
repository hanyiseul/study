package com.example.shopping.admin.dto;
import lombok.*;
@Getter @AllArgsConstructor public class AdminDashboardResponse { private long userCount; private long buyerCount; private long sellerCount; private long pendingSellerCount; private long productCount; private long onSaleProductCount; private long orderCount; private int totalSalesAmount; }
