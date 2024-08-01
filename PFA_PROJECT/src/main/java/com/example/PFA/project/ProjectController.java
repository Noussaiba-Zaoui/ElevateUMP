package com.example.PFA.project;
import com.example.PFA.Session.Session;
import com.example.PFA.Session.SessionService;
import com.example.PFA.email.EmailService;
import com.example.PFA.user.User;
import com.example.PFA.user.UserService;

import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.PFA.user.Role;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.ArrayList;
import java.util.Arrays;

import java.time.LocalDate;

import java.util.List;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/project")
public class ProjectController {

    private final ProjectService projectService ;
    private final ProjectRepository projectRepository;
    private final SessionService sessionService;

    private final UserService userService;
    private final EmailService emailService;

    @Autowired
    public ProjectController(ProjectService projectService, ProjectRepository projectRepository, SessionService sessionService, UserService userService, EmailService emailService) {
        this.projectService = projectService;
        this.projectRepository = projectRepository;
        this.sessionService = sessionService;
        this.userService = userService;
        this.emailService = emailService;
    }



    @PostMapping("/event")
    public ResponseEntity<Void> createEvent(@RequestBody EventRequest eventRequest) throws MessagingException {
        Project project = projectService.getProjectById(eventRequest.getProjectId());
        if (project != null) {
            project.setStartDate(eventRequest.getStartDate());
            project.setEndDate(eventRequest.getEndDate());
            project.setStatus(EventStatus.PENDING);
            projectService.updateProject(project.getIdprojet(), project);
            emailService.sendEmailConvoquation(project.getEmail(), project.getNomPrenom(),project.getIntituleProjet());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/delete_event/{id}")
    public void  DeleteEvent(@PathVariable Long id) throws Exception {
        Optional<Project> p = projectRepository.findById(id);
        if(p.isPresent()){
            Project projet = p.get();
            projet.setStatus(null);
            projet.setStartDate(null);
            projet.setEndDate(null);
            projet.setEtat(EtatProjet.DEPOSE);
            projectRepository.save(projet);
        }
        else{
            throw new Exception("Project with id=:"+id+"not found");
        }

    }

    @DeleteMapping("/delete_present/{id}")
    public void   deleteEventFromPresent(@PathVariable Long id) throws Exception {
        Optional<Project> p = projectRepository.findById(id);
        if(p.isPresent()){
            Project projet = p.get();
            projet.setStatus(EventStatus.CONFIRMED);


            // Update the etat list to include only DEPOSE
            List<EtatProjet> updatedEtatList = new ArrayList<>();
            updatedEtatList.add(EtatProjet.DEPOSE);

            projet.setEtats(updatedEtatList);
            projet.setEtat(EtatProjet.DEPOSE);


            projectRepository.save(projet);
        }
        else{
            throw new Exception("Project with id=:"+id+"not found");
        }

    }



    @GetMapping("/passage_event/{sessionId}")
    public ResponseEntity<List<Project>>  getPassageEvents(@PathVariable Long sessionId) {
        List<String> validStatuses = Arrays.asList("CONFIRMED", "PENDING","REJECTED");
        List<Project> confirmedProjects = projectRepository.findByStatusInAndSessionId(validStatuses, sessionId);
        return ResponseEntity.ok(confirmedProjects);
    }

//    @GetMapping("/entretien_events/{sessionId}")
//    public ResponseEntity<List<Project>> getEntretienEventsBySession(@PathVariable  Long id) {
//        List<String> validStatuses = Arrays.asList("CONFIRMED", "PRESENT");
//        List<Project> confirmedProjects = projectRepository.findByStatusIn(validStatuses);
//        return ResponseEntity.ok(confirmedProjects);
//    }

    @GetMapping("/entretien_events/{sessionId}")
    public ResponseEntity<List<Project>> getEntretienEventsBySession(@PathVariable Long sessionId) {
        List<String> validStatuses = Arrays.asList("CONFIRMED", "PRESENT");
        List<Project> confirmedProjects = projectRepository.findByStatusInAndSessionId(validStatuses, sessionId);
        return ResponseEntity.ok(confirmedProjects);
    }

    @PostMapping("/confirm/{id}")
    public void ConfirmPresence(@PathVariable  Long id ){
        projectService.confirmPresence(id);
    }

    @PostMapping("/reject/{id}")
    public void rejectPresence(@PathVariable  Long id){
        projectService.rejectPresence(id);
    }


    @GetMapping("/convoquation/{id}")
    public ResponseEntity<Project> getConvoquation(@PathVariable  Long id){
        Project project = projectService.getConvoquation(id);
        return  ResponseEntity.ok(project);
    }

    @PostMapping("/confirmPresenceInEntretien/{id}")
    public void  confirmPresenceInEntretien(@PathVariable Long id){
        projectService.confirmPresenceInEntretien(id);
    }






    // Endpoint pour récupérer tous les projets
    @GetMapping
    public List<Project> getProjects() {
        return projectService.getProjects();
    }
    // Endpoint pour récupérer les projets de l'état "CREE"
    @GetMapping("/cree/{email}")
    public ResponseEntity<List<Project>> getProjectsByCree(@PathVariable String email) {
        List<Project> projects = projectService.getProjectsByEtatAndEmail(EtatProjet.CREE, email);
        return ResponseEntity.ok(projects);
    }
    @GetMapping("/titlesByDateAndState")
    public ResponseEntity<List<String>> getProjectTitlesByDateAndState(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam("etat") String etat) {

        EtatProjet etatProjet = EtatProjet.valueOf(etat.toUpperCase());

        List<String> titles = projectService.getProjectTitlesByDateAndState(startDate, endDate, etatProjet);

        return ResponseEntity.ok(titles);
    }

    @GetMapping("/titlesBySessionIdAndState/{sessionId}")
    public ResponseEntity<List<String>> getProjectTitlesBySessionIdAndState(
            @PathVariable("sessionId") Long sessionId,
            @RequestParam("etat") String etat) {

        EtatProjet etatProjet = EtatProjet.valueOf(etat.toUpperCase());
        List<String> titles = projectService.getProjectTitlesBySessionIdAndState(sessionId, etatProjet);

        return ResponseEntity.ok(titles);
    }

    @GetMapping("/depose/{email}")
    public ResponseEntity<List<Project>> getProjectsByDepose(@PathVariable String email) {
        List<Project> projects = projectService.getProjectsByEtatAndEmail(EtatProjet.DEPOSE, email);
        return ResponseEntity.ok(projects);
    }


    @GetMapping("/id")
    public ResponseEntity<Long> getProjectIdByTitle(@RequestParam("title") String title) {
        Long projectId = projectService.getProjectIdByTitle(title);
        if (projectId != null) {
            return ResponseEntity.ok(projectId);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/titles")
    public ResponseEntity<List<String>> getProjectTitlesCree(@RequestParam String email) {
        List<String> titles = projectService.getProjectTitlesByEmailAndEtat(email, EtatProjet.CREE);
        return ResponseEntity.ok(titles);
    }

    @GetMapping("/titles/{etat}")
    public ResponseEntity<List<String>> getProjectTitlesEtat(@PathVariable String etat) {
        // Convertir la chaîne d'état en enum EtatProjet
        EtatProjet etatProjet = EtatProjet.valueOf(etat.toUpperCase());

        List<String> titles = projectService.getProjectTitlesByEtat(etatProjet);
        return ResponseEntity.ok(titles);
    }
    @GetMapping("/{intitule}")
    public ResponseEntity<Project> getProjectDetailsByIntitule(@PathVariable String intitule) {
        Project project = projectService.getProjectByIntitule(intitule);
        if (project != null) {
            return ResponseEntity.ok(project);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/titles2")
    public ResponseEntity<List<String>> getProjectTitlesDepose(@RequestParam String email) {
        List<String> titles = projectService.getProjectTitlesByEmailAndEtat(email, EtatProjet.DEPOSE);
        return ResponseEntity.ok(titles);
    }

    @GetMapping("/id/{projectId}")
    public ResponseEntity<String> getProjectEmailById(@PathVariable Long projectId) {
        String email = projectService.getProjectEmailById(projectId);
        if (email != null) {
            return ResponseEntity.ok(email);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/uploads/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get("uploads").resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                String contentType = Files.probeContentType(filePath);

                if (contentType == null) {
                    contentType = "application/octet-stream";
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // Endpoint pour créer un projet
//    @PostMapping
//    public ResponseEntity<Project> createProject(@RequestBody Project newProjectData) {
//        newProjectData.setEtat(EtatProjet.CREE); // Marquer le projet comme créé
//        Project createdProject = projectService.createProject(newProjectData);
//        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
//    }

//    // Endpoint pour mettre à jour un projet
//    @PutMapping("/{id}")
//    public ResponseEntity<Project> updateProjectWithAssociations(@PathVariable Long id, @RequestBody Project updatedProjectData) {
//        Project updatedProject = projectService.updateProject(id, updatedProjectData);
//        return new ResponseEntity<>(updatedProject, HttpStatus.OK);
//    }

//    // Endpoint pour supprimer un projet
//    @DeleteMapping("/{projectId}")
//    public ResponseEntity<Void> deleteProject(@PathVariable Long projectId) {
//        projectService.deleteProject(projectId);
//        return ResponseEntity.noContent().build();
//    }

    // Endpoint pour marquer un projet comme déposé
    // je doit ajouter la session ici car elle est ouverte , lorsque l'etat et depose on va ajouter la session

    @PostMapping("/depose/{projectId}")
    public ResponseEntity<Void> markProjectAsDeposed(@PathVariable Long projectId) {
        Project project = projectService.getProjectById(projectId);
        if (project != null) {
            project.setEtat(EtatProjet.DEPOSE); // Mark the project as deposited

            // Retrieve the current session
            Session currentSession = sessionService.getCurrentSession();
            project.setSession(currentSession);

            projectService.updateProject(projectId, project);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }




//    // Endpoint pour récupérer tous les projets déposés dans une session
//    @GetMapping("/session/{sessionId}/deposed")
//    public ResponseEntity<List<Project>> getDeposedProjectsInSession(@PathVariable Long sessionId) {
//        Session session = sessionService.getSessionById(sessionId);
//        if (session != null) {
//            List<Project> deposedProjects = projectService.getDeposedProjectsInSession(session);
//            return ResponseEntity.ok(deposedProjects);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
}