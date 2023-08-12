package rs.ac.fon.universityboardbackend.web.dto.create;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Getter;
import rs.ac.fon.universityboardbackend.model.membership.Membership.MembershipStatus;
import rs.ac.fon.universityboardbackend.web.dto.base.MembershipBaseDto;

@Getter
public class MembershipCreateDto extends MembershipBaseDto {

    @NotNull private final UUID employeeUuid;

    public MembershipCreateDto(
            LocalDate commencementDate, MembershipStatus status, UUID employeeUuid) {
        super(commencementDate, status);
        this.employeeUuid = employeeUuid;
    }
}
