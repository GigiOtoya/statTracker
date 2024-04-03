package com.gigi.server.player;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/players")
public class PlayerController {
    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public List<Player> getPlayers() {
        return playerService.getPlayers();
    }

    @GetMapping(path = "/squad/{squadId}")
    public List<Player> getPlayersBySquadId(
            @PathVariable("squadId") Long squadId,
            HttpServletRequest request
    ) {
        String userId = (String) request.getAttribute("userId");

//        return playerService.getPlayersBySquadId(squadId, userId);
        return playerService.getPlayersFromSquad(userId, squadId);
    }

    @PutMapping(path = "/squad/{squadId}")
    public ResponseEntity<String> editStarters(
            @RequestBody List<Integer> numbers,
            @PathVariable Long squadId,
            HttpServletRequest request
    ) {
        String userId = (String) request.getAttribute("userId");

        playerService.editStarters(numbers, squadId, userId);
        return new ResponseEntity<>("Starters updated", HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> createNewPlayer(
            @RequestBody Player player,
            @RequestParam Long squadId,
            HttpServletRequest request
    ){
        String userId = (String) request.getAttribute("userId");

        playerService.addNewPlayer(player, squadId, userId);
        return new ResponseEntity<>("Player added successfully", HttpStatus.OK);
    }

    @PutMapping(path = "/id/{id}")
    public ResponseEntity<String> editPlayer(
            @RequestBody Player player,
            HttpServletRequest request
    ) {
        String userId = (String) request.getAttribute("userId");

        playerService.editPlayer(player, userId);
        return new ResponseEntity<>("Player updated", HttpStatus.OK);
    }

    @DeleteMapping(path = "/id/{playerId}")
    public ResponseEntity<String> deletePlayer(
            @PathVariable Long playerId,
            HttpServletRequest request
    ){
        String userId = (String) request.getAttribute("userId");

        playerService.deletePlayer(playerId, userId);
        return new ResponseEntity<>("Player deleted successfully", HttpStatus.OK);
    }

}
