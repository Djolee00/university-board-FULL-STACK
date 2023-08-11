package rs.ac.fon.universityboardbackend.model.board;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import rs.ac.fon.universityboardbackend.model.AbstractUUIDEntity;

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

    @NotNull
    @Size(min = 1, message = "Description must have at least 1 character")
    @Column(name = "description")
    private String description;

    @NotNull
    @PositiveOrZero
    @Column(name = "num_of_likes")
    private int numOfLikes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;
}
