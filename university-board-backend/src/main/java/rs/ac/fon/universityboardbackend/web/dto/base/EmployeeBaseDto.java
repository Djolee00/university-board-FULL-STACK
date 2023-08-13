package rs.ac.fon.universityboardbackend.web.dto.base;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rs.ac.fon.universityboardbackend.model.employee.AcademicTitle;

@Getter
@Setter
@NoArgsConstructor
public class EmployeeBaseDto implements BaseDto {

    @NotBlank private String firstName;

    @NotBlank private String lastName;

    @NotBlank private String phoneNumber;

    @NotNull private AcademicTitle academicTitle;
}
