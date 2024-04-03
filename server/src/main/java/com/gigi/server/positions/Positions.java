package com.gigi.server.positions;

public enum Positions {
    GOALKEEPER("GK"),
    CENTERBACK("CB"),
    LEFTBACK("LB"),
    RIGHTBACK("RB"),
    CENTERMID("CM"),
    LEFTMID("LM"),
    RIGHTMID("RM"),
    LEFTWING("LW"),
    RIGHTWING("RW"),
    CENTRALFORWARD("CF"),
    STRIKER("ST");

    private final String position;
    Positions(String position) {
        this.position = position;
    }

    public String getPosition() {
        return position;
    }
}