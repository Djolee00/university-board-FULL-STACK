package rs.ac.fon.universityboardbackend.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.ac.fon.universityboardbackend.model.employee.Employee;
import rs.ac.fon.universityboardbackend.repository.EmployeeRepository;
import rs.ac.fon.universityboardbackend.service.EmployeeService;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    @Transactional
    public void saveOrUpdate(Employee employee) {
        employeeRepository.save(employee);
    }
}
