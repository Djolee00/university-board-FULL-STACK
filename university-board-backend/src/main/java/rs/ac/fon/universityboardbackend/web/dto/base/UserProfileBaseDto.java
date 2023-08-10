package rs.ac.fon.universityboardbackend.web.dto.base;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public abstract class UserProfileBaseDto implements BaseDto {
    protected final String email;
    protected final RoleDto role;
    protected final List<PrivilegeDto> privileges;
}
