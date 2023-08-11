package rs.ac.fon.universityboardbackend.service.impl;

import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rs.ac.fon.universityboardbackend.exception.ResourceNotFoundException;
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
        if (employee.getUserProfile() != null) {
            if (userProfileService.count(
                            new UserProfileSearch().setEmail(employee.getUserProfile().getEmail()))
                    > 0) {
                throw new ValidationException(
                        "Email - " + employee.getUserProfile().getEmail() + " - already exists.");
            }

            Set<Privilege> privileges = employee.getUserProfile().getPrivileges();
            if (privileges != null && !privileges.isEmpty()) {
                privileges.forEach(
                        privilege -> {
                            if (employee.getUserProfile()
                                    .getRole()
                                    .getPrivileges()
                                    .contains(privilege)) {
                                throw new ValidationException(
                                        "Privilege with code - "
                                                + privilege.getCode()
                                                + " - already exists in Role - "
                                                + employee.getUserProfile().getRole().getName());
                            }
                        });
            }
        }

        employeeRepository.save(employee);
    }

    @Override
    @Transactional(readOnly = true)
    public Employee findByUuid(UUID uuid) {
        return employeeRepository
                .findByUuid(uuid)
                .orElseThrow(
                        () ->
                                new ResourceNotFoundException(
                                        "Employee with UUUID - " + uuid + " - doesn't exist"));
    }
}