package com.example.wmspart4.service;

import com.example.wmspart4.domain.Notice;
import com.example.wmspart4.dto.NoticeForm;
import com.example.wmspart4.repository.NoticeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public NoticeService(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    public void create(Long createdBy, NoticeForm form) {
        if (isBlank(form.getTitle()) || isBlank(form.getContent())) {
            throw new IllegalArgumentException("공지 제목과 내용을 입력해야 합니다.");
        }

        if (form.getVisible() == null) {
            form.setVisible(true);
        }

        noticeRepository.save(createdBy, form);
    }

    public List<Notice> findVisible() {
        return noticeRepository.findVisible();
    }

    public List<Notice> findAll() {
        return noticeRepository.findAll();
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}