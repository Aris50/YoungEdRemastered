package com.youngedremastered.youngedremastered.Controller;

import com.youngedremastered.youngedremastered.DTO.CourseAverageAgeDTO;
import com.youngedremastered.youngedremastered.Repositories.StudentRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {

    private final StudentRepository studentRepository;

    public StatisticsController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping("/average-age-by-course")
    public List<CourseAverageAgeDTO> getAverageAgeByCourse() {
        return studentRepository.findAverageAgeByCourse();
    }

}