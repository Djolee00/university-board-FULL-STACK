package rs.ac.fon.universityboardbackend.web.controller;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rs.ac.fon.universityboardbackend.mapper.RoleMapper;
import rs.ac.fon.universityboardbackend.model.user.Role;
import rs.ac.fon.universityboardbackend.service.RoleService;
import rs.ac.fon.universityboardbackend.web.dto.base.RoleDto;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @GetMapping
    public ResponseEntity<List<RoleDto>> getAllRoles() {
        List<Role> roles = roleService.getAll();
        return ResponseEntity.ok(
                roles.stream()
                        .map(RoleMapper.INSTANCE::roleToRoleDto)
                        .collect(Collectors.toList()));
    }
}
