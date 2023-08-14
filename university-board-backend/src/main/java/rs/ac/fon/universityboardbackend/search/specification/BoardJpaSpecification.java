package rs.ac.fon.universityboardbackend.search.specification;

import jakarta.persistence.criteria.*;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import rs.ac.fon.universityboardbackend.model.board.Board;
import rs.ac.fon.universityboardbackend.model.board.BoardType;
import rs.ac.fon.universityboardbackend.model.board.BoardType_;
import rs.ac.fon.universityboardbackend.model.board.Board_;
import rs.ac.fon.universityboardbackend.search.domain.BoardSearch;

@RequiredArgsConstructor
public class BoardJpaSpecification implements Specification<Board> {

    @NotNull private final BoardSearch search;

    @Override
    public Predicate toPredicate(
            Root<Board> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        if (StringUtils.isNotBlank(search.getNameLike())) {
            predicates.add(criteriaBuilder.like(root.get(Board_.name), search.getNameLike() + "%"));
        }

        if (search.getStartDateFrom() != null) {
            predicates.add(
                    criteriaBuilder.greaterThanOrEqualTo(
                            root.get(Board_.START_DATE), search.getStartDateFrom()));
        }

        if (search.getEndDateTo() != null) {
            predicates.add(
                    criteriaBuilder.lessThanOrEqualTo(
                            root.get(Board_.END_DATE), search.getEndDateTo()));
        }

        if (search.getStatus() != null) {
            predicates.add(criteriaBuilder.equal(root.get(Board_.STATUS), search.getStatus()));
        }

        if (search.getBoardType() != null) {
            Join<Board, BoardType> boardTypeJoin = root.join(Board_.BOARD_TYPE, JoinType.LEFT);
            predicates.add(
                    (criteriaBuilder.equal(
                            boardTypeJoin.get(BoardType_.ID), search.getBoardType().getId())));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
