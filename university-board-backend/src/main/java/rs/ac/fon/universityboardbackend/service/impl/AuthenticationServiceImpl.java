package rs.ac.fon.universityboardbackend.service.impl;

import java.time.ZoneOffset;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import rs.ac.fon.universityboardbackend.repository.UserProfileRepository;
import rs.ac.fon.universityboardbackend.service.AuthenticationService;
import rs.ac.fon.universityboardbackend.service.JwtService;
import rs.ac.fon.universityboardbackend.web.dto.request.SignInRequest;
import rs.ac.fon.universityboardbackend.web.dto.response.JwtAuthenticationResponse;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserProfileRepository userProfileRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public JwtAuthenticationResponse signIn(SignInRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        var user =
                userProfileRepository
                        .findByEmail(request.email())
                        .orElseThrow(
                                () -> new IllegalArgumentException("Invalid email or password"));
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder()
                .token(jwt)
                .expirationTime(
                        jwtService
                                .extractExpiration(jwt)
                                .toInstant()
                                .atOffset(ZoneOffset.ofHours(2)))
                .build();
    }
}
