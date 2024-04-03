package com.gigi.server.config;

import net.datafaker.Faker;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("dev")
public class FakerConfig {
    @Bean
    public Faker faker() {
        return new Faker();
    }
}
