package rs.ac.fon.universityboardbackend.web.dto.base;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import rs.ac.fon.universityboardbackend.model.employee.AcademicTitle;

@Getter
@RequiredArgsConstructor
public abstract class EmployeeBaseDto implements BaseDto {

    private final String firstName;
    private final String lastName;
    private final String phoneNumber;
    private final AcademicTitle academicTitle;
}
