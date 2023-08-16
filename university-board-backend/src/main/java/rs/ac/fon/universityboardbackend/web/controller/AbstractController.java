package rs.ac.fon.universityboardbackend.web.controller;

import lombok.RequiredArgsConstructor;
import rs.ac.fon.universityboardbackend.model.user.Privilege.PrivilegeCode;
import rs.ac.fon.universityboardbackend.service.AuthorizationService;
import rs.ac.fon.universityboardbackend.service.UserProfileService;

@RequiredArgsConstructor
public abstract class AbstractController {

    private final AuthorizationService authorizationService;
    private final UserProfileService userProfileService;

    public void hasPrivilegeOrThrow(PrivilegeCode... privileges) {
        authorizationService.hasPrivilegeOrThrow(userProfileService.getLoggedUser(), privileges);
    }
}
