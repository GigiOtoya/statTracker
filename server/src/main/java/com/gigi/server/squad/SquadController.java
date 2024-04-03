package com.gigi.server.squad;

import com.gigi.server.dto.SquadCreateDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/squads")
public class SquadController {

    private final SquadService squadService;

    @Autowired
    public SquadController(SquadService squadService) {
        this.squadService = squadService;
    }

    @GetMapping
    public List<Squad> getAllSquads() {
        return squadService.getAllSquads();
    }

    @GetMapping(path = "/names")
    public List<String> getAllSquadNames() {
        return squadService.getAllSquadNames();
    }

    @GetMapping(path = "/identifiers")
    public List<Map<String, Object>> getAllIdentifiers(HttpServletRequest request) {
        String userId = (String) request.getAttribute("userId");

        return squadService.getAllIdentifiers();
    }

    @GetMapping(path = "/all")
    public List<Squad> getSquadIdentifiers(HttpServletRequest request) {
        String userId = (String) request.getAttribute("userId");
        return squadService.getSquadIdentifiers(userId);
    }

    @GetMapping(path = "/id/{squadId}")
    public ResponseEntity<Squad> getSquadById(
            @PathVariable Long squadId,
            HttpServletRequest request
    ) {
        String userId = (String) request.getAttribute("userId");

        Squad squadWithPlayers = squadService.getSquadByUserIdAndSquadId(squadId, userId);
        return squadWithPlayers != null
                ? new ResponseEntity<>(squadWithPlayers, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

//    @GetMapping(path = "name/{name}")
//    public ResponseEntity<Squad> getSquadByName(
//            @PathVariable String name,
//            HttpServletRequest request
//    ) {
//        String userId = (String) request.getAttribute("userId");
//
//        Squad squadWithPlayers = squadService.getSquadByName(name, userId);
//        return squadWithPlayers != null
//                ? new ResponseEntity<>(squadWithPlayers, HttpStatus.OK)
//                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
//    }

    @PostMapping
    public ResponseEntity<String> createNewSquad(
            @Valid @RequestBody SquadCreateDTO squadCreateDTO,
            HttpServletRequest request
    ) {
        String userId = (String) request.getAttribute("userId");

        String newSquadName = squadCreateDTO.getName();
        Squad newSquad = new Squad(newSquadName);
        squadService.addNewSquad(newSquad, userId);
        return new ResponseEntity<>("Squad created successfully", HttpStatus.CREATED);
    }

    @PutMapping(path = "/id/{squadId}")
    public ResponseEntity<String> editSquad(
            @PathVariable Long squadId,
            @Valid @RequestBody SquadCreateDTO squadCreateDTO,
            HttpServletRequest request
    ) {
        String userId = (String) request.getAttribute("userId");

        squadService.updateSquadName(squadId, squadCreateDTO, userId);
        return new ResponseEntity<>("Squad Name Updated", HttpStatus.OK);
    }

    @DeleteMapping(path = "/id/{squadId}")
    public ResponseEntity<String> deleteSquad(
            @PathVariable Long squadId,
            HttpServletRequest request
    ) {
        String userId = (String) request.getAttribute("userId");

        squadService.deleteSquad(squadId, userId);
        return new ResponseEntity<>("Squad deleted successfully", HttpStatus.OK);
    }
}