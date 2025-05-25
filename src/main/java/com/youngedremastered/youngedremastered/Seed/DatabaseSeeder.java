package com.youngedremastered.youngedremastered.Seed;

import com.github.javafaker.Faker;
import com.youngedremastered.youngedremastered.Entities.Category;
import com.youngedremastered.youngedremastered.Entities.Course;
import com.youngedremastered.youngedremastered.Entities.Student;
import com.youngedremastered.youngedremastered.Repositories.CategoryRepository;
import com.youngedremastered.youngedremastered.Repositories.CourseRepository;
import com.youngedremastered.youngedremastered.Repositories.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class DatabaseSeeder {

    @Bean
    CommandLineRunner seed(CategoryRepository categoryRepo,
                           CourseRepository courseRepo,
                           StudentRepository studentRepo) {
        return args -> {
            Faker faker = new Faker();

            // 1. Create 100 categories
            List<Category> categories = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                Category c = new Category();
                c.setName(faker.educator().course());
                categories.add(c);
            }
            categoryRepo.saveAll(categories);

            // 2. Create 10,000 courses
            List<Course> courses = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                Course course = new Course();
                course.setName(faker.book().title());
                course.setDuration(faker.number().numberBetween(1, 6) + " months");
                course.setPrice(BigDecimal.valueOf(faker.number().randomDouble(2, 50, 1000)));
                course.setCategory(categories.get(faker.random().nextInt(categories.size())));
                courses.add(course);
            }
            courseRepo.saveAll(courses);

            // 3. Create 100,000 students
            int batchSize = 10;
            for (int i = 0; i < 10; i += batchSize) {
                List<Student> students = new ArrayList<>();
                for (int j = 0; j < batchSize; j++) {
                    Student student = new Student();
                    student.setName(faker.name().fullName());
                    student.setAge(faker.number().numberBetween(18, 30));
                    student.setGender(faker.options().option("Male", "Female", "Other"));
                    student.setGrade(faker.number().randomDouble(0, 4, 8));

                    // Always assign a course
                    student.setCourse(courses.get(faker.random().nextInt(courses.size())));

                    students.add(student);
                }
                studentRepo.saveAll(students);
                System.out.println("Inserted " + (i + batchSize) + " students...");
            }
        };
    }
}