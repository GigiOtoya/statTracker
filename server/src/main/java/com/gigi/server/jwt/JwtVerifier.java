package com.gigi.server.jwt;

import com.gigi.server.PublicKeyFactory.PublicKeyFactory;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.PublicKey;

@Component
public class JwtVerifier {

    @Value("${clerk.pem-public-key}")
    private String pemPublicKey;

    private final PublicKeyFactory publicKeyFactory;

    public JwtVerifier(PublicKeyFactory publicKeyFactory) {
        this.publicKeyFactory = publicKeyFactory;
    }

    public Claims getPayload(String jwt) throws Exception {
        PublicKey publicKey = publicKeyFactory.createPublicKey(pemPublicKey);
        Jws<Claims> claims = Jwts.parser()
                .verifyWith(publicKey)
                .build()
                .parseSignedClaims(jwt);

        return claims.getPayload();

    }
}
