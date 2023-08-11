package rs.ac.fon.universityboardbackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.ac.fon.universityboardbackend.exception.ResourceNotFoundException;
import rs.ac.fon.universityboardbackend.model.user.Privilege;
import rs.ac.fon.universityboardbackend.model.user.Privilege.PrivilegeCode;
import rs.ac.fon.universityboardbackend.repository.PrivilegeRepository;
import rs.ac.fon.universityboardbackend.service.PrivilegeService;

@Service
@RequiredArgsConstructor
public class PrivilegeServiceImpl implements PrivilegeService {

    private final PrivilegeRepository privilegeRepository;

    @Override
    public Privilege findByCode(PrivilegeCode code) {
        return privilegeRepository
                .findByCode(code)
                .orElseThrow(
                        () ->
                                new ResourceNotFoundException(
                                        "Privilege with code - " + code + " - doesn't exist"));
    }
}
