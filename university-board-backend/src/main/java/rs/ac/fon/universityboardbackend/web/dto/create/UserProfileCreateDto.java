package rs.ac.fon.universityboardbackend.web.dto.create;

import java.util.List;
import lombok.Getter;
import rs.ac.fon.universityboardbackend.web.dto.base.PrivilegeDto;
import rs.ac.fon.universityboardbackend.web.dto.base.RoleDto;
import rs.ac.fon.universityboardbackend.web.dto.base.UserProfileBaseDto;

@Getter
public class UserProfileCreateDto extends UserProfileBaseDto {

    private final String password;

    public UserProfileCreateDto(
            String email, RoleDto role, List<PrivilegeDto> privileges, String password) {
        super(email, role, privileges);
        this.password = password;
    }
}
