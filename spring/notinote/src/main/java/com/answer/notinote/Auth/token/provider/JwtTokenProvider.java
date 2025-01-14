package com.answer.notinote.Auth.token.provider;

import com.answer.notinote.Auth.repository.RefreshTokenRepository;
import com.answer.notinote.Auth.token.RefreshToken;
import com.answer.notinote.Exception.CustomException;
import com.answer.notinote.Exception.ErrorCode;
import com.answer.notinote.User.domain.entity.User;
import com.answer.notinote.User.domain.repository.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Base64;
import java.util.Date;

@Component
@RequiredArgsConstructor
@PropertySource("classpath:application.yml")
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    private long accessTokenValidTime = 60 * 60 * 1000L;
    private long refreshTokenValidTime = 300 * 60 * 1000L;

    private String accessTokenHeader = "Access-Token";

    private String refreshTokenHeader = "Refresh-Token";

    private final UserDetailsService userDetailsService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    private static final Log LOG = LogFactory.getLog(JwtTokenProvider.class);

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(User user) {
        return convertToToken(user.getUemail(), accessTokenValidTime, secretKey);
    }

    public String createRefreshToken(User user) {
        String refreshToken = convertToToken(user.getUemail(), refreshTokenValidTime, secretKey);
        refreshTokenRepository.save(new RefreshToken(user, refreshToken));

        return refreshToken;
    }

    // 토큰에서 인증 정보 조회
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserEmail(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public String getUserEmail(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public String resolveAccessToken(HttpServletRequest request) {
        return request.getHeader(accessTokenHeader);
    }

    public void setAccessToken(HttpServletResponse response, String token) {
        response.setHeader(accessTokenHeader, token);
    }

    public String resolveRefreshToken(HttpServletRequest request) {
        return request.getHeader(refreshTokenHeader);
    }

    public void setRefreshToken(HttpServletResponse response, String token) {
        response.setHeader(refreshTokenHeader, token);
    }

    // 토큰의 유효성 & 만료일자 확인
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            LOG.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            LOG.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            LOG.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            LOG.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            LOG.error("JWT claims string is empty");
        }
        return false;
    }

    public boolean validateTokenExpired(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return claims.getBody().getExpiration().before(new Date());
        } catch(ExpiredJwtException e) {
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private String convertToToken(String email, Long validTime, String key) {
        User user = userRepository.findByUemail(email).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );

        Claims claims = Jwts.claims().setSubject(user.getUemail());
        claims.put("roles", user.getUroleType());
        Date now = new Date();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + validTime))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    public boolean existsRefreshToken(String token) {
        return refreshTokenRepository.existsByToken(token);
    }
}