package rs.ac.fon.universityboardbackend.mapper;

import org.mapstruct.*;
import rs.ac.fon.universityboardbackend.model.membership.Membership;
import rs.ac.fon.universityboardbackend.service.EmployeeService;
import rs.ac.fon.universityboardbackend.web.dto.create.MembershipCreateDto;

@Mapper(uses = EmployeeService.class, componentModel = "spring")
public interface MembershipMapper {

    @Mapping(source = "membershipCreateDto.employeeUuid", target = "employee")
    Membership membershipCreateDtoToMembership(MembershipCreateDto membershipCreateDto);
}
