package rs.ac.fon.universityboardbackend.service.impl;

import java.util.UUID;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rs.ac.fon.universityboardbackend.exception.ResourceNotFoundException;
import rs.ac.fon.universityboardbackend.exception.ValidationException;
import rs.ac.fon.universityboardbackend.model.user.UserProfile;
import rs.ac.fon.universityboardbackend.repository.UserProfileRepository;
import rs.ac.fon.universityboardbackend.search.domain.UserProfileSearch;
import rs.ac.fon.universityboardbackend.search.specification.UserProfileJpaSpecification;
import rs.ac.fon.universityboardbackend.service.UserProfileService;

@Service
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final PasswordEncoder passwordEncoder;

    public UserProfileServiceImpl(
            UserProfileRepository userProfileRepository, @Lazy PasswordEncoder passwordEncoder) {
        this.userProfileRepository = userProfileRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional(readOnly = true)
    public long count(UserProfileSearch search) {
        return userProfileRepository.count(new UserProfileJpaSpecification(search));
    }

    @Override
    @Transactional(readOnly = true)
    public UserProfile findByUuid(UUID uuid) {
        return userProfileRepository
                .findByUuid(uuid)
                .orElseThrow(
                        () ->
                                new ResourceNotFoundException(
                                        "User Profile with UUID - " + uuid + " - doesn't exist"));
    }

    @Override
    @Transactional
    public void updatePassword(UserProfile userProfile, String oldPassword, String newPassword) {
        if (passwordEncoder.matches(oldPassword, userProfile.getPassword())) {
            String newPasswordHash = passwordEncoder.encode(newPassword);
            userProfile.setPassword(newPasswordHash);
            userProfileRepository.save(userProfile);
        } else {
            throw new ValidationException("Wrong old password provided.");
        }
    }

    @Override
    public String encryptPassword(String password) {
        return passwordEncoder.encode(password);
    }

    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username)
                    throws UsernameNotFoundException {
                return userProfileRepository
                        .findByEmail(username)
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "User Profile with email - "
                                                        + username
                                                        + " - not found"));
            }
        };
    }
}
