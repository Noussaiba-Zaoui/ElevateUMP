package com.example.PFA.project;
import com.example.PFA.Session.Session;
import com.example.PFA.Session.SessionService;

import com.example.PFA.email.EmailService;
import com.example.PFA.role.UserRole;
import com.example.PFA.role.UserRoleRepository;
import com.example.PFA.user.Role;
import com.example.PFA.user.User;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final SessionService sessionService;
    private final EmailService emailService;
    private final UserRoleRepository userRoleRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, SessionService sessionService, EmailService emailService, UserRoleRepository userRoleRepository) {
        this.projectRepository = projectRepository;
        this.sessionService = sessionService;


        this.emailService = emailService;


        this.userRoleRepository = userRoleRepository;
    }


    public List<String> getProjectTitlesByDateAndState(LocalDate startDate, LocalDate endDate, EtatProjet etat) {
        return projectRepository.findProjectTitlesBySessiondateDebutAnddateFinAndEtat(startDate, endDate, etat);
    }

    public List<Project> getProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectByIntitule(String intitule) {
        Project project = projectRepository.findByIntituleProjet(intitule);
        if (project != null) {
            String uploadDir = "uploads/";
            List<String> scanCarteEtudiantPaths = project.getScanCarteEtudiant().stream()
                    .map(fileName -> Paths.get(uploadDir, fileName).toString().replace("\\", "/"))
                    .collect(Collectors.toList());
            project.setScanCarteEtudiant(scanCarteEtudiantPaths);
        }
        return project;
    }
    public List<String> getProjectTitlesByEtat(EtatProjet etat) {
        List<Project> projects = projectRepository.findByEtat(etat);
        List<String> titles = projects.stream().map(Project::getIntituleProjet).collect(Collectors.toList());
        return titles;
    }
    public List<String> getProjectTitlesByEmailAndEtat(String email, EtatProjet etat) {
        // Utilisez le repository pour récupérer les titres des projets en fonction de l'email et de l'état
        List<Project> projects = projectRepository.findByEmailAndEtat(email, etat);

        // Extrait les titres des projets
        List<String> titles = projects.stream()
                .map(Project::getIntituleProjet)
                .collect(Collectors.toList());

        return titles;
    }
    public List<Project> getProjectsByEtatAndEmail(EtatProjet etat, String email) {
        return entityManager.createQuery(
                        "SELECT p FROM Project p WHERE :etat MEMBER OF p.etats AND p.email = :email", Project.class)
                .setParameter("etat", etat)
                .setParameter("email", email)
                .getResultList();
    }
    public Project createProject(Project formData) {
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
        newProjectData.setScanCarteEtudiant(formData.getScanCarteEtudiant());

        // Marquer le projet comme créé
        newProjectData.setEtat(EtatProjet.CREE);

        // Récupérer la session courante
        // Session currentSession = sessionService.getCurrentSession();

        // Vérifier si la session courante est disponible
//        if (currentSession == null) {
//            throw new RuntimeException("Aucune session courante n'est disponible");
//        }

        // Définir la session du projet
        // newProjectData.setSession(currentSession);

        // Ajouter la date d'aujourd'hui au champ createdAt
        newProjectData.setCreatedAt(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));

        return projectRepository.save(newProjectData);
    }

    public Project updateProject(Long id, Project updatedProjectData) {
        Project existingProject = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with ID: " + id));

        // Update project fields based on updatedProjectData
        existingProject.setEmail(updatedProjectData.getEmail());
        existingProject.setIntituleProjet(updatedProjectData.getIntituleProjet());
        existingProject.setIdeeEntreprise(updatedProjectData.getIdeeEntreprise());
        existingProject.setNomPrenom(updatedProjectData.getNomPrenom());
        existingProject.setVilleOrigine(updatedProjectData.getVilleOrigine());
        existingProject.setTelephonePortable(updatedProjectData.getTelephonePortable());
        existingProject.setDiplome(updatedProjectData.getDiplome());
        existingProject.setMembers(updatedProjectData.getMembers());
        existingProject.setDomaineProjetEntreprise(updatedProjectData.getDomaineProjetEntreprise());
        existingProject.setMotivations(updatedProjectData.getMotivations());
        existingProject.setDeveloppezVotreIdee(updatedProjectData.getDeveloppezVotreIdee());
        existingProject.setInnovationTechnologique(updatedProjectData.getInnovationTechnologique());
        existingProject.setViabiliteDurableteProjet(updatedProjectData.getViabiliteDurableteProjet());
        existingProject.setOriginalite(updatedProjectData.getOriginalite());
        existingProject.setImpactEconomique(updatedProjectData.getImpactEconomique());
        existingProject.setResponsabilitesSocialesEnvironnementales(updatedProjectData.getResponsabilitesSocialesEnvironnementales());
        existingProject.setPerennitePotentielDeveloppement(updatedProjectData.getPerennitePotentielDeveloppement());
        existingProject.setEtablissement(updatedProjectData.getEtablissement());
        existingProject.setFiliere(updatedProjectData.getFiliere());
        existingProject.setScanCarteEtudiant(updatedProjectData.getScanCarteEtudiant());
        existingProject.setCreatedAt(updatedProjectData.getCreatedAt());

        existingProject.setStartDate(updatedProjectData.getStartDate());
        existingProject.setEndDate(updatedProjectData.getEndDate());


        existingProject.setSession(updatedProjectData.getSession());

        return projectRepository.save(existingProject);
    }



    public List<Project> getProjectsByEtat(EtatProjet etat) {
        return projectRepository.findByEtat(etat);
    }

    public Project getProjectById(Long projectId) {
        return projectRepository.findById(projectId).orElse(null);
    }



    public void deleteProject(Long projectId) {
        projectRepository.deleteById(projectId);
    }



    public void markProjectAsDeposed(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));
        project.setEtat(EtatProjet.DEPOSE); // Marquer le projet comme déposé
        projectRepository.save(project); // Enregistrer le projet mis à jour
    }

    public List<Project> getDeposedProjectsInSession(Session session) {
        return projectRepository.findBySessionAndEtat(session, EtatProjet.DEPOSE);
    }

    // Méthode pour récupérer l'ID d'un projet par son intitulé
    public Long getProjectIdByTitle(String title) {
        Project project = projectRepository.findByIntituleProjet(title);
        if (project != null) {
            return project.getIdprojet();
        } else {
            return null;
        }
    }


    public boolean checkProjectTitleExists(String title) {
        return projectRepository.existsByIntituleProjet(title);
    }
    public boolean checkProjectTitleExists(String title, Long id) {
        return projectRepository.existsByIntituleProjetAndIdprojetNot(title, id);
    }


    public String getProjectEmailById(Long projectId) {
        Project project = projectRepository.findById(projectId).orElse(null);
        if (project != null) {
            return project.getEmail();
        } else {
            return null;
        }
    }

    public void confirmPresence(long id){
        Optional<Project> projectOptional = projectRepository.findById(id);

        if (projectOptional.isPresent()) {
            Project project = projectOptional.get();
            project.setStatus(EventStatus.CONFIRMED);


            projectRepository.save(project);

            Optional<UserRole> RespRoleOptional = userRoleRepository.findByRole(Role.RESPCALENDER);
            if (RespRoleOptional.isPresent()) {
                UserRole respRole = RespRoleOptional.get();
                // Retrieve the users associated with the admin role
                List<User> respUsers = respRole.getUsers();
                // Send the email notification to each admin user
                for (User respUser : respUsers) {
                    emailService.sendEmailConfirmationtoResp(respUser,id);
                }

            } else {
                // Handle case where admin role is not found
                throw new IllegalStateException("respcal role not found");
            }


        } else {
            // Handle case where user is not found
            throw new IllegalArgumentException("Project not found for the given id: " + id);
        }


    }

    public void confirmPresenceInEntretien(Long id) {

        Optional<Project> projectOptional = projectRepository.findById(id);

        if (projectOptional.isPresent()) {
            Project project = projectOptional.get();
            project.setStatus(EventStatus.PRESENT);
            project.setEtat(EtatProjet.CONVOQUE);

            projectRepository.save(project);

        } else {
            // Handle case where user is not found
            throw new IllegalArgumentException("Project not found for the given id: " + id);
        }
    }

    public void rejectPresence(long id){
        Optional<Project> projectOptional = projectRepository.findById(id);

        if (projectOptional.isPresent()) {
            Project project = projectOptional.get();
            project.setStatus(EventStatus.REJECTED);

            projectRepository.save(project);

            Optional<UserRole> RespRoleOptional = userRoleRepository.findByRole(Role.RESPCALENDER);
            if (RespRoleOptional.isPresent()) {
                UserRole respRole = RespRoleOptional.get();
                // Retrieve the users associated with the admin role
                List<User> respUsers = respRole.getUsers();
                // Send the email notification to each admin user
                for (User respUser : respUsers) {
                    emailService.sendEmailRefusetoResp(respUser,id);
                }
            } else {
                // Handle case where admin role is not found
                throw new IllegalStateException("resp role not found");
            }


        } else {
            // Handle case where user is not found
            throw new IllegalArgumentException("Project not found for the given id: " + id);
        }


    }

    public Project getConvoquation(Long id){
        Optional<Project> projectOptional = projectRepository.findById(id);

        if (projectOptional.isPresent()) {
            Project project = projectOptional.get();
            return project;

        } else {
            // Handle case where user is not found
            throw new IllegalArgumentException("Project not found for the given id: " + id);
        }

    }



    public List<Project> getDeposedProjects() {
        return getProjectsByEtat(EtatProjet.DEPOSE);
    }


    public List<String> getProjectTitlesBySessionIdAndState(Long sessionId, EtatProjet etat) {
        return projectRepository.findProjectTitlesBySessionIdAndEtat(sessionId, etat);
    }
}