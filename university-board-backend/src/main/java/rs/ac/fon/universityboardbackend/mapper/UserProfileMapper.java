package rs.ac.fon.universityboardbackend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import rs.ac.fon.universityboardbackend.model.user.UserProfile;
import rs.ac.fon.universityboardbackend.web.dto.create.UserProfileCreateDto;
import rs.ac.fon.universityboardbackend.web.dto.response.UserProfileResponseDto;

@Mapper
public interface UserProfileMapper {

    UserProfileMapper INSTANCE = Mappers.getMapper(UserProfileMapper.class);

    UserProfile userProfileCreateDtoToUserProfile(UserProfileCreateDto userProfileCreateDto);

    UserProfileResponseDto userProfileToUserProfileResponseDto(UserProfile userProfile);
}
