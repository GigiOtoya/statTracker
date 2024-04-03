package com.gigi.server.dto;

public class SquadDTO {
    private Integer id;
    private String name;

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = formatSquadName(name);
    }

    private String formatSquadName(String name) {
        String[] words = name.split(" ");
        for (int i=0; i< words.length; i++){
            String firstLetter = words[i].substring(0,1).toUpperCase();
            String otherLetters = words[i].substring(1).toLowerCase();
            String word = firstLetter + otherLetters;
            words[i] = word;
        }
        return String.join(" ", words);
    }
}
