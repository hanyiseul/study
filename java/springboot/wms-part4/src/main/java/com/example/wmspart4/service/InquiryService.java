package com.example.wmspart4.service;

import com.example.wmspart4.domain.Inquiry;
import com.example.wmspart4.dto.InquiryAnswerForm;
import com.example.wmspart4.dto.InquiryForm;
import com.example.wmspart4.repository.InquiryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InquiryService {

    private final InquiryRepository inquiryRepository;

    public InquiryService(InquiryRepository inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }

    public void create(Long customerId, InquiryForm form) {
        if (isBlank(form.getTitle()) || isBlank(form.getContent())) {
            throw new IllegalArgumentException("문의 제목과 내용을 입력해야 합니다.");
        }

        inquiryRepository.save(customerId, form);
    }

    public void answer(Long id, InquiryAnswerForm form) {
        if (isBlank(form.getAnswerContent())) {
            throw new IllegalArgumentException("답변 내용을 입력해야 합니다.");
        }

        inquiryRepository.answer(id, form.getAnswerContent());
    }

    public List<Inquiry> findAll() {
        return inquiryRepository.findAll();
    }

    public List<Inquiry> findByCustomerId(Long customerId) {
        return inquiryRepository.findByCustomerId(customerId);
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}