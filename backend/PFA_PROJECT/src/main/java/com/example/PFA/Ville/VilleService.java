package com.example.PFA.Ville;

import com.example.PFA.Etablissement.Etablissement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VilleService {
    @Autowired
    private VilleRepository villeRepository;

    public List<Ville> getVillesByRegion() {

        List<Ville> VilleOriental = villeRepository.findByRegion("Oriental");
        List<Ville> VilleSoussMassa = villeRepository.findByRegion("Souss-Massa");
        List<Ville> VilleTangerTétouanAlHoceïma = villeRepository.findByRegion("Tanger-Tétouan-Al Hoceïma");
        List<Ville> VilleFèsMeknès= villeRepository.findByRegion("Fès-Meknès");
        List<Ville> VilleBéniMellalKhénifra= villeRepository.findByRegion("Béni Mellal-Khénifra");
        List<Ville> VilleCasablancaSettat= villeRepository.findByRegion("Casablanca-Settat");
        List<Ville> VilleDakhlaOuedEdDahab = villeRepository.findByRegion("Dakhla-Oued Ed-Dahab");
        List<Ville> VilleDrâaTafilalet = villeRepository.findByRegion("Drâa-Tafilalet");
        List<Ville> VilleMarrakechSafi = villeRepository.findByRegion("Marrakech-Safi");
        List<Ville> VilleGuelmimOuedNoun = villeRepository.findByRegion("Guelmim-Oued Noun");
        List<Ville> VilleRabatSaléKénitra = villeRepository.findByRegion("Rabat-Salé-Kénitra");
        List<Ville> VilleLaâyouneSakiaElHamra = villeRepository.findByRegion("Laâyoune-Sakia El Hamra");
        List<Ville> VilleAutre = villeRepository.findByRegion("");
        List<Ville> VillesMaroc = new ArrayList<>();

        VillesMaroc.addAll(VilleDrâaTafilalet);
        VillesMaroc.addAll(VilleFèsMeknès);
        VillesMaroc.addAll(VilleGuelmimOuedNoun);
        VillesMaroc.addAll(VilleBéniMellalKhénifra);
        VillesMaroc.addAll(VilleCasablancaSettat);
        VillesMaroc.addAll(VilleDakhlaOuedEdDahab);
        VillesMaroc.addAll(VilleTangerTétouanAlHoceïma);
        VillesMaroc.addAll(VilleOriental);
        VillesMaroc.addAll(VilleSoussMassa);
        VillesMaroc.addAll(VilleMarrakechSafi);
        VillesMaroc.addAll(VilleRabatSaléKénitra);
        VillesMaroc.addAll(VilleLaâyouneSakiaElHamra);
        VillesMaroc.addAll(VilleAutre);

        return VillesMaroc;
    }
}

