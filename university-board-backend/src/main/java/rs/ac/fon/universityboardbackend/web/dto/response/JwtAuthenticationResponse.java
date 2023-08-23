package rs.ac.fon.universityboardbackend.web.dto.response;

import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Builder;

@Builder
public record JwtAuthenticationResponse(
        String token, OffsetDateTime expirationTime, UUID employeeUuid) {}
