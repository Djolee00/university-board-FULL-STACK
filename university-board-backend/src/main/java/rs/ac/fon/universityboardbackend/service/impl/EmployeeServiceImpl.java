package rs.ac.fon.universityboardbackend.service.impl;

import jakarta.transaction.Transactional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.ac.fon.universityboardbackend.exception.ValidationException;
import rs.ac.fon.universityboardbackend.model.employee.Employee;
import rs.ac.fon.universityboardbackend.model.user.Privilege;
import rs.ac.fon.universityboardbackend.repository.EmployeeRepository;
import rs.ac.fon.universityboardbackend.search.domain.UserProfileSearch;
import rs.ac.fon.universityboardbackend.service.EmployeeService;
import rs.ac.fon.universityboardbackend.service.UserProfileService;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final UserProfileService userProfileService;

    @Override
    @Transactional
    public void saveOrUpdate(Employee employee) {
        if (employee.userProfile() != null) {
            if (userProfileService.count(
                            new UserProfileSearch().email(employee.userProfile().email()))
                    > 0) {
                throw new ValidationException(
                        "Email - " + employee.userProfile().email() + " - already exists.");
            }

            Set<Privilege> privileges = employee.userProfile().privileges();
            if (privileges != null && !privileges.isEmpty()) {
                privileges.forEach(
                        privilege -> {
                            if (employee.userProfile().role().privileges().contains(privilege)) {
                                throw new ValidationException(
                                        "Privilege with code - "
                                                + privilege.code()
                                                + " - already exists in Role - "
                                                + employee.userProfile().role().name());
                            }
                        });
            }
        }

        employeeRepository.save(employee);
    }
}
