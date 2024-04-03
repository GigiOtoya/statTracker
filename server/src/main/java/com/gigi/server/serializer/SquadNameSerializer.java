package com.gigi.server.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

public class SquadNameSerializer extends JsonSerializer<String> {
    @Override
    public void serialize(String name, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        String formattedName = formatSquadName(name);
        gen.writeString(formattedName);
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
