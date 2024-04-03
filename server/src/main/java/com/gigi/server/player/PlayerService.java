package com.gigi.server.player;

import com.gigi.server.exception.DuplicateException;
import com.gigi.server.squad.Squad;
import com.gigi.server.squad.SquadRepository;
import com.gigi.server.user.User;
import com.gigi.server.user.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;
    private final SquadRepository squadRepository;
    private final UserService userService;

    @Autowired
    public PlayerService(
            PlayerRepository playerRepository,
            SquadRepository squadRepository,
            UserService userService){
        this.playerRepository = playerRepository;
        this.squadRepository = squadRepository;
        this.userService = userService;
    }

    public List<Player> getPlayers() {
        return playerRepository.findAll();
    }

    public List<Player> getPlayersBySquadId(Long id, String userId) {
        return playerRepository.findPlayersBySquadId(id);
    }

    public List<Player> getPlayersFromSquad(String userId, Long squadId) {
        return playerRepository.findPlayersByUserIdAndSquadId(userId, squadId);
    }

    public Player getPlayerByNumber(Integer number) {
        return playerRepository.findPlayerByNumber(number).orElse(null);
    }

    // Change LineUp
    public void editStarters(List<Integer> numbers, Long squadId, String userId) {
        User user = userService.getUser(userId);

        List<Player> playerList = playerRepository.findPlayersByUserIdAndSquadId(userId, squadId);
        if (playerList == null) {
            throw new EntityNotFoundException("Error retrieving players from squad");
        }

        for (Player existingPlayer: playerList) {
            Integer playerNumber = existingPlayer.getNumber();

            existingPlayer.setStarter(numbers.contains(playerNumber));
            playerRepository.save(existingPlayer);
        }
    }

    // Change Player Properties
    public void editPlayer(Player player, String userId) {
        User user = userService.getUser(userId);
        Long playerId = player.getId();

        Optional<Player> playerOptional = playerRepository.findPlayerOfUserByPlayerId(userId, playerId);
        if (playerOptional.isEmpty()) {
            throw new EntityNotFoundException("Player not found!");
        }

        Player existingPlayer = playerOptional.get();
        Long squadId = existingPlayer.getSquad().getId();
        Integer playerNumber = player.getNumber();

        // Check if player with same number exists
        Optional<Player> duplicatePlayer = playerRepository.findPlayerOfUserBySquadIdAndNumber(userId, squadId, playerNumber);

        if (duplicatePlayer.isPresent() && !player.getId().equals(duplicatePlayer.get().getId())) {
            String message = String.format("Player with Number #%s already exists", player.getNumber());
            throw new DuplicateException(message);
        }

        BeanUtils.copyProperties(player, existingPlayer,"squad");
        playerRepository.save(existingPlayer);
    }

    // Delete
    public void deletePlayer(Long playerId, String userId) {
        Optional<Player> playerOptional = playerRepository.findPlayerOfUserByPlayerId(userId, playerId);
        if (playerOptional.isEmpty()) {
            throw new EntityNotFoundException("Player not found!");
        }
        playerRepository.deleteById(playerId);
    }

    // Create New Player
    public void addNewPlayer(Player newPlayer, Long squadId, String userId) {
        User user = userService.getUser(userId);

        Optional<Squad> squadOptional = squadRepository.findSquadByIdAndUser_UserId(squadId, userId);
        if (squadOptional.isEmpty()) {
            throw new IllegalArgumentException("Squad not found");
        }

        Optional<Player> playerOptional = playerRepository.findPlayerOfUserBySquadIdAndNumber(
                userId,
                squadId,
                newPlayer.getNumber()
        );

        if (playerOptional.isPresent()) {
            throw new DuplicateException("Player with same number already exists.");
        }
        newPlayer.setSquad(squadOptional.get());
        playerRepository.save(newPlayer);
    }
}
