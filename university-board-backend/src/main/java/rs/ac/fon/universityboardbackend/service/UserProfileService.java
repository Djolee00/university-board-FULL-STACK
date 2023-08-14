package rs.ac.fon.universityboardbackend.service;

import java.util.UUID;
import org.springframework.security.core.userdetails.UserDetailsService;
import rs.ac.fon.universityboardbackend.model.user.UserProfile;
import rs.ac.fon.universityboardbackend.search.domain.UserProfileSearch;

public interface UserProfileService {

    long count(UserProfileSearch search);

    UserProfile findByUuid(UUID uuid);

    void updatePassword(UserProfile userProfile, String s, String s1);

    String encryptPassword(String password);

    UserDetailsService userDetailsService();

    UserProfile getLoggedUser();
}
