package rs.ac.fon.universityboardbackend.web.dto.response;

import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Builder;
import rs.ac.fon.universityboardbackend.model.user.Privilege.PrivilegeCode;

@Builder
public record JwtAuthenticationResponse(
        String token,
        OffsetDateTime expirationTime,
        UUID employeeUuid,
        PrivilegeCode[] privileges) {}
