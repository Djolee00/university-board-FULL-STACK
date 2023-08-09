package rs.ac.fon.universityboardbackend.model.board;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import rs.ac.fon.universityboardbackend.model.AbstractUUIDEntity;

@Getter
@Setter
@NoArgsConstructor
@Accessors(fluent = true)
@Entity
@Table(name = "board_file")
public class BoardFile extends AbstractUUIDEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "original_name")
    private String original_name;

    @NotNull
    @Column(name = "type")
    private String type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;
}
