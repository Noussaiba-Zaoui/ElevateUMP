package com.example.PFA.Etablissement;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EtablissementRepository extends JpaRepository<Etablissement, Long> {
    List<Etablissement> findByRegion(String oujda);
    // List<Etablissement> findByRegion(String region);
}

