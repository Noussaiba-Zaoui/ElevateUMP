package com.example.PFA.project;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class EventRequest {
    private Long projectId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    // Getter and Setters
}