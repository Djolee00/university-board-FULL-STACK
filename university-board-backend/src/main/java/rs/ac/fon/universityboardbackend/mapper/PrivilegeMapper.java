package rs.ac.fon.universityboardbackend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import rs.ac.fon.universityboardbackend.model.user.Privilege;
import rs.ac.fon.universityboardbackend.web.dto.base.PrivilegeDto;

@Mapper
public interface PrivilegeMapper {

    PrivilegeMapper INSTANCE = Mappers.getMapper(PrivilegeMapper.class);

    PrivilegeDto privilegeToPrivilegeDto(Privilege privilege);

    Privilege privilegeDtoToPrivilege(PrivilegeDto privilegeDto);
}
