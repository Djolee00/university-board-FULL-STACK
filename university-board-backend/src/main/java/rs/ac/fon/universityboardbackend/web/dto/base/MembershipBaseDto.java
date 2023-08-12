package rs.ac.fon.universityboardbackend.web.dto.base;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import rs.ac.fon.universityboardbackend.model.membership.Membership.MembershipStatus;

@Getter
@RequiredArgsConstructor
public abstract class MembershipBaseDto implements BaseDto {
    @NotNull protected final LocalDate commencementDate;
    @NotNull protected final MembershipStatus status;
}
