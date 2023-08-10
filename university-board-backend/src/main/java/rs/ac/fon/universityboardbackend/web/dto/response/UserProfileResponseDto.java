package rs.ac.fon.universityboardbackend.web.dto.response;

import java.util.List;
import java.util.UUID;
import lombok.Getter;
import rs.ac.fon.universityboardbackend.web.dto.base.PrivilegeDto;
import rs.ac.fon.universityboardbackend.web.dto.base.RoleDto;
import rs.ac.fon.universityboardbackend.web.dto.base.UserProfileBaseDto;

@Getter
public class UserProfileResponseDto extends UserProfileBaseDto {

    private final UUID uuid;

    public UserProfileResponseDto(
            String email, RoleDto role, List<PrivilegeDto> privileges, UUID uuid) {
        super(email, role, privileges);
        this.uuid = uuid;
    }
}
