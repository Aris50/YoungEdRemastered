package com.youngedremastered.youngedremastered.Service;

import com.youngedremastered.youngedremastered.Entities.Course;
import java.util.List;

public interface CourseService {
    Course createCourse(Course course);
    Course updateCourse(Long id, Course course);
    void deleteCourse(Long id);
    List<Course> getAllCourses();
    Course getCourseById(Long id);
}
