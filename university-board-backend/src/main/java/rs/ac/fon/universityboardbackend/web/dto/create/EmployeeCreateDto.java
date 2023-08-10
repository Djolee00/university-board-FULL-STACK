package rs.ac.fon.universityboardbackend.web.dto.create;

import lombok.Getter;
import rs.ac.fon.universityboardbackend.model.employee.AcademicTitle;
import rs.ac.fon.universityboardbackend.web.dto.base.EmployeeBaseDto;

@Getter
public class EmployeeCreateDto extends EmployeeBaseDto {

    private final UserProfileCreateDto userProfile;

    public EmployeeCreateDto(
            String firstName,
            String lastName,
            String phoneNumber,
            AcademicTitle academicTitle,
            UserProfileCreateDto userProfile) {
        super(firstName, lastName, phoneNumber, academicTitle);
        this.userProfile = userProfile;
    }
}
