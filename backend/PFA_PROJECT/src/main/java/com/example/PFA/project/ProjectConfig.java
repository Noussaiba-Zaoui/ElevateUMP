//package com.example.PFA.project;
//
//import com.example.PFA.Session.Session;
//import com.example.PFA.Session.SessionService;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.annotation.Order;
//
//import java.time.LocalDateTime;
//
//@Configuration
//public class ProjectConfig {
//
//    private final ProjectRepository projectRepository;
//    private final SessionService sessionService;
//
//    public ProjectConfig(ProjectRepository projectRepository, SessionService sessionService) {
//        this.projectRepository = projectRepository;
//        this.sessionService = sessionService;
//    }
//
//    @Bean
//   // @Order(3)
//    CommandLineRunner commandLineRunnerR() {
//        return args -> {
//            createProject();
//        };
//    }
//
//    private void createProject() {
//        // Suppose que vous avez déjà une session
//        Session session = sessionService.getSessionById(1L); // Remplacer 1L par l'ID de la session existante
//        EtatProjet etat = EtatProjet.CREE;
//
//        // Création d'un projet
//        Project project = new Project(
//                "exemple@email.com",  // email
//                "Titre du projet",     // intituleProjet
//                "Idee de l'entreprise",// ideeEntreprise
//                "Nom Prenom",          // nomPrenom
//                "Ville d'origine",     // villeOrigine
//                "0123456789",          // telephonePortable
//                "Diplome",             // diplome
//                "Membre1, Membre2",   // members
//                "Domaine du projet",   // domaineProjetEntreprise
//                "Motivations",         // motivations
//                "Développez votre idée",// developpezVotreIdee
//                "Innovation technologique",// innovationTechnologique
//                "Viabilité et durabilité",// viabiliteDurableteProjet
//                "Originalité",         // originalite
//                "Impact économique",    // impactEconomique
//                "Responsabilités sociale et environnementale", // responsabilitesSocialesEnvironnementales
//                "Pérennité",            // perennitePotentielDeveloppement
//                "Etablissement",        // etablissement
//                "Filière",              // filiere
//                new byte[]{},          // scanCarteEtudiant
//                new byte[]{},          // scanMembresEquipe
//                LocalDateTime.now().toString(),  // createdAt
//                session,                // session
//                etat                    // état
//        );
//
//        // Enregistrement du projet dans la base de données
//        projectRepository.save(project);
//    }
//}
