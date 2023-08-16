package rs.ac.fon.universityboardbackend.service.impl;

import jakarta.validation.constraints.NotNull;
import java.util.Arrays;
import java.util.Set;
import org.springframework.stereotype.Service;
import rs.ac.fon.universityboardbackend.exception.AccessDeniedException;
import rs.ac.fon.universityboardbackend.model.user.Privilege;
import rs.ac.fon.universityboardbackend.model.user.UserProfile;
import rs.ac.fon.universityboardbackend.service.AuthorizationService;

@Service
public class AuthorizationServiceImpl implements AuthorizationService {

    @Override
    public void hasPrivilegeOrThrow(
            @NotNull UserProfile userProfile, @NotNull Privilege... privileges) {
        if (hasRequiredPrivilege(userProfile.getRole().getPrivileges(), privileges)
                || (userProfile.getPrivileges() != null
                        && !userProfile.getPrivileges().isEmpty()
                        && hasRequiredPrivilege(userProfile.getPrivileges(), privileges))) {
            return;
        }
        throw new AccessDeniedException("Missing privilege for required action");
    }

    private boolean hasRequiredPrivilege(
            Set<Privilege> userPrivileges, Privilege... requiredPrivileges) {
        return Arrays.stream(requiredPrivileges).anyMatch(userPrivileges::contains);
    }
}
