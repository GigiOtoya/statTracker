package com.gigi.server.player;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gigi.server.squad.Squad;
import jakarta.persistence.*;

@Entity
@Table(
        name="players",
        uniqueConstraints = @UniqueConstraint(columnNames = {"squad_id", "number"})
)
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // foreign key "squad_id" refers to the primary key in the Squad table.
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "squad_id")
    private Squad squad;

    @Column(name = "number")
    private Integer number;

    private String firstName;

    private String lastName;

    private String position;

    private Boolean starter;

    private Integer speed;

    private Integer shooting;

    private Integer physical;

    private Integer defending;

    private Integer dribbling;

    private Integer passing;

    private Integer vision;

    public Player() {};

    public Player(
            Integer number,
            String firstName,
            String lastName,
            String position,
            Integer speed,
            Integer shooting,
            Integer physical,
            Integer defending,
            Integer dribbling,
            Integer passing,
            Integer vision
            ){
        this.number = number;
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.speed = speed;
        this.shooting = shooting;
        this.physical = physical;
        this.defending = defending;
        this.dribbling = dribbling;
        this.passing = passing;
        this.vision = vision;
    }
    public Long getId() {
        return id;
    }
    public Integer getNumber() {
        return number;
    }
    public String getFirstName() {
        return firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public String getPosition() {
        return position;
    }
    public Boolean getStarter() {
        return starter;
    }
    public Integer getSpeed() {
        return speed;
    }
    public Integer getShooting() {
        return shooting;
    }
    public Integer getPhysical() {
        return physical;
    }
    public Integer getDefending() {
        return defending;
    }
    public Integer getDribbling() {
        return dribbling;
    }
    public Integer getPassing() {
        return passing;
    }
    public Integer getVision() {
        return vision;
    }
    public Squad getSquad() {
        return squad;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public void setNumber(Integer number) {
        this.number = number;
    }
    public void setFirstName(String firstName) {
        this.firstName= firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPosition(String position) {
        this.position = position;
    }
    public void setStarter(Boolean starter) {
        this.starter = starter;
    }
    public void setSpeed(Integer speed) {
        this.speed = speed;
    }
    public void setShooting(Integer shooting) {
        this.shooting = shooting;
    }
    public void setPhysical(Integer physical) {
        this.physical = physical;
    }
    public void setDefending(Integer defending) {
        this.defending = defending;
    }
    public void setDribbling(Integer dribbling) {
        this.dribbling = dribbling;
    }
    public void setPassing(Integer passing) {
        this.passing = passing;
    }
    public void setVision(Integer vision) {
        this.vision = vision;
    }

    public void setSquad(Squad squad) {
        this.squad = squad;
    }
}
