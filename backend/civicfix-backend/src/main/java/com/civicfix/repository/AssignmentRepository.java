package com.civicfix.repository;

import com.civicfix.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    Optional<Assignment> findByComplaintId(Long complaintId);

    List<Assignment> findByEmployeeId(Long employeeId);

    List<Assignment> findByDepartmentId(Integer departmentId);
}
