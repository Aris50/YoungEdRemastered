package com.youngedremastered.youngedremastered.Controller;

import com.youngedremastered.youngedremastered.Entities.Student;
import com.youngedremastered.youngedremastered.Service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }


    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        return new ResponseEntity<>(studentService.createStudent(student), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents(
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String filterBy,
            @RequestParam(required = false) String filterValue) {
        return ResponseEntity.ok(studentService.getAllStudents(sortBy, filterBy, filterValue));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudentById(id));
    }


    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return ResponseEntity.ok(studentService.updateStudent(id, student));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Student> partialUpdate(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return ResponseEntity.ok(studentService.partialUpdateStudent(id, updates));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}