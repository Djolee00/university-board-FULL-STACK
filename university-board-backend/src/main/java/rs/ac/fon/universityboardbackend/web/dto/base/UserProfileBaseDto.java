package rs.ac.fon.universityboardbackend.web.dto.base;

import jakarta.validation.constraints.NotNull;
import java.util.Set;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public abstract class UserProfileBaseDto implements BaseDto {
    @NotNull protected final String email;
    @NotNull protected final RoleDto role;
    protected final Set<PrivilegeDto> privileges;
}
