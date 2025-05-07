package com.youngedremastered.youngedremastered.Service.Impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.youngedremastered.youngedremastered.Entities.Student;
import com.youngedremastered.youngedremastered.Repositories.CourseRepository;
import com.youngedremastered.youngedremastered.Repositories.StudentRepository;
import com.youngedremastered.youngedremastered.Service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    @Override
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public Student updateStudent(Long id, Student updated) {
        Student existing = studentRepository.findById(id).orElseThrow();
        existing.setName(updated.getName());
        existing.setAge(updated.getAge());
        existing.setGender(updated.getGender());
        existing.setGrade(updated.getGrade());
        existing.setCourse(updated.getCourse());
        return studentRepository.save(existing);
    }

    @Override
    public Student partialUpdateStudent(Long id, Map<String, Object> updates) {
        Student student = studentRepository.findById(id).orElseThrow();

        ObjectMapper mapper = new ObjectMapper();
        Student patched = mapper.convertValue(updates, Student.class);

        if (patched.getName() != null) student.setName(patched.getName());
        if (patched.getAge() != null) student.setAge(patched.getAge());
        if (patched.getGender() != null) student.setGender(patched.getGender());
        if (patched.getGrade() != null) student.setGrade(patched.getGrade());
        if (patched.getCourse() != null) student.setCourse(patched.getCourse());

        return studentRepository.save(student);
    }

    @Override
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    @Override
    public List<Student> getAllStudents(String sortBy, String filterBy, String filterValue) {
        List<Student> students;

        if (filterBy != null && filterValue != null) {
            if (filterBy.equals("gender")) {
                students = studentRepository.findAll().stream()
                        .filter(s -> s.getGender().equalsIgnoreCase(filterValue))
                        .collect(Collectors.toList());
            } else {
                students = studentRepository.findAll();
            }
        } else {
            students = studentRepository.findAll();
        }

        if (sortBy != null) {
            students = students.stream()
                    .sorted((s1, s2) -> switch (sortBy) {
                        case "age" -> Integer.compare(s1.getAge(), s2.getAge());
                        case "grade" -> Double.compare(s1.getGrade(), s2.getGrade());
                        default -> s1.getName().compareToIgnoreCase(s2.getName());
                    })
                    .collect(Collectors.toList());
        }

        return students;
    }

    @Override
    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElseThrow();
    }
}