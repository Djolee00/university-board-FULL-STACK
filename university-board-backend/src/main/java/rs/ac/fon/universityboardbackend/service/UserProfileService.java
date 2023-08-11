package rs.ac.fon.universityboardbackend.service;

import rs.ac.fon.universityboardbackend.search.domain.UserProfileSearch;

public interface UserProfileService {

    long count(UserProfileSearch search);
}
