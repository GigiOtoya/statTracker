package com.gigi.server.squad;

import com.gigi.server.dto.SquadCreateDTO;
import com.gigi.server.exception.DuplicateException;
import com.gigi.server.user.User;
import com.gigi.server.user.UserRepository;
import com.gigi.server.user.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class SquadService {
    private final SquadRepository squadRepository;

    private final UserService userService;

    @Autowired
    public SquadService(SquadRepository squadRepository, UserService userService) {
        this.squadRepository = squadRepository;
        this.userService = userService;
    }

    public List<Squad> getAllSquads() {
        return squadRepository.findAll();
    }

    public List<Map<String, Object>> getAllIdentifiers() {
        return squadRepository.findAllIdentifiers();
    }

    public List<String> getAllSquadNames() {
        return squadRepository.findAllSquadNames();
    }

    public Squad getSquadByName(String name, String userId) {
        return squadRepository.findSquadByName(name).orElse(null);
    }

    public Squad getSquadById(Long squadId, String userId) {
        Optional<Squad> squadWithPlayers = squadRepository.findSquadById(squadId);
        return squadWithPlayers.orElse(null);
    }

    // Get List of Squads (No Players)
    public List<Squad> getSquadIdentifiers(String userId) {
        return squadRepository.findSquadsByUser_UserId(userId);
    }

    // Get Squad with user id and squad id
    public Squad getSquadByUserIdAndSquadId(Long squadId, String userId) {
        Optional<Squad> squadWithPlayers = squadRepository.findSquadByIdAndUser_UserId(squadId, userId);
        return squadWithPlayers.orElse(null);
    }

    // Create new Squad
    public void addNewSquad(Squad newSquad, String userId) {
//        Optional<Squad> squadByName = squadRepository.findSquadByName(newSquad.getName());
        User user = userService.getUser(userId);
        String newName = newSquad.getName();

        Optional<Squad> squadOptional = squadRepository.findSquadByNameAndUser_UserId(newName, userId);
        if (squadOptional.isPresent()) {
            String message = String.format("Squad name %s already in use", newName);
            throw new DuplicateException(message);
        }

        newSquad.setUser(user);
        squadRepository.save(newSquad);
    }

    // Change Squad Name
    public void updateSquadName(Long squadId, SquadCreateDTO squadCreateDTO, String userId ) {
        User user = userService.getUser(userId);

        // Check if Squad exists
        Optional<Squad> squadOptional = squadRepository.findSquadByIdAndUser_UserId(squadId, userId);
        if (squadOptional.isEmpty()) {
            throw new EntityNotFoundException("Squad not found");
        }

        String newName = squadCreateDTO.getName();

        // Check if the name is available
        Optional<Squad> squadOptionalByName = squadRepository.findSquadByNameAndUser_UserId(newName, userId);
        if (squadOptionalByName.isPresent() && !squadId.equals(squadOptionalByName.get().getId())) {
            String message = String.format("Squad name #%s already in use", newName);
            throw new DuplicateException(message);
        }

        Squad existingSquad = squadOptional.get();
        existingSquad.setName(newName);
        squadRepository.save(existingSquad);
    }

    // Delete Squad
    public void deleteSquad(Long id, String userId) {

        User user = userService.getUser(userId);

        Optional<Squad> squadOptional = squadRepository.findSquadByIdAndUser_UserId(id, userId);
        if (squadOptional.isEmpty()) {
            throw new EntityNotFoundException("Squad not found!");
        }
        squadRepository.deleteById(id);
    }
}
