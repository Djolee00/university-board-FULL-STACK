package rs.ac.fon.universityboardbackend.search.specification;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import rs.ac.fon.universityboardbackend.model.employee.Employee;
import rs.ac.fon.universityboardbackend.model.employee.Employee_;
import rs.ac.fon.universityboardbackend.search.domain.EmployeeSearch;

@RequiredArgsConstructor
public class EmployeeJpaSpecification implements Specification<Employee> {

    @NotNull private final EmployeeSearch search;

    @Override
    public Predicate toPredicate(
            Root<Employee> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        if (StringUtils.isNotBlank(search.getFirstName())) {
            predicates.add(
                    criteriaBuilder.like(
                            root.get(Employee_.firstName), search.getFirstName() + "%"));
        }

        if (StringUtils.isNotBlank(search.getLastName())) {
            predicates.add(
                    criteriaBuilder.like(root.get(Employee_.lastName), search.getLastName() + "%"));
        }

        if (StringUtils.isNotBlank(search.getPhoneNumber())) {
            predicates.add(
                    criteriaBuilder.like(
                            root.get(Employee_.phoneNumber), search.getPhoneNumber() + "%"));
        }

        if (search.getAcademicTitle() != null) {
            predicates.add(
                    criteriaBuilder.equal(
                            root.get(Employee_.academicTitle), search.getAcademicTitle()));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
