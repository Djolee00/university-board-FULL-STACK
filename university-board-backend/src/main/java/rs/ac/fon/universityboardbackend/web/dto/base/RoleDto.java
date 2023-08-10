package rs.ac.fon.universityboardbackend.web.dto.base;

import jakarta.validation.constraints.NotNull;
import java.util.Set;
import java.util.UUID;

public record RoleDto(@NotNull UUID uuid, String name, Set<PrivilegeDto> privileges)
        implements BaseDto {}
