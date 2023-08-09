package rs.ac.fon.universityboardbackend.model.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.Set;
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
@Table(name = "role")
public class Role extends AbstractUUIDEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name")
    private String name;

    @ManyToMany
    @JoinTable(
            name = "role_privilege",
            joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "privilege_code"))
    private Set<Privilege> privileges;
}
