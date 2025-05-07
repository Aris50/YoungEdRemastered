package com.youngedremastered.youngedremastered.Repositories;

import com.youngedremastered.youngedremastered.Entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface StudentRepository extends JpaRepository<Student, Long>, JpaSpecificationExecutor<Student> {}