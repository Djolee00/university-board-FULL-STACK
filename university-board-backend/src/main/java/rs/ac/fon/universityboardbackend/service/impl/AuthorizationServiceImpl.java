package rs.ac.fon.universityboardbackend.service.impl;

import jakarta.validation.constraints.NotNull;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import rs.ac.fon.universityboardbackend.exception.AccessDeniedException;
import rs.ac.fon.universityboardbackend.model.user.Privilege;
import rs.ac.fon.universityboardbackend.model.user.Privilege.PrivilegeCode;
import rs.ac.fon.universityboardbackend.model.user.UserProfile;
import rs.ac.fon.universityboardbackend.service.AuthorizationService;

@Service
public class AuthorizationServiceImpl implements AuthorizationService {

    @Override
    public void hasPrivilegeOrThrow(@NotNull UserProfile userProfile, PrivilegeCode... privileges) {
        if (hasRequiredPrivilege(userProfile.getRole().getPrivileges(), privileges)
                || (userProfile.getPrivileges() != null
                        && !userProfile.getPrivileges().isEmpty()
                        && hasRequiredPrivilege(userProfile.getPrivileges(), privileges))) {
            return;
        }
        throw new AccessDeniedException("Missing privilege for required action");
    }

    private boolean hasRequiredPrivilege(
            Set<Privilege> userPrivileges, PrivilegeCode... requiredPrivileges) {
        Set<PrivilegeCode> privilegeCodes =
                userPrivileges.stream().map(Privilege::getCode).collect(Collectors.toSet());
        return Arrays.stream(requiredPrivileges).anyMatch(privilegeCodes::contains);
    }
}
