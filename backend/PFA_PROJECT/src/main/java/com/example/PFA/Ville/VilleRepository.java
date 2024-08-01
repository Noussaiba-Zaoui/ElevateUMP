package com.example.PFA.Ville;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VilleRepository extends JpaRepository<Ville, Long> {
    List<Ville> findByRegion(String region);
}

