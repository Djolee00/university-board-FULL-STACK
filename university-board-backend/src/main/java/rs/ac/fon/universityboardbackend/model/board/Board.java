package rs.ac.fon.universityboardbackend.model.board;

import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import rs.ac.fon.universityboardbackend.model.AbstractUUIDEntity;
import rs.ac.fon.universityboardbackend.model.membership.Membership;

@Getter
@Setter
@NoArgsConstructor
@Accessors(fluent = true)
@Entity
@Table(name = "board")
public class Board extends AbstractUUIDEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "description")
    private String description;

    @NotNull
    @FutureOrPresent
    @Column(name = "start_date")
    private LocalDate startDate;

    @NotNull
    @FutureOrPresent
    @Column(name = "end_date")
    private LocalDate endDate;

    @NotNull
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private BoardStatus status;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private Set<Comment> comments;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private Set<BoardFile> boardFiles;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private Set<Membership> memberships;

    public void addComment(Comment comment) {
        if (comment != null) {
            if (comments == null) {
                comments = new HashSet<>();
            }
            comments.add(comment);
            comment.board(this);
        }
    }

    public void addBoardFile(BoardFile boardFile) {
        if (boardFile != null) {
            if (boardFiles == null) {
                boardFiles = new HashSet<>();
            }
            boardFiles.add(boardFile);
            boardFile.board(this);
        }
    }

    public void addMembership(Membership membership) {
        if (membership != null) {
            if (memberships == null) {
                memberships = new HashSet<>();
            }
            memberships.add(membership);
            membership.board(this);
        }
    }

    @Getter
    @RequiredArgsConstructor
    private enum BoardStatus {
        PENDING("Pending"),
        ACTIVE("Active"),
        CLOSED("Closed"),
        EXPIRED("Expired");

        private final String status;
    }
}
