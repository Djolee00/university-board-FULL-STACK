package rs.ac.fon.universityboardbackend.model.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import rs.ac.fon.universityboardbackend.model.AbstractUUIDEntity;
import rs.ac.fon.universityboardbackend.model.employee.Employee;

@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "user_profile")
public class UserProfile extends AbstractUUIDEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank
    @Email(message = "Invalid email format")
    @Column(name = "email")
    private String email;

    @NotBlank
    @Column(name = "password")
    private String password;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @ManyToMany
    @JoinTable(
            name = "user_privilege",
            joinColumns = @JoinColumn(name = "user_profile_id"),
            inverseJoinColumns = @JoinColumn(name = "privilege_code"))
    private Set<Privilege> privileges;

    @OneToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    public void addPrivilege(Privilege privilege) {
        if (privilege != null) {
            if (privileges == null) {
                privileges = new HashSet<>();
            }
            privileges.add(privilege);
        }
    }
}
