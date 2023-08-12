package rs.ac.fon.universityboardbackend.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.fon.universityboardbackend.model.user.UserProfile;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    long count(Specification<UserProfile> search);

    Optional<UserProfile> findByUuid(UUID uuid);
}
