package rs.ac.fon.universityboardbackend.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.model.board.Comment;
import rs.ac.fon.universityboardbackend.model.user.UserProfile;
import rs.ac.fon.universityboardbackend.properties.TemplateProperties;
import rs.ac.fon.universityboardbackend.service.EmailService;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;
    private final TemplateProperties templateProperties;

    @Override
    public void sendApplicationWelcomeMail(UserProfile userProfile, String generatedPassword)
            throws MessagingException {
        Context context = new Context();
        context.setVariable("user", userProfile);
        context.setVariable("generatedPassword", generatedPassword);

        String emailContent =
                templateEngine.process(templateProperties.getWelcomeTemplateName(), context);

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

    @Override
    public void sendBoardWelcomeMail(UserProfile userProfile, Board board)
            throws MessagingException {
        Context context = new Context();
        context.setVariable("board", board);
        context.setVariable("user", userProfile);

        String emailContent =
                templateEngine.process(templateProperties.getBoardWelcomeTemplateName(), context);

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper =
                new MimeMessageHelper(
                        message,
                        MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                        StandardCharsets.UTF_8.name());

        helper.setTo(userProfile.getEmail());
        helper.setSubject("You have been added to new Board");
        helper.setText(emailContent, true);

        javaMailSender.send(message);
    }

    @Override
    public void sendNewCommentMail(UserProfile userProfile, Comment comment)
            throws MessagingException {
        Context context = new Context();
        context.setVariable("comment", comment);
        context.setVariable("user", userProfile);

        String emailContent =
                templateEngine.process(templateProperties.getNewCommentTemplateName(), context);

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper =
                new MimeMessageHelper(
                        message,
                        MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                        StandardCharsets.UTF_8.name());

        helper.setTo(userProfile.getEmail());
        helper.setSubject("You have new comment in Board");
        helper.setText(emailContent, true);

        javaMailSender.send(message);
    }

    @Override
    public void sendBoardBeginningEmail(UserProfile userProfile, Board board)
            throws MessagingException {
        Context context = new Context();
        context.setVariable("board", board);
        context.setVariable("user", userProfile);

        String emailContent =
                templateEngine.process(templateProperties.getBoardBeginningTemplateName(), context);

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper =
                new MimeMessageHelper(
                        message,
                        MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                        StandardCharsets.UTF_8.name());

        helper.setTo(userProfile.getEmail());
        helper.setSubject("Board is about to start");
        helper.setText(emailContent, true);

        javaMailSender.send(message);
    }
}
