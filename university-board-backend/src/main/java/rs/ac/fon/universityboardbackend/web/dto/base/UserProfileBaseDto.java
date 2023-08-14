package rs.ac.fon.universityboardbackend.web.dto.base;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserProfileBaseDto implements BaseDto {
    @NotBlank protected String email;
    @NotNull protected RoleDto role;
    protected Set<PrivilegeDto> privileges;
}
