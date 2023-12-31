package rs.ac.fon.universityboardbackend.model.board;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.OffsetDateTime;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import rs.ac.fon.universityboardbackend.model.AbstractUUIDEntity;
import rs.ac.fon.universityboardbackend.model.user.UserProfile;

@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "comment")
public class Comment extends AbstractUUIDEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @NotBlank
    @Size(min = 1, message = "Description must have at least 1 character")
    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "time")
    private OffsetDateTime time;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_profile_id", nullable = false)
    private UserProfile userProfile;
}
