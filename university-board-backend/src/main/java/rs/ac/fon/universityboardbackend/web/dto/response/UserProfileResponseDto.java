package rs.ac.fon.universityboardbackend.web.dto.response;

import jakarta.validation.constraints.NotNull;
import java.util.Set;
import java.util.UUID;
import lombok.Getter;
import rs.ac.fon.universityboardbackend.web.dto.base.PrivilegeDto;
import rs.ac.fon.universityboardbackend.web.dto.base.RoleDto;
import rs.ac.fon.universityboardbackend.web.dto.base.UserProfileBaseDto;

@Getter
public class UserProfileResponseDto extends UserProfileBaseDto {

    @NotNull private final UUID uuid;

    public UserProfileResponseDto(
            String email, RoleDto role, Set<PrivilegeDto> privileges, UUID uuid) {
        super(email, role, privileges);
        this.uuid = uuid;
    }
}
