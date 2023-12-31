package rs.ac.fon.universityboardbackend.service;

import java.util.Date;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {

    String extractUserName(String token);

    String generateToken(UserDetails userDetails);

    boolean isTokenValid(String token, UserDetails userDetails);

    Date extractExpiration(String token);
}
