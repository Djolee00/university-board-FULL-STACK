package rs.ac.fon.universityboardbackend.service.impl;

import jakarta.transaction.Transactional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.ac.fon.universityboardbackend.exception.ValidationException;
import rs.ac.fon.universityboardbackend.model.employee.Employee;
import rs.ac.fon.universityboardbackend.model.user.Privilege;
import rs.ac.fon.universityboardbackend.repository.EmployeeRepository;
import rs.ac.fon.universityboardbackend.service.EmployeeService;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    @Transactional
    public void saveOrUpdate(Employee employee) {
        Set<Privilege> privileges = employee.userProfile().privileges();
        if (privileges != null && !privileges.isEmpty()) {
            privileges.forEach(
                    privilege -> {
                        if (employee.userProfile().role().privileges().contains(privilege)) {
                            throw new ValidationException(
                                    "Privilege with code - "
                                            + privilege.getCode()
                                            + " - already exists in Role - "
                                            + employee.userProfile().role().name());
                        }
                    });
        }
        employeeRepository.save(employee);
    }
}
