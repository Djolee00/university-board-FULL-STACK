package rs.ac.fon.universityboardbackend.service.impl;

import jakarta.mail.MessagingException;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rs.ac.fon.universityboardbackend.exception.MailServiceException;
import rs.ac.fon.universityboardbackend.exception.ResourceNotFoundException;
import rs.ac.fon.universityboardbackend.exception.ValidationException;
import rs.ac.fon.universityboardbackend.model.employee.Employee;
import rs.ac.fon.universityboardbackend.model.user.Privilege;
import rs.ac.fon.universityboardbackend.repository.EmployeeRepository;
import rs.ac.fon.universityboardbackend.search.domain.EmployeeSearch;
import rs.ac.fon.universityboardbackend.search.domain.UserProfileSearch;
import rs.ac.fon.universityboardbackend.search.specification.EmployeeJpaSpecification;
import rs.ac.fon.universityboardbackend.service.EmailService;
import rs.ac.fon.universityboardbackend.service.EmployeeService;
import rs.ac.fon.universityboardbackend.service.UserProfileService;
import rs.ac.fon.universityboardbackend.util.PasswordGenerator;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final UserProfileService userProfileService;
    private final EmailService emailService;

    @Override
    @Transactional
    public void saveOrUpdate(Employee employee) {
        String generatedPassword = null;
        if (employee.getUserProfile() != null && employee.getUserProfile().getUuid() == null) {
            validateEmployee(employee);

            generatedPassword = PasswordGenerator.generateRandomPassword();

            employee.getUserProfile()
                    .setPassword(userProfileService.encryptPassword(generatedPassword));
        }
        employeeRepository.save(employee);
        if (generatedPassword != null) {
            try {
                emailService.sendWelcomeMail(employee.getUserProfile(), generatedPassword);
            } catch (MessagingException e) {
                throw new MailServiceException("Error while sending welcome mail", e);
            }
        }
    }

    private void validateEmployee(Employee employee) {
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

    @Override
    @Transactional(readOnly = true)
    public Employee findByUuid(UUID uuid) {
        return employeeRepository
                .findByUuid(uuid)
                .orElseThrow(
                        () ->
                                new ResourceNotFoundException(
                                        "Employee with UUID - " + uuid + " - doesn't exist"));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Employee> findAll(EmployeeSearch search, Pageable pageable) {
        if (search == null) {
            search = new EmployeeSearch();
        }

        if (pageable == null) {
            pageable = PageRequest.of(0, Integer.MAX_VALUE);
        }

        return employeeRepository.findAll(new EmployeeJpaSpecification(search), pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Employee> findAll(EmployeeSearch search) {
        if (search == null) {
            search = new EmployeeSearch();
        }

        return employeeRepository.findAll(new EmployeeJpaSpecification(search));
    }

    @Override
    @Transactional
    public void delete(Employee employee) {
        employeeRepository.delete(employee);
    }
}
