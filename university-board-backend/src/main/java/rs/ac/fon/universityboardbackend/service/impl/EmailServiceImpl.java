package rs.ac.fon.universityboardbackend.service.impl;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import rs.ac.fon.universityboardbackend.builder.EmailBuilder;
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

    @Async
    @Override
    public void sendApplicationWelcomeMail(UserProfile userProfile, String generatedPassword)
            throws MessagingException {

        new EmailBuilder(javaMailSender, templateEngine)
                .to(userProfile.getEmail())
                .subject("Welcome to University Board Application")
                .templateName(templateProperties.getWelcomeTemplateName())
                .contextVariable("user", userProfile)
                .contextVariable("generatedPassword", generatedPassword)
                .send();
    }

    @Async
    @Override
    public void sendBoardWelcomeMail(UserProfile userProfile, Board board)
            throws MessagingException {
        new EmailBuilder(javaMailSender, templateEngine)
                .to(userProfile.getEmail())
                .subject("You have been added to a new Board")
                .templateName(templateProperties.getBoardWelcomeTemplateName())
                .contextVariable("board", board)
                .contextVariable("user", userProfile)
                .send();
    }

    @Async
    @Override
    public void sendNewCommentMail(UserProfile userProfile, Comment comment)
            throws MessagingException {
        new EmailBuilder(javaMailSender, templateEngine)
                .to(userProfile.getEmail())
                .subject("You have a new comment in a Board")
                .templateName(templateProperties.getNewCommentTemplateName())
                .contextVariable("comment", comment)
                .contextVariable("user", userProfile)
                .send();
    }

    @Async
    @Override
    public void sendBoardBeginningEmail(UserProfile userProfile, Board board)
            throws MessagingException {
        new EmailBuilder(javaMailSender, templateEngine)
                .to(userProfile.getEmail())
                .subject("Your duties in a Board are about to start")
                .templateName(templateProperties.getBoardBeginningTemplateName())
                .contextVariable("board", board)
                .contextVariable("user", userProfile)
                .send();
    }

    @Async
    @Override
    public void sendCommencementEmail(UserProfile userProfile, Board board)
            throws MessagingException {
        new EmailBuilder(javaMailSender, templateEngine)
                .to(userProfile.getEmail())
                .subject("Your duties in a Board are about to start")
                .templateName(templateProperties.getBoardBeginningTemplateName())
                .contextVariable("board", board)
                .contextVariable("user", userProfile)
                .send();
    }
}
