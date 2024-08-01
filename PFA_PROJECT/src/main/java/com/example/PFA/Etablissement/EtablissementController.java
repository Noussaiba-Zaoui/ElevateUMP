package com.example.PFA.Etablissement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/etablissements")
public class EtablissementController {
    @Autowired
    private EtablissementService etablissementService;

    @GetMapping
    public ResponseEntity<List<Etablissement>> getEtablissementsOrientalExceptUMP() {
        List<Etablissement> etablissementsOrientalExceptUMP = etablissementService.getEtablissementsOrientalExceptUMP();
        return ResponseEntity.ok(etablissementsOrientalExceptUMP);
    }
}

