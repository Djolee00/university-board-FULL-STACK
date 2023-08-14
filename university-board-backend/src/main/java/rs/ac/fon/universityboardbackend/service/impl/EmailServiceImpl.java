package rs.ac.fon.universityboardbackend.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import rs.ac.fon.universityboardbackend.model.user.UserProfile;
import rs.ac.fon.universityboardbackend.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;
    private static String WELCOME_TEMPLATE_NAME;

    public EmailServiceImpl(
            JavaMailSender javaMailSender,
            TemplateEngine templateEngine,
            @Value("${email.welcome.template}") String welcomeTemplate) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
        WELCOME_TEMPLATE_NAME = welcomeTemplate;
    }

    @Override
    public void sendWelcomeMail(UserProfile userProfile, String generatedPassword)
            throws MessagingException {
        Context context = new Context();
        context.setVariable("user", userProfile);
        context.setVariable("generatedPassword", generatedPassword);

        String emailContent = templateEngine.process(WELCOME_TEMPLATE_NAME, context);

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper =
                new MimeMessageHelper(
                        message,
                        MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                        StandardCharsets.UTF_8.name());

        helper.setTo(userProfile.getEmail());
        helper.setSubject("Welcome to University Board Application");
        helper.setText(emailContent, true);

        javaMailSender.send(message);
    }
}
