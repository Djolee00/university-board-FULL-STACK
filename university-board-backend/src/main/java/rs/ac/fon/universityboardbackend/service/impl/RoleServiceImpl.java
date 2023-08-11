package rs.ac.fon.universityboardbackend.service.impl;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rs.ac.fon.universityboardbackend.exception.ResourceNotFoundException;
import rs.ac.fon.universityboardbackend.model.user.Role;
import rs.ac.fon.universityboardbackend.repository.RoleRepository;
import rs.ac.fon.universityboardbackend.service.RoleService;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    @Transactional(readOnly = true)
    public Role findRoleByUuid(UUID uuid) {
        return roleRepository
                .findByUuid(uuid)
                .orElseThrow(
                        () ->
                                new ResourceNotFoundException(
                                        "Role with UUID - " + uuid + " - doesn't exist"));
    }
}
