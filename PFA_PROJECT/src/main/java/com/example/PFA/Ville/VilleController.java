package com.example.PFA.Ville;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/villes")
public class VilleController {
    @Autowired
    private VilleService villeService;

    @GetMapping
    public ResponseEntity<List<Ville>> getVillesOriental() {
        List<Ville> villesOriental = villeService.getVillesByRegion();
        return ResponseEntity.ok(villesOriental);
    }
}
