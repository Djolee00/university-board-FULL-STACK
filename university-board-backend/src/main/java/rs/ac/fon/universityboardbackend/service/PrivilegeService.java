package rs.ac.fon.universityboardbackend.service;

import java.util.List;
import rs.ac.fon.universityboardbackend.model.user.Privilege;
import rs.ac.fon.universityboardbackend.model.user.Privilege.PrivilegeCode;

public interface PrivilegeService {

    Privilege findByCode(PrivilegeCode code);

    List<Privilege> getAll();
}
