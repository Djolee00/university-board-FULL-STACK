package rs.ac.fon.universityboardbackend.service;

import rs.ac.fon.universityboardbackend.model.user.Privilege;
import rs.ac.fon.universityboardbackend.model.user.UserProfile;

public interface AuthorizationService {

    void hasPrivilegeOrThrow(UserProfile userProfile, Privilege... privileges);
}
