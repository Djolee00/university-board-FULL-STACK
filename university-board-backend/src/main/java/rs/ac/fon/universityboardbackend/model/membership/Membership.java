package rs.ac.fon.universityboardbackend.model.membership;

import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Objects;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.format.annotation.DateTimeFormat;
import rs.ac.fon.universityboardbackend.model.AbstractUUIDEntity;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.model.employee.Employee;

@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "membership")
public class Membership extends AbstractUUIDEntity {

    @EmbeddedId private MembershipId id = new MembershipId();

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
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate commencementDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private MembershipStatus status;

    @Getter
    @RequiredArgsConstructor
    public enum MembershipStatus {
        ACTIVE("Active"),
        MEMBER("Member"),
        PROBATION("Probation");

        private final String status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Membership that = (Membership) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
