package rs.ac.fon.universityboardbackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.ac.fon.universityboardbackend.repository.UserProfileRepository;
import rs.ac.fon.universityboardbackend.search.domain.UserProfileSearch;
import rs.ac.fon.universityboardbackend.search.specification.UserProfileJpaSpecification;
import rs.ac.fon.universityboardbackend.service.UserProfileService;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileRepository userProfileRepository;

    @Override
    public long count(UserProfileSearch search) {
        return userProfileRepository.count(new UserProfileJpaSpecification(search));
    }
}
