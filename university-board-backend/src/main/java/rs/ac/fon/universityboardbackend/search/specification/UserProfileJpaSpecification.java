package rs.ac.fon.universityboardbackend.search.specification;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import rs.ac.fon.universityboardbackend.model.user.UserProfile;
import rs.ac.fon.universityboardbackend.model.user.UserProfile_;
import rs.ac.fon.universityboardbackend.search.domain.UserProfileSearch;

@RequiredArgsConstructor
public class UserProfileJpaSpecification implements Specification<UserProfile> {

    @NotNull private final UserProfileSearch search;

    @Override
    public Predicate toPredicate(
            Root<UserProfile> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        if (search.getEmail() != null) {
            predicates.add(criteriaBuilder.equal(root.get(UserProfile_.email), search.getEmail()));
        }

        if (search.getPassword() != null) {
            predicates.add(
                    criteriaBuilder.equal(root.get(UserProfile_.password), search.getEmail()));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
