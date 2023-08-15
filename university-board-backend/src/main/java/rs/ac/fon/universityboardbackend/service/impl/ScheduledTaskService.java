package rs.ac.fon.universityboardbackend.service.impl;

import jakarta.mail.MessagingException;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rs.ac.fon.universityboardbackend.exception.MailServiceException;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.search.domain.BoardSearch;
import rs.ac.fon.universityboardbackend.service.BoardService;
import rs.ac.fon.universityboardbackend.service.EmailService;

@Service
@RequiredArgsConstructor
public class ScheduledTaskService {

    private final BoardService boardService;
    private final EmailService emailService;

    @Scheduled(cron = "0 17 * * * *", zone = "UTC")
    @Transactional(readOnly = true)
    public void sendBoardBeginningNotification() {
        List<Board> boards = boardService.findAll(new BoardSearch());
        boards.stream()
                .filter(board -> board.getStartDate().equals(LocalDate.now().plusDays(1)))
                .forEach(
                        board ->
                                board.getMemberships()
                                        .forEach(
                                                membership -> {
                                                    try {
                                                        emailService.sendBoardBeginningEmail(
                                                                membership
                                                                        .getEmployee()
                                                                        .getUserProfile(),
                                                                board);
                                                    } catch (MessagingException e) {
                                                        throw new MailServiceException(
                                                                "Board beginning news can not be sent via mail",
                                                                e);
                                                    }
                                                }));
    }

    @Scheduled(cron = "0 18 * * * *", zone = "UTC")
    @Transactional(readOnly = true)
    public void sendCommencementNotification() {
        List<Board> boards = boardService.findAll(new BoardSearch());
        boards.forEach(
                board ->
                        board.getMemberships().stream()
                                .filter(
                                        membership ->
                                                membership
                                                        .getCommencementDate()
                                                        .equals(LocalDate.now().plusDays(1)))
                                .forEach(
                                        membership -> {
                                            try {
                                                emailService.sendCommencementEmail(
                                                        membership.getEmployee().getUserProfile(),
                                                        board);
                                            } catch (MessagingException e) {
                                                throw new MailServiceException(
                                                        "Could not send email notification for commencement",
                                                        e);
                                            }
                                        }));
    }
}
