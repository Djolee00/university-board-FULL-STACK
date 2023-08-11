package rs.ac.fon.universityboardbackend.model.membership;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Embeddable
@Getter
@Setter
@EqualsAndHashCode
@Accessors(chain = true)
public class MembershipId implements Serializable {

    @Column(name = "board_id")
    private Long boardId;

    @Column(name = "employee_id")
    private Long employeeId;
}
