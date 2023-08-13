package rs.ac.fon.universityboardbackend.web.dto.base;

import java.util.UUID;

public record BoardFileBaseDto(UUID uuid, String originalName, String type) implements BaseDto {}
