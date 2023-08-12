package rs.ac.fon.universityboardbackend.web.dto.base;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import rs.ac.fon.universityboardbackend.model.employee.AcademicTitle;

@Getter
@RequiredArgsConstructor
public class EmployeeBaseDto implements BaseDto {

    @NotBlank private final String firstName;

    @NotBlank private final String lastName;

    @NotBlank private final String phoneNumber;

    @NotNull private final AcademicTitle academicTitle;
}
