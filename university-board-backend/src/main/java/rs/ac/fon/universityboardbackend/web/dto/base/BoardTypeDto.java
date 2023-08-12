package rs.ac.fon.universityboardbackend.web.dto.base;

import java.util.UUID;

public record BoardTypeDto(UUID uuid, String name) implements BaseDto {}
