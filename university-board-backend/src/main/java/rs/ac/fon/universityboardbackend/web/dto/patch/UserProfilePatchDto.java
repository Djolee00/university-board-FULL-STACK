package rs.ac.fon.universityboardbackend.web.dto.patch;

import jakarta.validation.constraints.NotNull;
import rs.ac.fon.universityboardbackend.web.dto.base.BaseDto;

public record UserProfilePatchDto(@NotNull String oldPassword, @NotNull String newPassword)
        implements BaseDto {}
