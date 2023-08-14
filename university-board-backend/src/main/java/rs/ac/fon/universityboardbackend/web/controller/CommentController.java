package rs.ac.fon.universityboardbackend.web.controller;

import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.ac.fon.universityboardbackend.mapper.CommentMapper;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.model.board.Comment;
import rs.ac.fon.universityboardbackend.model.user.UserProfile;
import rs.ac.fon.universityboardbackend.service.BoardService;
import rs.ac.fon.universityboardbackend.service.CommentService;
import rs.ac.fon.universityboardbackend.service.UserProfileService;
import rs.ac.fon.universityboardbackend.web.dto.base.CommentBaseDto;
import rs.ac.fon.universityboardbackend.web.dto.response.CommentResponseDto;
import rs.ac.fon.universityboardbackend.web.dto.response.CreatedResponseDto;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final BoardService boardService;
    private final CommentMapper commentMapper;
    private final CommentService commentService;
    private final UserProfileService userProfileService;

    @PostMapping("/{boardUuid}/comments")
    public ResponseEntity<CreatedResponseDto<UUID>> createComment(
            @PathVariable UUID boardUuid, @RequestBody @Valid CommentBaseDto commentBaseDto) {
        Board board = boardService.findByUuid(boardUuid);
        UserProfile userProfile = userProfileService.getLoggedUser();
        Comment comment = commentMapper.commentBaseDtoToComment(commentBaseDto);
        comment.setUserProfile(userProfile);
        comment.setBoard(board);

        commentService.saveOrUpdate(comment);
        return new ResponseEntity<>(
                new CreatedResponseDto<>(comment.getUuid()), HttpStatus.CREATED);
    }

    @DeleteMapping("/comments/{uuid}")
    public ResponseEntity<Void> deleteComment(@PathVariable UUID uuid) {
        Comment comment = commentService.findByUuid(uuid);
        commentService.delete(comment);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/comments/{uuid}")
    public ResponseEntity<CommentResponseDto> updateComment(
            @PathVariable UUID uuid, @RequestBody CommentBaseDto commentBaseDto) {
        Comment comment = commentService.findByUuid(uuid);
        UserProfile userProfile = userProfileService.getLoggedUser();
        if (!userProfile.getUsername().equals(comment.getUserProfile().getUsername())) {
            throw new ValidationException("Comments can be edited only by those who made them");
        }
        Optional.ofNullable(commentBaseDto.getTitle()).ifPresent(comment::setTitle);
        Optional.ofNullable(commentBaseDto.getDescription()).ifPresent(comment::setDescription);
        commentService.saveOrUpdate(comment);

        return ResponseEntity.ok(commentMapper.commentToCommentResponseDto(comment));
    }
}
