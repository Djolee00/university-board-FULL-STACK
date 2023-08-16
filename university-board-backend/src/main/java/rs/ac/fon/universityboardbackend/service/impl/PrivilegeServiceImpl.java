package rs.ac.fon.universityboardbackend.service.impl;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    @Transactional(readOnly = true)
    public Privilege findByCode(PrivilegeCode code) {
        return privilegeRepository
                .findByCode(code)
                .orElseThrow(
                        () ->
                                new ResourceNotFoundException(
                                        "Privilege with code - " + code + " - doesn't exist"));
    }

    @Override
    public List<Privilege> getAll() {
        return privilegeRepository.findAll();
    }
}
