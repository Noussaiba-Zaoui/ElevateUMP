package com.example.PFA.demo;

import com.example.PFA.Session.Session;
import com.example.PFA.Session.SessionService;
import com.example.PFA.project.EtatProjet;
import com.example.PFA.project.Project;
import com.example.PFA.project.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/participant")
@PreAuthorize("hasRole('PARTICIPANT')")
@Tag(name = "participant")
public class ParticipantController {

  private static final String UPLOAD_DIR = "uploads/";

  private final ProjectService projectService;
  private final SessionService sessionService;
  public ParticipantController(ProjectService projectService,SessionService sessionService) {
    this.projectService = projectService;
    this.sessionService = sessionService;
  }

  @Operation(
          description = "Get endpoint for manager",
          summary = "This is a summary for participant get endpoint",
          responses = {
                  @ApiResponse(
                          description = "Success",
                          responseCode = "200"
                  ),
                  @ApiResponse(
                          description = "Unauthorized / Invalid Token",
                          responseCode = "403"
                  )
          }

  )


  @GetMapping("/Project/checkTitle/{title}")
   //@PreAuthorize("hasRole('PARTICIPANT') and hasAuthority('participant:read')")
  public ResponseEntity<Boolean> checkProjectTitle(@PathVariable String title) {
    boolean exists = projectService.checkProjectTitleExists(title);
    return ResponseEntity.ok(exists);
  }

  @GetMapping("/Project/checkTitle/{title}/{id}")
   //@PreAuthorize("hasRole('PARTICIPANT') and hasAuthority('participant:read')")
  public ResponseEntity<Boolean> checkProjectTitle(@PathVariable String title, @PathVariable Long id) {
    boolean exists = projectService.checkProjectTitleExists(title, id);
    return ResponseEntity.ok(exists);
  }

  @GetMapping("/Project/{projectId}")
   @PreAuthorize("hasAnyRole('PARTICIPANT','COMMISSION','RESPCALENDER') and hasAnyAuthority('participant:read','COMMISSION','resp_calender:read')")
  public ResponseEntity<Project> getProjectDetails(@PathVariable Long projectId) {
    Project project = projectService.getProjectById(projectId);

    // Vérifie si le projet existe
    if (project == null) {
      return ResponseEntity.notFound().build();
    }

    // Renvoie les détails du projet
    return ResponseEntity.ok(project);
  }

  @PostMapping("/Project")
   @PreAuthorize("hasRole('PARTICIPANT') and hasAuthority('participant:create')")
  public ResponseEntity<Project> createProject(@ModelAttribute Project formData,@RequestParam(value = "scanCarteEtudiantFile") List<MultipartFile> scanCarteEtudiantFile) {
    // Récupérer la session courante
    // Session currentSession = sessionService.getCurrentSession();

//        if (currentSession == null) {
//            throw new RuntimeException("Aucune session courante n'est disponible");
//        }


    // Créer un nouvel objet Project avec les informations nécessaires
    Project newProjectData = new Project();
    newProjectData.setEmail(formData.getEmail());
    newProjectData.setIntituleProjet(formData.getIntituleProjet());
    newProjectData.setIdeeEntreprise(formData.getIdeeEntreprise());
    newProjectData.setNomPrenom(formData.getNomPrenom());
    newProjectData.setVilleOrigine(formData.getVilleOrigine());
    newProjectData.setTelephonePortable(formData.getTelephonePortable());
    newProjectData.setDiplome(formData.getDiplome());
    newProjectData.setMembers(formData.getMembers());
    newProjectData.setDomaineProjetEntreprise(formData.getDomaineProjetEntreprise());
    newProjectData.setMotivations(formData.getMotivations());
    newProjectData.setDeveloppezVotreIdee(formData.getDeveloppezVotreIdee());
    newProjectData.setInnovationTechnologique(formData.getInnovationTechnologique());
    newProjectData.setViabiliteDurableteProjet(formData.getViabiliteDurableteProjet());
    newProjectData.setOriginalite(formData.getOriginalite());
    newProjectData.setImpactEconomique(formData.getImpactEconomique());
    newProjectData.setResponsabilitesSocialesEnvironnementales(formData.getResponsabilitesSocialesEnvironnementales());
    newProjectData.setPerennitePotentielDeveloppement(formData.getPerennitePotentielDeveloppement());
    newProjectData.setEtablissement(formData.getEtablissement());
    newProjectData.setFiliere(formData.getFiliere());

    newProjectData.setScanCarteEtudiantFile(formData.getScanCarteEtudiantFile());

    // Enregistrement des fichiers sur le serveur
    List<String> fileNames = saveUploadedFiles(scanCarteEtudiantFile);

    // Ajoutez les noms de fichiers dans l'objet du projet
    newProjectData.setScanCarteEtudiant(fileNames);

    // Mettre à jour l'état et la session du nouveau projet
    newProjectData.setEtat(EtatProjet.CREE);
    //newProjectData.setSession(currentSession);
    // Ajouter la date d'aujourd'hui au champ createdAt
    newProjectData.setCreatedAt(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));

    // Créer le projet
    Project createdProject = projectService.createProject(newProjectData);

    return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
  }
  private List<String> saveUploadedFiles(List<MultipartFile> files) {
    // Création du dossier de téléchargement s'il n'existe pas
    Path uploadPath = Paths.get(UPLOAD_DIR);
    if (!Files.exists(uploadPath)) {
      try {
        Files.createDirectories(uploadPath);
      } catch (IOException e) {
        e.printStackTrace();
      }
    }

    // Enregistrement des fichiers sur le serveur
    List<String> fileNames = new ArrayList<>();
    for (MultipartFile file : files) {
      try {
        byte[] bytes = file.getBytes();
        Path path = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
        Files.write(path, bytes);
        fileNames.add(file.getOriginalFilename());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }

    return fileNames;
  }


  @PutMapping("/Project/{id}")
   @PreAuthorize("hasRole('PARTICIPANT') and hasAuthority('participant:update')")

  public ResponseEntity<Project> updateProjectWithAssociations(@PathVariable Long id, @ModelAttribute Project updatedProjectData,@RequestParam(value = "scanCarteEtudiantFile") List<MultipartFile> scanCarteEtudiantFile) {
    Project project = projectService.getProjectById(id);

    // Vérifier si le projet existe
    if (project == null) {
      return ResponseEntity.notFound().build();
    }

    // Vérifier si le projet a l'état "CREE"
    if (project.getEtat().contains(EtatProjet.CREE)) {
      // Récupérer la session courante
      Session currentSession = sessionService.getCurrentSession();

      // Vérifier si la session courante est disponible
      if (currentSession == null) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
      }

      // Mettre à jour la session du projet
      updatedProjectData.setSession(currentSession);
      updatedProjectData.setCreatedAt(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));

      // Mettre à jour les autres champs du projet
      project.setEmail(updatedProjectData.getEmail());
      project.setIntituleProjet(updatedProjectData.getIntituleProjet());
      project.setIdeeEntreprise(updatedProjectData.getIdeeEntreprise());
      project.setNomPrenom(updatedProjectData.getNomPrenom());
      project.setVilleOrigine(updatedProjectData.getVilleOrigine());
      project.setTelephonePortable(updatedProjectData.getTelephonePortable());
      project.setDiplome(updatedProjectData.getDiplome());
      project.setMembers(updatedProjectData.getMembers());
      project.setDomaineProjetEntreprise(updatedProjectData.getDomaineProjetEntreprise());
      project.setMotivations(updatedProjectData.getMotivations());
      project.setDeveloppezVotreIdee(updatedProjectData.getDeveloppezVotreIdee());
      project.setInnovationTechnologique(updatedProjectData.getInnovationTechnologique());
      project.setViabiliteDurableteProjet(updatedProjectData.getViabiliteDurableteProjet());
      project.setOriginalite(updatedProjectData.getOriginalite());
      project.setImpactEconomique(updatedProjectData.getImpactEconomique());
      project.setResponsabilitesSocialesEnvironnementales(updatedProjectData.getResponsabilitesSocialesEnvironnementales());
      project.setPerennitePotentielDeveloppement(updatedProjectData.getPerennitePotentielDeveloppement());
      project.setEtablissement(updatedProjectData.getEtablissement());
      project.setFiliere(updatedProjectData.getFiliere());
      project.setCreatedAt(updatedProjectData.getCreatedAt());
      // Logique pour gérer les fichiers
      // Utilisez les URLs ou les chemins des fichiers selon vos besoins
      project.setScanCarteEtudiantFile(updatedProjectData.getScanCarteEtudiantFile());

      // Enregistrement des fichiers sur le serveur
      List<String> fileNames = saveUploadedFiles(scanCarteEtudiantFile);

      // Ajoutez les noms de fichiers dans l'objet du projet
      project.setScanCarteEtudiant(fileNames);

      // Mettre à jour le projet dans la base de données
      Project updatedProject = projectService.updateProject(id, project);

      return new ResponseEntity<>(updatedProject, HttpStatus.OK);
    } else {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
  }

  // Endpoint pour supprimer un projet
  @DeleteMapping("/Project/{projectId}")
   @PreAuthorize("hasRole('PARTICIPANT') and hasAuthority('participant:delete')")
  public ResponseEntity<Void> deleteProject(@PathVariable Long projectId) {
    Project project = projectService.getProjectById(projectId);

    // Vérifie si le projet existe
    if (project == null) {
      return ResponseEntity.notFound().build();
    }

    // Vérifie si le projet a l'état "CREE"
    if (project.getEtat().contains(EtatProjet.CREE)) {
      projectService.deleteProject(projectId);
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
  }
}
