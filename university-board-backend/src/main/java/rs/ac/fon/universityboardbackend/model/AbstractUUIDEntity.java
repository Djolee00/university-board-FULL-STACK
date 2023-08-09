package rs.ac.fon.universityboardbackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import rs.ac.fon.universityboardbackend.converter.UuidCharConverter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Accessors(fluent = true)
@MappedSuperclass
public abstract class AbstractUUIDEntity {

    @NotNull
    @Convert(converter = UuidCharConverter.class)
    @Column(name = "uuid")
    private UUID uuid;

    @PrePersist
    public void prePersist() {
        if (uuid() == null) {
            synchronized (this) {
                if (uuid() == null) {
                    uuid = UUID.randomUUID();
                }
            }
        }
    }
}
