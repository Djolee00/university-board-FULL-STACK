package rs.ac.fon.universityboardbackend.web.controller;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rs.ac.fon.universityboardbackend.mapper.EmployeeMapper;
import rs.ac.fon.universityboardbackend.model.employee.Employee;
import rs.ac.fon.universityboardbackend.model.user.UserProfile;
import rs.ac.fon.universityboardbackend.service.EmployeeService;
import rs.ac.fon.universityboardbackend.service.PrivilegeService;
import rs.ac.fon.universityboardbackend.service.RoleService;
import rs.ac.fon.universityboardbackend.web.dto.create.EmployeeCreateDto;
import rs.ac.fon.universityboardbackend.web.dto.response.CreatedResponse;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;
    private final RoleService roleService;
    private final PrivilegeService privilegeService;

    @PostMapping
    public ResponseEntity<CreatedResponse<UUID>> createEmployee(
            @RequestBody @NotNull EmployeeCreateDto employeeCreateDto) {
        Employee employee = EmployeeMapper.INSTANCE.employeeCreateDtoToEmployee(employeeCreateDto);
        if (employee.userProfile() != null) {
            UserProfile userProfile = employee.userProfile();
            userProfile.employee(employee);
            userProfile.role(roleService.findRoleByUuid(userProfile.role().uuid()));

            if (userProfile.privileges() != null && !userProfile.privileges().isEmpty()) {
                userProfile.privileges(
                        userProfile.privileges().stream()
                                .map(privilege -> privilegeService.findByCode(privilege.getCode()))
                                .collect(Collectors.toSet()));
            }
        }

        employeeService.saveOrUpdate(employee);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CreatedResponse<>(employee.uuid()));
    }
}
