package com.gigi.server.webhook;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gigi.server.user.UserService;
import com.svix.Webhook;
import com.svix.exceptions.WebhookVerificationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpHeaders;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@RestController
@Transactional
public class WebHookController {
    @Value("${clerk.signing-secret}")
    private String signingSecret;

    private final UserService userService;
    @Autowired
    public WebHookController(UserService userService){
        this.userService = userService;
    }

    @GetMapping(path = "webhook")
    public ResponseEntity<String> handleConnect() {
        return new ResponseEntity<>("Connected", HttpStatus.OK);
    }

    @PostMapping(path = "webhook")
    public ResponseEntity<String> handleWebHook(
            @RequestHeader("svix-id") String svixId,
            @RequestHeader("svix-timestamp") String svixTimeStamp,
            @RequestHeader("svix-signature") String svixSignature,
            @RequestBody String payload
    ) {
        try {
            HashMap<String, List<String>> headerMap = new HashMap<String, List<String>>();
            headerMap.put("svix-id", Arrays.asList(svixId));
            headerMap.put("svix-timestamp", Arrays.asList(svixTimeStamp));
            headerMap.put("svix-signature", Arrays.asList(svixSignature));
            HttpHeaders headers = HttpHeaders.of(headerMap, (s1, s2) -> true);

            Webhook webhook = new Webhook(signingSecret);
            // throw error if verification fails
            webhook.verify(payload, headers);

            // handle payload
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(payload);

            String event = jsonNode.get("type").asText();
            String id = jsonNode.get("data").get("id").asText();
            handlePayloadEvent(event, id);

        } catch (WebhookVerificationException e) {
            return new ResponseEntity<>("Error verifying webhook", HttpStatus.BAD_REQUEST);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>("Error reading Json tree", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("Webhook processed", HttpStatus.OK);

    }

    private void handlePayloadEvent(String event, String id) {
        switch(event) {
            case "user.created": handleUserCreatedEvent(id);
            break;

            case "user.deleted": handleUserDeletedEvent(id);
            break;

            case "session.created": handleSessionCreated(id);
            default: ;
            break;
        }
    }

    private void handleSessionCreated(String sessionId) {
        String message = String.format("Session Created Event with id %s,", sessionId);
        System.out.println(message);
    }

    private void handleUserCreatedEvent(String userId) {
        userService.createUser(userId);

        String message = String.format("User Created Event with id %s", userId);
        System.out.println(message);
    }

    private void handleUserDeletedEvent(String userId) {
        userService.deleteUser(userId);

        String message = String.format("User Deleted Event with id %s", userId);
        System.out.println(message);
    }
}
