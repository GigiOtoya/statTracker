package com.gigi.server.PublicKeyFactory;

import java.io.StringReader;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;

import org.apache.tomcat.util.codec.binary.Base64;
import org.bouncycastle.util.io.pem.PemObject;
import org.bouncycastle.util.io.pem.PemReader;
import org.springframework.stereotype.Component;

@Component
public class PublicKeyFactory {

    public PublicKey createPublicKey(String pemKey) throws Exception {
        String publicKeyPem = pemKey
                .replace("-----BEGIN PUBLIC KEY-----", "")
                .replaceAll(System.lineSeparator(), "")
                .replace("-----END PUBLIC KEY-----", "");

        byte[] encoded = Base64.decodeBase64(publicKeyPem);

        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        X509EncodedKeySpec publicKeySpec = new X509EncodedKeySpec(encoded);
        return keyFactory.generatePublic(publicKeySpec);
    }
}
