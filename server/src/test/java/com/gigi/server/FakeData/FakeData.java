package com.gigi.server.FakeData;

import com.gigi.server.player.Player;
import com.gigi.server.player.PlayerRepository;
import com.gigi.server.positions.Positions;
import com.gigi.server.squad.Squad;
import com.gigi.server.squad.SquadRepository;
import com.gigi.server.user.User;
import com.gigi.server.user.UserRepository;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.IntStream;

@Component
@Profile("local")
public class FakeData implements CommandLineRunner {

    private final UserRepository userRepository;
    private final SquadRepository squadRepository;
    private final PlayerRepository playerRepository;
    private final Faker faker;
    private final Random random = new Random();

    public FakeData(
            UserRepository userRepository,
            SquadRepository squadRepository,
            PlayerRepository playerRepository,
            Faker faker
    ) {
        this.userRepository = userRepository;
        this.squadRepository = squadRepository;
        this.playerRepository = playerRepository;
        this.faker = faker;
    }

    @Override
    public void run(String... args) throws Exception {
        List<User> userList = IntStream.rangeClosed(1,5).
                mapToObj(i -> new User("" + faker.barcode().ean13())).toList();

        userRepository.saveAll(userList);

        List<Squad> squadList = IntStream.rangeClosed(1,5).
                mapToObj(i -> new Squad(faker.team().name())).toList();

        int index = 0;
        for (Squad squad : squadList) {
            squad.setUser(userList.get(index++));
        }

        squadRepository.saveAll(squadList);

        Positions[] positionList = Positions.values();

        for (Squad squad : squadList) {
            Set<Integer> numberSet = new HashSet<>();
            for (int i = 0; i < 25; i++) {
                String pos = faker.football().positions();
                StringBuilder position = new StringBuilder().append(Character.toUpperCase(pos.charAt(0)));

                for (int j = 1; j < pos.length(); j++ ) {
                    if (pos.charAt(j) == ' ')
                        position.append(Character.toUpperCase(pos.charAt(j+1)));
                }

                Integer playerNumber;
                do {
                    playerNumber = faker.number().numberBetween(1,100);
                } while (!numberSet.add(playerNumber));

                Player player = new Player(
                        playerNumber,
                        faker.name().firstName(),
                        faker.name().lastName(),
                        positionList[random.nextInt(positionList.length)].getPosition(),
                        faker.number().numberBetween(1,11),
                        faker.number().numberBetween(1,11),
                        faker.number().numberBetween(1,11),
                        faker.number().numberBetween(1,11),
                        faker.number().numberBetween(1,11),
                        faker.number().numberBetween(1,11),
                        faker.number().numberBetween(1,11)
                );
                player.setSquad(squad);
                playerRepository.save(player);
            }
        }
    }
}
