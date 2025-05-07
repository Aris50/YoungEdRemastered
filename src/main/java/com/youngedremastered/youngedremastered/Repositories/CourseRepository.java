package com.youngedremastered.youngedremastered.Repositories;

import com.youngedremastered.youngedremastered.Entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
}