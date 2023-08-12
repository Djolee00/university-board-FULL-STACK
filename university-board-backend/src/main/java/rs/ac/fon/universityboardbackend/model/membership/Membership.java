package rs.ac.fon.universityboardbackend.model.membership;

import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import rs.ac.fon.universityboardbackend.model.AbstractUUIDEntity;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.model.employee.Employee;

@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "membership")
public class Membership extends AbstractUUIDEntity {

    @EmbeddedId private MembershipId id;

    @ManyToOne
    @MapsId("boardId")
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne
    @MapsId("employeeId")
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @NotNull
    @FutureOrPresent
    @Column(name = "commencement_date")
    private LocalDate commencementDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private MembershipStatus status;

    @Getter
    @RequiredArgsConstructor
    public enum MembershipStatus {
        ACTIVE("Active"),
        ON_LEAVE("On leave"),
        PROBATION("Probation");

        private final String status;
    }
}
