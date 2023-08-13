package rs.ac.fon.universityboardbackend.web.dto.create;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rs.ac.fon.universityboardbackend.web.dto.base.EmployeeBaseDto;

@Getter
@Setter
@NoArgsConstructor
public class EmployeeCreateDto extends EmployeeBaseDto {

    private UserProfileCreateDto userProfile;
}
