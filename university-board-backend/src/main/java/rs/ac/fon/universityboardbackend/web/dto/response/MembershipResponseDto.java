package rs.ac.fon.universityboardbackend.web.dto.response;

import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rs.ac.fon.universityboardbackend.web.dto.base.MembershipBaseDto;

@Getter
@Setter
@NoArgsConstructor
public class MembershipResponseDto extends MembershipBaseDto {

    private UUID uuid;
    private EmployeeResponseDto employee;
}
