package rs.ac.fon.universityboardbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.fon.universityboardbackend.model.employee.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {}
