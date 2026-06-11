package com.example.shopping.security;

import com.example.shopping.common.enums.UserStatus;
import com.example.shopping.user.entity.User;
import com.example.shopping.user.repository.UserRepository;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
 private final JwtTokenProvider jwtTokenProvider; private final UserRepository userRepository;
 @Override protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
  String header=request.getHeader("Authorization");
  if(header!=null && header.startsWith("Bearer ")){
   String token=header.substring(7);
   if(jwtTokenProvider.validateToken(token)){
    Long userId=jwtTokenProvider.getUserId(token);
    User user=userRepository.findById(userId).orElse(null);
    if(user!=null && user.getStatus()==UserStatus.ACTIVE){
     CustomUserPrincipal principal=new CustomUserPrincipal(user.getId(),user.getEmail(),user.getRole());
     var auth=new UsernamePasswordAuthenticationToken(principal,null,List.of(new SimpleGrantedAuthority("ROLE_"+user.getRole().name())));
     SecurityContextHolder.getContext().setAuthentication(auth);
    }
   }
  }
  chain.doFilter(request,response);
 }
}
