package rs.ac.fon.universityboardbackend.service;

import java.util.List;
import java.util.UUID;
import rs.ac.fon.universityboardbackend.model.user.Role;

public interface RoleService {

    Role findRoleByUuid(UUID uuid);

    List<Role> getAll();
}
