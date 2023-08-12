package rs.ac.fon.universityboardbackend.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.fon.universityboardbackend.model.employee.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByUuid(UUID uuid);

    Page<Employee> findAll(Specification<Employee> search, Pageable pageable);

    List<Employee> findAll(Specification<Employee> search);
}
