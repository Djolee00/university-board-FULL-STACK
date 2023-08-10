package rs.ac.fon.universityboardbackend.web.dto.base;

import rs.ac.fon.universityboardbackend.model.user.Privilege.PrivilegeCode;

public record PrivilegeDto(PrivilegeCode code, String name) implements BaseDto {}
