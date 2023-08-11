package rs.ac.fon.universityboardbackend.service;

import java.util.UUID;
import rs.ac.fon.universityboardbackend.model.employee.Employee;

public interface EmployeeService {

    void saveOrUpdate(Employee employee);

    Employee findByUuid(UUID uuid);
}
