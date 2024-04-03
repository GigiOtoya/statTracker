package com.gigi.server.user;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUser(String userId) {
        Optional<User> user = userRepository.findUserByUserId(userId);
        if (user.isEmpty()) {
            throw new EntityNotFoundException("User not found!");
        }
        return user.get();
    }

    public void createUser(String userId) {
        User newUser = new User(userId);
        userRepository.save(newUser);
    }

    public void deleteUser(String userId) {
        userRepository.deleteUserByUserId(userId);
    }
}
