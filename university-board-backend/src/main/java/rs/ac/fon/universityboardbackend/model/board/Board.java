package rs.ac.fon.universityboardbackend.model.board;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.format.annotation.DateTimeFormat;
import rs.ac.fon.universityboardbackend.model.AbstractUUIDEntity;
import rs.ac.fon.universityboardbackend.model.membership.Membership;

@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "board")
public class Board extends AbstractUUIDEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank
    @Column(name = "name")
    private String name;

    @NotBlank
    @Column(name = "description")
    private String description;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Column(name = "start_date")
    private LocalDate startDate;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Column(name = "end_date")
    private LocalDate endDate;

    @NotNull
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private BoardStatus status;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private Set<Comment> comments;

    @OneToMany(mappedBy = "board")
    private Set<BoardFile> boardFiles;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Membership> memberships;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "board_type_id")
    private BoardType boardType;

    public void addComment(Comment comment) {
        if (comment != null) {
            if (comments == null) {
                comments = new HashSet<>();
            }
            comments.add(comment);
            comment.setBoard(this);
        }
    }

    public void addBoardFile(BoardFile boardFile) {
        if (boardFile != null) {
            if (boardFiles == null) {
                boardFiles = new HashSet<>();
            }
            boardFiles.add(boardFile);
            boardFile.setBoard(this);
        }
    }

    public void addMembership(Membership membership) {
        if (membership != null) {
            if (memberships == null) {
                memberships = new HashSet<>();
            }
            memberships.add(membership);
            membership.setBoard(this);
        }
    }

    public void addMemberships(Set<Membership> memberships) {
        if (memberships != null) {
            this.memberships = new HashSet<>();
            memberships.forEach(this::addMembership);
        }
    }

    @Getter
    @RequiredArgsConstructor
    public enum BoardStatus {
        PENDING("Pending"),
        ACTIVE("Active"),
        CLOSED("Closed"),
        EXPIRED("Expired");

        private final String status;
    }
}
