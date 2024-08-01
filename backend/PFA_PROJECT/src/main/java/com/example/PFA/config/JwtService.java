package com.example.PFA.config;

import com.example.PFA.exceptions.TokenNotFoundException;
import com.example.PFA.token.Token;
import com.example.PFA.token.TokenRepository;
import com.example.PFA.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

  private final TokenRepository tokenRepository;

  @Value("${application.security.jwt.secret-key}")
  private String secretKey;
  @Value("${application.security.jwt.expiration}")
  private long jwtExpiration;
  @Value("${application.security.jwt.refresh-token.expiration}")
  private long refreshExpiration;

  public JwtService(TokenRepository tokenRepository) {
    this.tokenRepository = tokenRepository;
  }

  public String extractUsername(String token) {
    System.out.println("Extracting username from token:" +token);


    return extractClaim(token, Claims::getSubject);
  }

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  public String generateToken(UserDetails userDetails) {
    return generateToken(new HashMap<>(), userDetails);
  }

  public String generateToken(
          Map<String, Object> extraClaims,
          UserDetails userDetails
  ) {
    return buildToken(extraClaims, userDetails, jwtExpiration);
  }

  public String generateRefreshToken(
          Map<String, Object> extraClaims,
          UserDetails userDetails
  ) {
    return buildToken(extraClaims, userDetails, refreshExpiration);
  }

  public String generateRefreshToken(
          UserDetails userDetails
  ) {
    return buildToken(new HashMap<>(), userDetails, refreshExpiration);
  }

  private String buildToken(
          Map<String, Object> extraClaims,
          UserDetails userDetails,
          long expiration
  ) {
    var authorities = userDetails.getAuthorities()
            .stream()
            .map(GrantedAuthority::getAuthority)
            .toList();


    // Extract full name
    String fullName = "";
    if (userDetails instanceof User) {
      fullName = ((User) userDetails).getFullName();
    }

    // Add full name to extraClaims
    extraClaims.put("fullName", fullName);



    return Jwts
            .builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .claim("authorities",authorities)
            .signWith(getSignInKey())
            .compact();
  }

  public boolean isTokenValid(String token, UserDetails userDetails) {
    final String username = extractUsername(token);
    return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
  }

  private boolean isTokenExpired(String token) {
    System.out.println(extractExpiration(token).before(new Date()));
    return extractExpiration(token).before(new Date());
  }





  private Date extractExpiration(String token) {
    System.out.println(extractClaim(token, Claims::getExpiration));
    return extractClaim(token, Claims::getExpiration);
  }

  private Claims extractAllClaims(String token) {
    return Jwts
            .parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
  }

  private Key getSignInKey() {
    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}