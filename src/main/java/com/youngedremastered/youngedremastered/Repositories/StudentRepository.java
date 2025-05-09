package com.youngedremastered.youngedremastered.Repositories;

import com.youngedremastered.youngedremastered.DTO.CourseAverageAgeDTO;
import com.youngedremastered.youngedremastered.Entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long>, JpaSpecificationExecutor<Student> {


    List<CourseAverageAgeDTO> findAverageAgeByCourse();
}