package com.example.demo.filter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class RequestLogFilter implements Filter {

    public RequestLogFilter() {
        System.out.println("RequestLogFilter 생성자 실행: Filter Bean 생성");
    }

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain
    ) throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        long start = System.currentTimeMillis();

        System.out.println("[Filter 전처리] 요청 Method: " + httpRequest.getMethod());
        System.out.println("[Filter 전처리] 요청 URI: " + httpRequest.getRequestURI());
        System.out.println("[Filter 전처리] Query String: " + httpRequest.getQueryString());
        System.out.println("[Filter 전처리] Content-Type: " + httpRequest.getContentType());

        chain.doFilter(request, response);

        long end = System.currentTimeMillis();

        System.out.println("[Filter 후처리] 응답 Status: " + httpResponse.getStatus());
        System.out.println("[Filter 후처리] 처리 시간: " + (end - start) + "ms");
    }
}