package com.youngedremastered.youngedremastered.Service.Impl;

import com.youngedremastered.youngedremastered.Entities.Course;
import com.youngedremastered.youngedremastered.Repositories.CourseRepository;
import com.youngedremastered.youngedremastered.Service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    @Override
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Course updateCourse(Long id, Course course) {
        Course existing = courseRepository.findById(id).orElseThrow();
        existing.setName(course.getName());
        existing.setDuration(course.getDuration());
        existing.setPrice(course.getPrice());
        existing.setCategory(course.getCategory());
        return courseRepository.save(existing);
    }

    @Override
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElseThrow();
    }
}
