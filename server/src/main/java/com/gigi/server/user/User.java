package com.gigi.server.user;

import com.gigi.server.squad.Squad;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String userId;

    public User() {}

    public User(String userId) {
        this.userId = userId;
    }

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
//    @JoinColumn(name = "user_id")
    private List<Squad> squads;

    public List<Squad> getSquads() {
        return squads;
    };
}
