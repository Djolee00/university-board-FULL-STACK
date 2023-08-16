package rs.ac.fon.universityboardbackend.web.controller;

import jakarta.validation.Valid;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.ac.fon.universityboardbackend.exception.ResourceNotFoundException;
import rs.ac.fon.universityboardbackend.mapper.BoardMapper;
import rs.ac.fon.universityboardbackend.mapper.MembershipMapper;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.model.board.BoardType;
import rs.ac.fon.universityboardbackend.model.membership.Membership;
import rs.ac.fon.universityboardbackend.model.user.Privilege.PrivilegeCode;
import rs.ac.fon.universityboardbackend.search.domain.BoardSearch;
import rs.ac.fon.universityboardbackend.service.AuthorizationService;
import rs.ac.fon.universityboardbackend.service.BoardService;
import rs.ac.fon.universityboardbackend.service.BoardTypeService;
import rs.ac.fon.universityboardbackend.service.UserProfileService;
import rs.ac.fon.universityboardbackend.web.dto.base.BoardBaseDto;
import rs.ac.fon.universityboardbackend.web.dto.base.MembershipBaseDto;
import rs.ac.fon.universityboardbackend.web.dto.create.BoardCreateDto;
import rs.ac.fon.universityboardbackend.web.dto.create.MembershipCreateDto;
import rs.ac.fon.universityboardbackend.web.dto.response.BoardResponseDto;
import rs.ac.fon.universityboardbackend.web.dto.response.CreatedResponseDto;
import rs.ac.fon.universityboardbackend.web.dto.search.GetBoardDto;

@RestController
@RequestMapping("/boards")
public class BoardController extends AbstractController {

    private final BoardMapper boardMapper;
    private final MembershipMapper membershipMapper;
    private final BoardTypeService boardTypeService;
    private final BoardService boardService;

    public BoardController(
            AuthorizationService authorizationService,
            UserProfileService userProfileService,
            BoardMapper boardMapper,
            MembershipMapper membershipMapper,
            BoardTypeService boardTypeService,
            BoardService boardService) {
        super(authorizationService, userProfileService);
        this.boardMapper = boardMapper;
        this.membershipMapper = membershipMapper;
        this.boardTypeService = boardTypeService;
        this.boardService = boardService;
    }

    @PostMapping
    public ResponseEntity<CreatedResponseDto<UUID>> createBoard(
            @RequestBody @Valid BoardCreateDto boardCreateDto) {
        hasPrivilegeOrThrow(PrivilegeCode.BOARD_C);

        Board board = boardMapper.boardCreateDtoToBoard(boardCreateDto);
        if (boardCreateDto.getBoardType().uuid() != null) {
            BoardType boardType = boardTypeService.findByUuid(boardCreateDto.getBoardType().uuid());
            board.setBoardType(boardType);
        }
        board.addMemberships(board.getMemberships());

        boardService.saveOrUpdate(board);

        return new ResponseEntity<>(new CreatedResponseDto<>(board.getUuid()), HttpStatus.CREATED);
    }

    @PatchMapping("/{uuid}")
    public ResponseEntity<Void> updateBoard(
            @PathVariable UUID uuid, @RequestBody BoardBaseDto boardBaseDto) {
        hasPrivilegeOrThrow(PrivilegeCode.BOARD_W);

        Board board = boardService.findByUuid(uuid);
        BoardType boardType;
        if (boardBaseDto.getBoardType() != null) {
            if (boardBaseDto.getBoardType().uuid() != null) {
                boardType = boardTypeService.findByUuid(boardBaseDto.getBoardType().uuid());
            } else {
                boardType = new BoardType().setName(boardBaseDto.getBoardType().name());
            }
            board.setBoardType(boardType);
        }

        Optional.ofNullable(boardBaseDto.getName()).ifPresent(board::setName);
        Optional.ofNullable(boardBaseDto.getDescription()).ifPresent(board::setDescription);
        Optional.ofNullable(boardBaseDto.getStartDate()).ifPresent(board::setStartDate);
        Optional.ofNullable(boardBaseDto.getEndDate()).ifPresent(board::setEndDate);

        boardService.saveOrUpdate(board);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> deleteBoard(@PathVariable UUID uuid) {
        hasPrivilegeOrThrow(PrivilegeCode.BOARD_W);
        Board board = boardService.findByUuid(uuid);
        boardService.delete(board);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Page<BoardResponseDto>> getBoards(
            GetBoardDto searchDto, Pageable pageable) {
        hasPrivilegeOrThrow(PrivilegeCode.BOARD_R);
        BoardSearch boardSearch =
                new BoardSearch()
                        .setNameLike(searchDto.nameLike())
                        .setStartDateFrom(searchDto.startDateFrom())
                        .setEndDateTo(searchDto.endDateTo())
                        .setStatus(searchDto.status());

        if (searchDto.boardTypeUuid() != null) {
            boardSearch.setBoardType(boardTypeService.findByUuid(searchDto.boardTypeUuid()));
        }

        Page<Board> boards = boardService.findAll(boardSearch, pageable);

        return ResponseEntity.ok(boards.map(boardMapper::boardToBoardResponseDto));
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<BoardResponseDto> getBoard(@PathVariable UUID uuid) {
        hasPrivilegeOrThrow(PrivilegeCode.BOARD_R);
        Board board = boardService.findByUuid(uuid);
        return ResponseEntity.ok(boardMapper.boardToBoardResponseDto(board));
    }

    @DeleteMapping("/{boardUuid}/memberships/{uuid}")
    public ResponseEntity<Void> deleteMembership(
            @PathVariable UUID boardUuid, @PathVariable UUID uuid) {
        hasPrivilegeOrThrow(PrivilegeCode.BOARD_W);

        Board board = boardService.findByUuid(boardUuid);

        Membership membership =
                board.getMemberships().stream()
                        .filter(m -> m.getUuid().equals(uuid))
                        .findFirst()
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "Membership with UUID - "
                                                        + uuid
                                                        + " - doesn't exist"));

        board.getMemberships().remove(membership);
        boardService.saveOrUpdate(board);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{boardUuid}/memberships")
    public ResponseEntity<Void> addMembership(
            @PathVariable UUID boardUuid,
            @RequestBody @Valid MembershipCreateDto membershipCreateDto) {
        hasPrivilegeOrThrow(PrivilegeCode.BOARD_W);

        Board board = boardService.findByUuid(boardUuid);
        Membership membership =
                membershipMapper.membershipCreateDtoToMembership(membershipCreateDto);

        board.addMembership(membership);
        boardService.saveOrUpdate(board);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{boardUuid}/memberships/{uuid}")
    public ResponseEntity<Void> updateMembership(
            @PathVariable UUID boardUuid,
            @PathVariable UUID uuid,
            @RequestBody MembershipBaseDto membershipBaseDto) {
        hasPrivilegeOrThrow(PrivilegeCode.BOARD_W);

        Board board = boardService.findByUuid(boardUuid);
        Membership membership =
                board.getMemberships().stream()
                        .filter(m -> m.getUuid().equals(uuid))
                        .findFirst()
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "Membership with UUID - "
                                                        + uuid
                                                        + " - doesn't exist"));

        Optional.ofNullable(membershipBaseDto.getCommencementDate())
                .ifPresent(membership::setCommencementDate);
        Optional.ofNullable(membershipBaseDto.getStatus()).ifPresent(membership::setStatus);

        boardService.saveOrUpdate(board);
        return ResponseEntity.ok().build();
    }
}
