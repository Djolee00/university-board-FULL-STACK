package rs.ac.fon.universityboardbackend.service;

import jakarta.mail.MessagingException;
import rs.ac.fon.universityboardbackend.model.user.UserProfile;

public interface EmailService {

    void sendWelcomeMail(UserProfile userProfile, String generatedPassword)
            throws MessagingException;
}
