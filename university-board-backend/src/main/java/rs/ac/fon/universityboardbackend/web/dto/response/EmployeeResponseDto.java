package rs.ac.fon.universityboardbackend.web.dto.response;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import rs.ac.fon.universityboardbackend.model.employee.AcademicTitle;
import rs.ac.fon.universityboardbackend.web.dto.base.EmployeeBaseDto;

@Getter
public class EmployeeResponseDto extends EmployeeBaseDto {

    @NotNull private final UUID uuid;
    private final UserProfileResponseDto userProfile;

    public EmployeeResponseDto(
            String firstName,
            String lastName,
            String phoneNumber,
            AcademicTitle academicTitle,
            UUID uuid,
            UserProfileResponseDto userProfile) {
        super(firstName, lastName, phoneNumber, academicTitle);
        this.uuid = uuid;
        this.userProfile = userProfile;
    }
}
