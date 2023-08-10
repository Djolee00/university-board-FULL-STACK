package rs.ac.fon.universityboardbackend.web.dto.base;

import java.util.Set;
import java.util.UUID;

public record RoleDto(UUID uuid, String name, Set<PrivilegeDto> privileges) implements BaseDto {}
