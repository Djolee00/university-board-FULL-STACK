package rs.ac.fon.universityboardbackend.web.dto.base;

import jakarta.validation.constraints.NotNull;
import rs.ac.fon.universityboardbackend.model.user.Privilege.PrivilegeCode;

public record PrivilegeDto(@NotNull PrivilegeCode code, String name) implements BaseDto {}
