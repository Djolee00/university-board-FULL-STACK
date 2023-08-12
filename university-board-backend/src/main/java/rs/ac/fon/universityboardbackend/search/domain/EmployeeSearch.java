package rs.ac.fon.universityboardbackend.search.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import rs.ac.fon.universityboardbackend.model.employee.AcademicTitle;

@Getter
@Setter
@Accessors(chain = true)
public class EmployeeSearch {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private AcademicTitle academicTitle;
}
