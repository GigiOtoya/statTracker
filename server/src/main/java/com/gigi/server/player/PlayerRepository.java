package com.gigi.server.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    Optional<Player> findPlayerByNumber(Integer number);

    @Query("SELECT p FROM Player p JOIN p.squad s WHERE s.user.userId = :userId AND s.id = :squadId")
    List<Player> findPlayersByUserIdAndSquadId(@Param("userId") String userId, @Param("squadId") Long squadId);

    @Query("SELECT p FROM Player p WHERE p.squad.id = :squadId")
    List<Player> findPlayersBySquadId(@Param("squadId") Long squadId);

    @Query("SELECT p FROM Player p JOIN FETCH p.squad WHERE p.squad.name = :squadName")
    List<Player> findPlayersBySquadName(@Param("squadName") String name);

    @Query("SELECT p FROM Player p WHERE p.number = :number AND p.squad.id = :squadId")
    Player findPlayerByNumberAndSquadId(
            @Param("number") Integer number,
            @Param("squadId") Long squadId
    );

    @Query("SELECT p FROM Player p JOIN p.squad.user u WHERE u.userId = :userId AND p.id = :playerId")
    Optional<Player> findPlayerOfUserByPlayerId(
            @Param("userId") String userId,
            @Param("playerId") Long playerId
    );

    @Query("SELECT p FROM Player p JOIN p.squad s WHERE s.user.userId = :userId AND s.id = :squadId AND p.id = :playerId")
    Optional<Player> findPlayerOfUserBySquadIdAndPlayerId(
            @Param("userId") String userId,
            @Param("squadId") Long squadId,
            @Param("playerId") Long playerId
    );

    @Query("SELECT p FROM Player p JOIN p.squad s WHERE s.user.userId = :userId AND s.id = :squadId AND p.number = :number")
    Optional<Player> findPlayerOfUserBySquadIdAndNumber(
            @Param("userId") String userId,
            @Param("squadId") Long squadId,
            @Param("number") Integer number
            );
}
