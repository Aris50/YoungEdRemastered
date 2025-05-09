package com.youngedremastered.youngedremastered.Service;

import com.youngedremastered.youngedremastered.DTO.CourseAverageAgeDTO;
import com.youngedremastered.youngedremastered.Entities.Student;

import java.util.List;
import java.util.Map;

public interface StudentService {
    Student createStudent(Student student);
    Student updateStudent(Long id, Student student);
    Student partialUpdateStudent(Long id, Map<String, Object> updates);
    void deleteStudent(Long id);
    List<Student> getAllStudents(String sortBy, String filterBy, String filterValue);
    Student getStudentById(Long id);
    List<CourseAverageAgeDTO> getAverageAgeByCourse();
}