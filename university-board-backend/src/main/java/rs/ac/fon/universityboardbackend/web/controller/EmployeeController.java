package rs.ac.fon.universityboardbackend.web.controller;

import jakarta.validation.Valid;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.ac.fon.universityboardbackend.mapper.EmployeeMapper;
import rs.ac.fon.universityboardbackend.model.employee.Employee;
import rs.ac.fon.universityboardbackend.model.user.UserProfile;
import rs.ac.fon.universityboardbackend.service.EmployeeService;
import rs.ac.fon.universityboardbackend.service.PrivilegeService;
import rs.ac.fon.universityboardbackend.service.RoleService;
import rs.ac.fon.universityboardbackend.web.dto.create.EmployeeCreateDto;
import rs.ac.fon.universityboardbackend.web.dto.response.CreatedResponse;
import rs.ac.fon.universityboardbackend.web.dto.response.EmployeeResponseDto;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;
    private final RoleService roleService;
    private final PrivilegeService privilegeService;

    @PostMapping
    public ResponseEntity<CreatedResponse<UUID>> createEmployee(
            @Valid @RequestBody EmployeeCreateDto employeeCreateDto) {
        Employee employee = EmployeeMapper.INSTANCE.employeeCreateDtoToEmployee(employeeCreateDto);
        if (employee.getUserProfile() != null) {
            UserProfile userProfile = employee.getUserProfile();
            userProfile.setEmployee(employee);
            userProfile.setRole(roleService.findRoleByUuid(userProfile.getRole().getUuid()));

            if (userProfile.getPrivileges() != null && !userProfile.getPrivileges().isEmpty()) {
                userProfile.setPrivileges(
                        userProfile.getPrivileges().stream()
                                .map(privilege -> privilegeService.findByCode(privilege.getCode()))
                                .collect(Collectors.toSet()));
            }
        }

        employeeService.saveOrUpdate(employee);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CreatedResponse<>(employee.getUuid()));
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<EmployeeResponseDto> getEmployeeByUuid(@PathVariable UUID uuid) {
        Employee employee = employeeService.findByUuid(uuid);
        EmployeeResponseDto employeeResponseDto =
                EmployeeMapper.INSTANCE.employeeToEmployeeResponseDto(employee);
        return ResponseEntity.ok(employeeResponseDto);
    }
}
