package rs.ac.fon.universityboardbackend.web.controller;

import jakarta.validation.Valid;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.ac.fon.universityboardbackend.mapper.EmployeeMapper;
import rs.ac.fon.universityboardbackend.model.employee.AcademicTitle;
import rs.ac.fon.universityboardbackend.model.employee.Employee;
import rs.ac.fon.universityboardbackend.model.user.Privilege.PrivilegeCode;
import rs.ac.fon.universityboardbackend.model.user.UserProfile;
import rs.ac.fon.universityboardbackend.search.domain.EmployeeSearch;
import rs.ac.fon.universityboardbackend.service.*;
import rs.ac.fon.universityboardbackend.web.dto.base.EmployeeBaseDto;
import rs.ac.fon.universityboardbackend.web.dto.create.EmployeeCreateDto;
import rs.ac.fon.universityboardbackend.web.dto.response.CreatedResponseDto;
import rs.ac.fon.universityboardbackend.web.dto.response.EmployeeResponseDto;

@RestController
@RequestMapping("/employees")
public class EmployeeController extends AbstractController {

    private final EmployeeService employeeService;
    private final RoleService roleService;
    private final PrivilegeService privilegeService;

    public EmployeeController(
            AuthorizationService authorizationService,
            UserProfileService userProfileService,
            EmployeeService employeeService,
            RoleService roleService,
            PrivilegeService privilegeService) {
        super(authorizationService, userProfileService);
        this.employeeService = employeeService;
        this.roleService = roleService;
        this.privilegeService = privilegeService;
    }

    @PostMapping
    public ResponseEntity<CreatedResponseDto<UUID>> createEmployee(
            @Valid @RequestBody EmployeeCreateDto employeeCreateDto) {
        hasPrivilegeOrThrow(PrivilegeCode.ACCOUNT_C);
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
                .body(new CreatedResponseDto<>(employee.getUuid()));
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<EmployeeResponseDto> getEmployeeByUuid(@PathVariable UUID uuid) {
        hasPrivilegeOrThrow(PrivilegeCode.ACCOUNT_R);
        Employee employee = employeeService.findByUuid(uuid);
        EmployeeResponseDto employeeResponseDto =
                EmployeeMapper.INSTANCE.employeeToEmployeeResponseDto(employee);
        return ResponseEntity.ok(employeeResponseDto);
    }

    @GetMapping
    public ResponseEntity<Page<EmployeeResponseDto>> getEmployees(
            @RequestParam(required = false) String firstNameLike,
            @RequestParam(required = false) String lastNameLike,
            @RequestParam(required = false) String phoneNumberLike,
            @RequestParam(required = false) AcademicTitle academicTitle,
            Pageable pageable) {
        hasPrivilegeOrThrow(PrivilegeCode.ACCOUNT_R);
        EmployeeSearch search =
                new EmployeeSearch()
                        .setFirstName(firstNameLike)
                        .setLastName(lastNameLike)
                        .setPhoneNumber(phoneNumberLike)
                        .setAcademicTitle(academicTitle);

        Page<Employee> employees = employeeService.findAll(search, pageable);
        return ResponseEntity.ok(
                employees.map(EmployeeMapper.INSTANCE::employeeToEmployeeResponseDto));
    }

    @PatchMapping("/{uuid}")
    public ResponseEntity<Void> updateEmployee(
            @PathVariable UUID uuid, @RequestBody EmployeeBaseDto employeeBaseDto) {
        hasPrivilegeOrThrow(PrivilegeCode.ACCOUNT_W);
        Employee employee = employeeService.findByUuid(uuid);

        Optional.ofNullable(employeeBaseDto.getFirstName()).ifPresent(employee::setFirstName);
        Optional.ofNullable(employeeBaseDto.getLastName()).ifPresent(employee::setLastName);
        Optional.ofNullable(employeeBaseDto.getPhoneNumber()).ifPresent(employee::setPhoneNumber);
        Optional.ofNullable(employeeBaseDto.getAcademicTitle())
                .ifPresent(employee::setAcademicTitle);

        employeeService.saveOrUpdate(employee);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable UUID uuid) {
        hasPrivilegeOrThrow(PrivilegeCode.ACCOUNT_D);

        Employee employee = employeeService.findByUuid(uuid);
        employeeService.delete(employee);
        return ResponseEntity.noContent().build();
    }
}
