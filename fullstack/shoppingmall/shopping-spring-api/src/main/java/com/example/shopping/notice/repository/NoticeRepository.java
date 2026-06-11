package com.example.shopping.notice.repository;

import com.example.shopping.notice.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface NoticeRepository extends JpaRepository<Notice, Long> { List<Notice> findAllByOrderByCreatedAtDesc(); }
