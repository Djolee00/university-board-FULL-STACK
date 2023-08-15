package rs.ac.fon.universityboardbackend.web.dto.patch;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import rs.ac.fon.universityboardbackend.web.dto.base.BaseDto;

public record UserProfilePatchDto(
        @NotNull String oldPassword,
        @NotNull
                @Pattern(
                        regexp =
                                "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{6,}$",
                        message =
                                "Password must have at least one digit, one uppercase letter and one special character. Minimum length is 6 characters")
                String newPassword)
        implements BaseDto {}
