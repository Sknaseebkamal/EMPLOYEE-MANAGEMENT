package com.qsp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.qsp.model.Employee;


public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}