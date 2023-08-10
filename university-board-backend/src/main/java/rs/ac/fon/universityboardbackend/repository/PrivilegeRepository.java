package rs.ac.fon.universityboardbackend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.fon.universityboardbackend.model.user.Privilege;
import rs.ac.fon.universityboardbackend.model.user.Privilege.PrivilegeCode;

@Repository
public interface PrivilegeRepository extends JpaRepository<Privilege, Long> {

    Optional<Privilege> findByCode(PrivilegeCode code);
}
