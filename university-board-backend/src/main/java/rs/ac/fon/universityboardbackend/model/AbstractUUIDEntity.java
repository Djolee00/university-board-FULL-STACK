package rs.ac.fon.universityboardbackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rs.ac.fon.universityboardbackend.converter.UuidCharConverter;

@Getter
@Setter
@NoArgsConstructor
@MappedSuperclass
public abstract class AbstractUUIDEntity {

    @NotNull
    @Convert(converter = UuidCharConverter.class)
    @Column(name = "uuid")
    private UUID uuid;

    @PrePersist
    public void prePersist() {
        if (getUuid() == null) {
            synchronized (this) {
                if (getUuid() == null) {
                    uuid = UUID.randomUUID();
                }
            }
        }
    }
}
