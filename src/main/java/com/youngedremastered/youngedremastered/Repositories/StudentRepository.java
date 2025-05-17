package com.youngedremastered.youngedremastered.Repositories;

import com.youngedremastered.youngedremastered.DTO.CourseAverageAgeDTO;
import com.youngedremastered.youngedremastered.Entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long>, JpaSpecificationExecutor<Student> {

    /*
    @Query("SELECT new com.youngedremastered.youngedremastered.DTO.CourseAverageAgeDTO(s.course.name, AVG(s.age)) " +
            "FROM Student s GROUP BY s.course.name")
     */
    @Query("SELECT new com.youngedremastered.youngedremastered.DTO.CourseAverageAgeDTO(c.name, AVG(s.age)) " +
            "FROM Student s JOIN s.course c GROUP BY c.name")
    List<CourseAverageAgeDTO> findAverageAgeByCourse();
}