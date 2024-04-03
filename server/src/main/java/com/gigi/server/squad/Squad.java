package com.gigi.server.squad;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gigi.server.player.Player;
import com.gigi.server.user.User;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "squads")
public class Squad {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

//    @Column(unique = true)
    private String name;

    @JsonManagedReference
    @JsonIgnore
    @ManyToOne
    private User user;

    @JsonManagedReference
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "squad")
    private List<Player> players;

    public Squad() {}
    public Squad(Long id, String name) {
        this.id = id;
        this.name = name;
    }
    public Squad(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

//    @JsonSerialize(using = SquadNameSerializer.class)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUser(User user) {this.user = user;}

    public List<Player> getPlayers() {
        return players;
    }
}