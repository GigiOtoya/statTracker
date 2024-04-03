package com.gigi.server.dto.player;

import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.Length;

public class PlayerDTO {
    @NotBlank
    @Min(value = 1)
    @Max(value = 10)
    private Integer position;

    @NotBlank
    @Size(min = 1, max = 35)
    private String firstName;

    @NotBlank
    @Size(min = 1, max = 35)
    private String lastName;

    @NotNull
    private Boolean starter;

    @NotNull
    @Min(value = 1)
    @Max(value = 10)
    private Integer speed;

    @NotNull
    @Min(value = 1)
    @Max(value = 10)
    private Integer shooting;

    @NotNull
    @Min(value = 1)
    @Max(value = 10)
    private Integer physical;

    @NotNull
    @Min(value = 1)
    @Max(value = 10)
    private Integer defending;

    @NotNull
    @Min(value = 1)
    @Max(value = 10)
    private Integer dribbling;

    @NotNull
    @Min(value = 1)
    @Max(value = 10)
    private Integer passing;

    @NotNull
    @Min(value = 1)
    @Max(value = 10)
    private Integer vision;

}
