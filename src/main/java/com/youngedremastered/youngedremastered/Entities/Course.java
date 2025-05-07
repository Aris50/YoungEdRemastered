package com.youngedremastered.youngedremastered.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "course")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cid", columnDefinition = "BIGINT")
    private Long cid;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "duration", nullable = false, length = 50)
    private String duration;

    @Column(name = "price", nullable = false, columnDefinition = "DECIMAL(10,2)")
    private BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "catid", nullable = false, columnDefinition = "BIGINT")
    private Category category;
}