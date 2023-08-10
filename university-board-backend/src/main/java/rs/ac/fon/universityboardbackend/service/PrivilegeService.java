package rs.ac.fon.universityboardbackend.service;

import rs.ac.fon.universityboardbackend.model.user.Privilege;
import rs.ac.fon.universityboardbackend.model.user.Privilege.PrivilegeCode;

public interface PrivilegeService {

    Privilege findByCode(PrivilegeCode code);
}
