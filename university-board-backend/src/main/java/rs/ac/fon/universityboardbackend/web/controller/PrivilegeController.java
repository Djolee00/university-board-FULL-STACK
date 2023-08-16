package rs.ac.fon.universityboardbackend.web.controller;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rs.ac.fon.universityboardbackend.mapper.PrivilegeMapper;
import rs.ac.fon.universityboardbackend.model.user.Privilege;
import rs.ac.fon.universityboardbackend.service.PrivilegeService;
import rs.ac.fon.universityboardbackend.web.dto.base.PrivilegeDto;

@RestController
@RequestMapping("/privileges")
@RequiredArgsConstructor
public class PrivilegeController {

    private final PrivilegeService privilegeService;

    @GetMapping
    public ResponseEntity<List<PrivilegeDto>> getAllPrivileges() {
        List<Privilege> privileges = privilegeService.getAll();
        return ResponseEntity.ok(
                privileges.stream()
                        .map(PrivilegeMapper.INSTANCE::privilegeToPrivilegeDto)
                        .collect(Collectors.toList()));
    }
}
