package rs.ac.fon.universityboardbackend.service;

import rs.ac.fon.universityboardbackend.web.dto.request.SignInRequest;
import rs.ac.fon.universityboardbackend.web.dto.response.JwtAuthenticationResponse;

public interface AuthenticationService {
    JwtAuthenticationResponse signIn(SignInRequest request);
}
