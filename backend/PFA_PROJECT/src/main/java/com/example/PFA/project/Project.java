package com.example.PFA.project;


import com.example.PFA.Session.Session;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Table
public class Project {
    @Id
    @SequenceGenerator(
            name = "project_sequence",
            sequenceName = "project_sequence",
            allocationSize = 1

    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "project_sequence"
    )
    private Long idprojet;
    private String email;
    private String intituleProjet;
    private String ideeEntreprise;
    private String nomPrenom;
    private String villeOrigine;
    private String telephonePortable;
    private String diplome;
    private String members;
    private String domaineProjetEntreprise;
    private String motivations;
    private String developpezVotreIdee;
    private String innovationTechnologique;
    private String viabiliteDurableteProjet;
    private String originalite;
    private String impactEconomique;
    private String responsabilitesSocialesEnvironnementales;
    private String perennitePotentielDeveloppement;
    private String etablissement;
    private String filiere;






    @ElementCollection
    private List<String> scanCarteEtudiant;

    @Transient // Indique que ce champ ne doit pas être persisté en base de données
    private List<MultipartFile> scanCarteEtudiantFile;


    private String createdAt;


    @Getter
    @Setter
    private LocalDateTime startDate;
    @Getter
    @Setter
    private LocalDateTime endDate;

    @Getter
    @Setter
    private String message;



    @ManyToOne
    @JoinColumn(name = "id_session")
    private Session session;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @Getter
    @Setter
    private List<EtatProjet> etats; // Utilisation d'une liste d'états


    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    private EventStatus status;


    public Project(Long idprojet, String email, String intituleProjet, String ideeEntreprise, String nomPrenom, String villeOrigine, String telephonePortable, String diplome, String members, String domaineProjetEntreprise, String motivations, String developpezVotreIdee, String innovationTechnologique, String viabiliteDurableteProjet, String originalite, String impactEconomique, String responsabilitesSocialesEnvironnementales, String perennitePotentielDeveloppement, String etablissement, String filiere, List<String> scanCarteEtudiant, List<MultipartFile> scanCarteEtudiantFile,String createdAt, Session session,List<EtatProjet> etats,EventStatus status,String message) {
        this.idprojet = idprojet;
        this.email = email;
        this.intituleProjet = intituleProjet;
        this.ideeEntreprise = ideeEntreprise;
        this.nomPrenom = nomPrenom;
        this.villeOrigine = villeOrigine;
        this.telephonePortable = telephonePortable;
        this.diplome = diplome;
        this.members = members;
        this.domaineProjetEntreprise = domaineProjetEntreprise;
        this.motivations = motivations;
        this.developpezVotreIdee = developpezVotreIdee;
        this.innovationTechnologique = innovationTechnologique;
        this.viabiliteDurableteProjet = viabiliteDurableteProjet;
        this.originalite = originalite;
        this.impactEconomique = impactEconomique;
        this.responsabilitesSocialesEnvironnementales = responsabilitesSocialesEnvironnementales;
        this.perennitePotentielDeveloppement = perennitePotentielDeveloppement;
        this.etablissement = etablissement;
        this.filiere = filiere;
        this.scanCarteEtudiant = scanCarteEtudiant;
        this.scanCarteEtudiantFile = scanCarteEtudiantFile;
        this.createdAt = createdAt;
        this.session = session;
        this.etats = etats;
        this.status=status;
        this.message = message;

    }

    public Project(Long idprojet, String email, String intituleProjet, String ideeEntreprise, String nomPrenom, String villeOrigine, String telephonePortable, String diplome, String members, String domaineProjetEntreprise, String motivations, String developpezVotreIdee, String innovationTechnologique, String viabiliteDurableteProjet, String originalite, String impactEconomique, String responsabilitesSocialesEnvironnementales, String perennitePotentielDeveloppement, String etablissement, String filiere, List<String> scanCarteEtudiant, List<MultipartFile> scanCarteEtudiantFile,String createdAt, Session session, List<EtatProjet> etats) {
        this.idprojet = idprojet;
        this.email = email;
        this.intituleProjet = intituleProjet;
        this.ideeEntreprise = ideeEntreprise;
        this.nomPrenom = nomPrenom;
        this.villeOrigine = villeOrigine;
        this.telephonePortable = telephonePortable;
        this.diplome = diplome;
        this.members = members;
        this.domaineProjetEntreprise = domaineProjetEntreprise;
        this.motivations = motivations;
        this.developpezVotreIdee = developpezVotreIdee;
        this.innovationTechnologique = innovationTechnologique;
        this.viabiliteDurableteProjet = viabiliteDurableteProjet;
        this.originalite = originalite;
        this.impactEconomique = impactEconomique;
        this.responsabilitesSocialesEnvironnementales = responsabilitesSocialesEnvironnementales;
        this.perennitePotentielDeveloppement = perennitePotentielDeveloppement;
        this.etablissement = etablissement;
        this.filiere = filiere;
        this.scanCarteEtudiant = scanCarteEtudiant;
        this.scanCarteEtudiantFile = scanCarteEtudiantFile;
        this.createdAt = createdAt;
        this.session = session;
        this.etats = etats;

    }



    public Project(String email, String intituleProjet, String ideeEntreprise, String nomPrenom, String villeOrigine, String telephonePortable, String diplome, String members, String domaineProjetEntreprise, String motivations, String developpezVotreIdee, String innovationTechnologique, String viabiliteDurableteProjet, String originalite, String impactEconomique, String responsabilitesSocialesEnvironnementales, String perennitePotentielDeveloppement, String etablissement, String filiere, List<String> scanCarteEtudiant,List<MultipartFile> scanCarteEtudiantFile, String createdAt, Session session,List<EtatProjet> etats) {
        this.email = email;
        this.intituleProjet = intituleProjet;
        this.ideeEntreprise = ideeEntreprise;
        this.nomPrenom = nomPrenom;
        this.villeOrigine = villeOrigine;
        this.telephonePortable = telephonePortable;
        this.diplome = diplome;
        this.members = members;
        this.domaineProjetEntreprise = domaineProjetEntreprise;
        this.motivations = motivations;
        this.developpezVotreIdee = developpezVotreIdee;
        this.innovationTechnologique = innovationTechnologique;
        this.viabiliteDurableteProjet = viabiliteDurableteProjet;
        this.originalite = originalite;
        this.impactEconomique = impactEconomique;
        this.responsabilitesSocialesEnvironnementales = responsabilitesSocialesEnvironnementales;
        this.perennitePotentielDeveloppement = perennitePotentielDeveloppement;
        this.etablissement = etablissement;
        this.filiere = filiere;
        this.scanCarteEtudiant = scanCarteEtudiant;
        this.scanCarteEtudiantFile = scanCarteEtudiantFile;
        this.createdAt = createdAt;
        this.session = session;
        this.etats = etats;
    }
    public Project(String email, String intituleProjet, String ideeEntreprise, String nomPrenom, String villeOrigine, String telephonePortable, String diplome, String members, String domaineProjetEntreprise, String motivations, String developpezVotreIdee, String innovationTechnologique, String viabiliteDurableteProjet, String originalite, String impactEconomique, String responsabilitesSocialesEnvironnementales, String perennitePotentielDeveloppement, String etablissement, String filiere, List<String> scanCarteEtudiant,List<MultipartFile> scanCarteEtudiantFile,
                   String createdAt,List<EtatProjet> etats) {
        this.email = email;
        this.intituleProjet = intituleProjet;
        this.ideeEntreprise = ideeEntreprise;
        this.nomPrenom = nomPrenom;
        this.villeOrigine = villeOrigine;
        this.telephonePortable = telephonePortable;
        this.diplome = diplome;
        this.members = members;
        this.domaineProjetEntreprise = domaineProjetEntreprise;
        this.motivations = motivations;
        this.developpezVotreIdee = developpezVotreIdee;
        this.innovationTechnologique = innovationTechnologique;
        this.viabiliteDurableteProjet = viabiliteDurableteProjet;
        this.originalite = originalite;
        this.impactEconomique = impactEconomique;
        this.responsabilitesSocialesEnvironnementales = responsabilitesSocialesEnvironnementales;
        this.perennitePotentielDeveloppement = perennitePotentielDeveloppement;
        this.etablissement = etablissement;
        this.filiere = filiere;
        this.scanCarteEtudiant = scanCarteEtudiant;
        this.scanCarteEtudiantFile = scanCarteEtudiantFile;
        this.createdAt = createdAt;
        //this.session = session;
        this.etats = etats;
    }
    public Project() {

    }



    public Long getIdprojet() {
        return idprojet;
    }

    public void setIdprojet(Long idprojet) {
        this.idprojet = idprojet;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIntituleProjet() {
        return intituleProjet;
    }

    public void setIntituleProjet(String intituleProjet) {
        this.intituleProjet = intituleProjet;
    }

    public String getIdeeEntreprise() {
        return ideeEntreprise;
    }

    public void setIdeeEntreprise(String ideeEntreprise) {
        this.ideeEntreprise = ideeEntreprise;
    }

    public String getNomPrenom() {
        return nomPrenom;
    }

    public void setNomPrenom(String nomPrenom) {
        this.nomPrenom = nomPrenom;
    }

    public String getVilleOrigine() {
        return villeOrigine;
    }

    public void setVilleOrigine(String villeOrigine) {
        this.villeOrigine = villeOrigine;
    }

    public String getTelephonePortable() {
        return telephonePortable;
    }

    public void setTelephonePortable(String telephonePortable) {
        this.telephonePortable = telephonePortable;
    }

    public String getDiplome() {
        return diplome;
    }

    public void setDiplome(String diplome) {
        this.diplome = diplome;
    }

    public String getMembers() {
        return members;
    }

    public void setMembers(String members) {
        this.members = members;
    }

    public String getDomaineProjetEntreprise() {
        return domaineProjetEntreprise;
    }

    public void setDomaineProjetEntreprise(String domaineProjetEntreprise) {
        this.domaineProjetEntreprise = domaineProjetEntreprise;
    }

    public String getMotivations() {
        return motivations;
    }

    public void setMotivations(String motivations) {
        this.motivations = motivations;
    }

    public String getDeveloppezVotreIdee() {
        return developpezVotreIdee;
    }

    public void setDeveloppezVotreIdee(String developpezVotreIdee) {
        this.developpezVotreIdee = developpezVotreIdee;
    }

    public String getInnovationTechnologique() {
        return innovationTechnologique;
    }

    public void setInnovationTechnologique(String innovationTechnologique) {
        this.innovationTechnologique = innovationTechnologique;
    }

    public String getViabiliteDurableteProjet() {
        return viabiliteDurableteProjet;
    }

    public void setViabiliteDurableteProjet(String viabiliteDurableteProjet) {
        this.viabiliteDurableteProjet = viabiliteDurableteProjet;
    }

    public String getOriginalite() {
        return originalite;
    }

    public void setOriginalite(String originalite) {
        this.originalite = originalite;
    }

    public String getImpactEconomique() {
        return impactEconomique;
    }

    public void setImpactEconomique(String impactEconomique) {
        this.impactEconomique = impactEconomique;
    }

    public String getResponsabilitesSocialesEnvironnementales() {
        return responsabilitesSocialesEnvironnementales;
    }

    public void setResponsabilitesSocialesEnvironnementales(String responsabilitesSocialesEnvironnementales) {
        this.responsabilitesSocialesEnvironnementales = responsabilitesSocialesEnvironnementales;
    }

    public String getPerennitePotentielDeveloppement() {
        return perennitePotentielDeveloppement;
    }

    public void setPerennitePotentielDeveloppement(String perennitePotentielDeveloppement) {
        this.perennitePotentielDeveloppement = perennitePotentielDeveloppement;
    }

    public String getEtablissement() {
        return etablissement;
    }

    public void setEtablissement(String etablissement) {
        this.etablissement = etablissement;
    }

    public String getFiliere() {
        return filiere;
    }

    public void setFiliere(String filiere) {
        this.filiere = filiere;
    }

    public List<String> getScanCarteEtudiant() {
        return scanCarteEtudiant;
    }

    public List<MultipartFile> getScanCarteEtudiantFile() {
        return scanCarteEtudiantFile;
    }

    public void setScanCarteEtudiantFile(List<MultipartFile> scanCarteEtudiantFile) {
        this.scanCarteEtudiantFile = scanCarteEtudiantFile;
    }

    public void setScanCarteEtudiant(List<String> scanCarteEtudiant) {
        this.scanCarteEtudiant = scanCarteEtudiant;
    }





    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public List<EtatProjet> getEtat() {
        return etats;
    }

    public void setEtat(EtatProjet newEtat) {
        // Assurez-vous que la liste 'etats' est initialisée
        if (this.etats == null) {
            this.etats = new ArrayList<>();
        }

        // Si le nouvel état est CREER, assurez-vous qu'il est ajouté correctement
        if (newEtat == EtatProjet.CREE) {
            // Ajouter CREE uniquement si la liste est vide ou si CREE n'est pas déjà présent
            if (!this.etats.contains(EtatProjet.CREE)) {
                this.etats.add(newEtat);
            }
        } else {
            // Si le nouvel état n'est pas CREER, retirez CREE de la liste
            this.etats.remove(EtatProjet.CREE);
            // Ajouter le nouvel état s'il n'est pas déjà présent
            if (!this.etats.contains(newEtat)) {
                this.etats.add(newEtat);
            }
        }
    }


    @Override
    public String toString() {
        return "Project{" +
                "id_projet=" + idprojet +
                ", email='" + email + '\'' +
                ", intituleProjet='" + intituleProjet + '\'' +
                ", ideeEntreprise='" + ideeEntreprise + '\'' +
                ", nomPrenom='" + nomPrenom + '\'' +
                ", villeOrigine='" + villeOrigine + '\'' +
                ", telephonePortable='" + telephonePortable + '\'' +
                ", diplome='" + diplome + '\'' +
                ", members='" + members + '\'' +
                ", domaineProjetEntreprise='" + domaineProjetEntreprise + '\'' +
                ", motivations='" + motivations + '\'' +
                ", developpezVotreIdee='" + developpezVotreIdee + '\'' +
                ", innovationTechnologique='" + innovationTechnologique + '\'' +
                ", viabiliteDurableteProjet='" + viabiliteDurableteProjet + '\'' +
                ", originalite='" + originalite + '\'' +
                ", impactEconomique='" + impactEconomique + '\'' +
                ", responsabilitesSocialesEnvironnementales='" + responsabilitesSocialesEnvironnementales + '\'' +
                ", perennitePotentielDeveloppement='" + perennitePotentielDeveloppement + '\'' +
                ", etablissement='" + etablissement + '\'' +
                ", filiere='" + filiere + '\'' +
                ", scanCarteEtudiant=" + scanCarteEtudiant +
                ", createdAt='" + createdAt + '\'' +
                ", session=" + session +
                ", etats=" + etats +
                '}';
    }
}




