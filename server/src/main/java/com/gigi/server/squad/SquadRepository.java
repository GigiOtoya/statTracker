package com.gigi.server.squad;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface SquadRepository extends JpaRepository<Squad, Long> {
    Optional<Squad> findSquadById(Long squadId);

    @Query("SELECT s FROM Squad s WHERE LOWER(s.name) = LOWER(:name)")
    Optional<Squad> findSquadByName(@Param("name") String name);

    Optional<Squad> findSquadByIdAndUser_UserId(Long id, String userId);

    List<Squad> findSquadsByUser_UserId(String userId);

    @Query("SELECT s FROM Squad s JOIN s.user u WHERE LOWER(s.name) = LOWER(:name) AND u.userId = :userId")
    Optional<Squad> findSquadByNameAndUser_UserId(String name, String userId);

    @Query("SELECT s.name FROM Squad s")
    List<String> findAllSquadNames();

    @Query("SELECT  new map (s.id as id, s.name as name)  FROM Squad s")
    List<Map<String, Object>> findAllIdentifiers();

    @Query("SELECT s FROM Squad s LEFT JOIN FETCH s.players Where s.id = :squadId")
    Optional<Squad> findSquadWithPlayersById(@Param("squadId") Integer squadId);


}