package com.youngedremastered.youngedremastered.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "student")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "BIGINT")
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "age", nullable = false)
    private Integer age;

    @Column(name = "gender", nullable = false, length = 10)
    private String gender;

    @Column(name = "grade", nullable = false)
    private Double grade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cid", nullable = false, columnDefinition = "BIGINT")
    private Course course;
}