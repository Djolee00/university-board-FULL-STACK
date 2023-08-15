package rs.ac.fon.universityboardbackend.service;

import jakarta.mail.MessagingException;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.model.board.Comment;
import rs.ac.fon.universityboardbackend.model.user.UserProfile;

public interface EmailService {

    void sendApplicationWelcomeMail(UserProfile userProfile, String generatedPassword)
            throws MessagingException;

    void sendBoardWelcomeMail(UserProfile userProfile, Board board) throws MessagingException;

    void sendNewCommentMail(UserProfile userProfile, Comment comment) throws MessagingException;

    void sendBoardBeginningEmail(UserProfile userProfile, Board board) throws MessagingException;

    void sendCommencementEmail(UserProfile userProfile, Board board) throws MessagingException;
}
