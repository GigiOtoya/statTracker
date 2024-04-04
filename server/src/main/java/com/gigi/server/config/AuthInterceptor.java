package com.gigi.server.config;

import com.gigi.server.jwt.JwtVerifier;
import io.jsonwebtoken.Claims;
import jakarta.annotation.Nonnull;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Arrays;
import java.util.Map;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    private final JwtDecoder jwtDecoder;

    @Autowired
    public AuthInterceptor(JwtDecoder jwtDecoder) {
        this.jwtDecoder = jwtDecoder;
    }

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            @Nonnull HttpServletResponse response,
            @Nonnull Object handler
    ) throws Exception {

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
        response.setHeader("Access-Control-Allow-Methods", "DELETE, PUT");

        if (request.getMethod().equals("OPTIONS")) {
            response.setStatus(HttpServletResponse.SC_OK);
            return false;
        }

        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid or missing Bearer Token");
            return false;
        }

        String sessionToken = authorizationHeader.substring(7);

        Jwt jwt = jwtDecoder.decode(sessionToken);
        String userId = jwt.getSubject();

        if (userId != null) {
            request.setAttribute("userId", userId);

            System.out.println("Request URI: " + request.getRequestURI());
            System.out.println("Request Method: " + request.getMethod());
            System.out.println("User: " + userId);
        }

        return true;
    }
}
