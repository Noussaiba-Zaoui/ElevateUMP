package com.example.PFA.Etablissement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EtablissementService {
    @Autowired
    private EtablissementRepository etablissementRepository;

    public List<Etablissement> getEtablissementsOrientalExceptUMP() {
        // Récupérer tous les établissements de la région Oujda et Nador
        List<Etablissement> etablissementsOujda = etablissementRepository.findByRegion("Oujda");
        List<Etablissement> etablissementsNador = etablissementRepository.findByRegion("Nador");

        // Fusionner les résultats
        List<Etablissement> etablissementsOujdaNador = new ArrayList<>();
        etablissementsOujdaNador.addAll(etablissementsOujda);
        etablissementsOujdaNador.addAll(etablissementsNador);

        return etablissementsOujdaNador;

    }
}

