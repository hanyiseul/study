package com.example.shopping.security;

import com.example.shopping.common.enums.UserRole;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {
 @Value("${jwt.secret}") private String secret;
 @Value("${jwt.expiration}") private long expiration;
 private Key key(){ return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)); }
 public String createToken(Long userId, String email, UserRole role){
  Date now=new Date(); Date exp=new Date(now.getTime()+expiration);
  return Jwts.builder().subject(String.valueOf(userId)).claim("email",email).claim("role",role.name()).issuedAt(now).expiration(exp).signWith(key()).compact();
 }
 public boolean validateToken(String token){ try{ Jwts.parser().verifyWith((javax.crypto.SecretKey)key()).build().parseSignedClaims(token); return true; } catch(Exception e){ return false; } }
 private Claims claims(String token){ return Jwts.parser().verifyWith((javax.crypto.SecretKey)key()).build().parseSignedClaims(token).getPayload(); }
 public Long getUserId(String token){ return Long.valueOf(claims(token).getSubject()); }
 public String getEmail(String token){ return claims(token).get("email",String.class); }
 public UserRole getRole(String token){ return UserRole.valueOf(claims(token).get("role",String.class)); }
}
