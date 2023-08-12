package rs.ac.fon.universityboardbackend.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import rs.ac.fon.universityboardbackend.model.employee.Employee;
import rs.ac.fon.universityboardbackend.search.domain.EmployeeSearch;

public interface EmployeeService {

    void saveOrUpdate(Employee employee);

    Employee findByUuid(UUID uuid);

    Page<Employee> findAll(EmployeeSearch search, Pageable pageable);

    List<Employee> findAll(EmployeeSearch search);
}
