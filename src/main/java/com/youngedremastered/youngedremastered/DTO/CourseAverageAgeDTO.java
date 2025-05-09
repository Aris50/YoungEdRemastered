package com.youngedremastered.youngedremastered.DTO;

public class CourseAverageAgeDTO {
    private String courseName;
    private Double averageAge;

    public CourseAverageAgeDTO(String courseName, Double averageAge) {
        this.courseName = courseName;
        this.averageAge = averageAge;
    }

    public String getCourseName() {
        return courseName;
    }

    public Double getAverageAge() {
        return averageAge;
    }
}