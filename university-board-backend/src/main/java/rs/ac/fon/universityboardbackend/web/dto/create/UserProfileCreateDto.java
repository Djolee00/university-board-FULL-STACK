package rs.ac.fon.universityboardbackend.web.dto.create;

import jakarta.validation.constraints.NotNull;
import java.util.Set;
import lombok.Getter;
import rs.ac.fon.universityboardbackend.web.dto.base.PrivilegeDto;
import rs.ac.fon.universityboardbackend.web.dto.base.RoleDto;
import rs.ac.fon.universityboardbackend.web.dto.base.UserProfileBaseDto;

@Getter
public class UserProfileCreateDto extends UserProfileBaseDto {

    @NotNull private final String password;

    public UserProfileCreateDto(
            String email, RoleDto role, Set<PrivilegeDto> privileges, String password) {
        super(email, role, privileges);
        this.password = password;
    }
}
