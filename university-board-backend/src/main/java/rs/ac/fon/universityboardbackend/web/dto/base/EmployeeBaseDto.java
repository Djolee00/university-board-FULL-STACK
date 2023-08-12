package rs.ac.fon.universityboardbackend.web.dto.base;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import rs.ac.fon.universityboardbackend.model.employee.AcademicTitle;

@Getter
@RequiredArgsConstructor
public class EmployeeBaseDto implements BaseDto {

    @NotNull private final String firstName;

    @NotNull private final String lastName;

    @NotNull private final String phoneNumber;

    @NotNull private final AcademicTitle academicTitle;
}
