package rs.ac.fon.universityboardbackend.web.dto.response;

import java.util.UUID;
import lombok.Getter;
import rs.ac.fon.universityboardbackend.model.employee.AcademicTitle;
import rs.ac.fon.universityboardbackend.web.dto.base.EmployeeBaseDto;
import rs.ac.fon.universityboardbackend.web.dto.base.UserProfileBaseDto;

@Getter
public class EmployeeResponseDto extends EmployeeBaseDto {
    private final UUID uuid;
    private final UserProfileBaseDto userProfileBaseDto;

    public EmployeeResponseDto(
            String firstName,
            String lastName,
            String phoneNumber,
            AcademicTitle academicTitle,
            UUID uuid,
            UserProfileBaseDto userProfileBaseDto) {
        super(firstName, lastName, phoneNumber, academicTitle);
        this.uuid = uuid;
        this.userProfileBaseDto = userProfileBaseDto;
    }
}
