package rs.ac.fon.universityboardbackend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import rs.ac.fon.universityboardbackend.model.membership.Membership;
import rs.ac.fon.universityboardbackend.web.dto.create.MembershipCreateDto;

@Mapper
public interface MembershipMapper {

    MembershipMapper INSTANCE = Mappers.getMapper(MembershipMapper.class);

    Membership membershipCreateDtoToMembership(MembershipCreateDto membershipCreateDto);
}
