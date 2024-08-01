package com.example.PFA.project;

import com.example.PFA.Session.Session;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Long>
{

    @Query("SELECT p FROM Project p WHERE p.session = :session AND :etat MEMBER OF p.etats")
    List<Project> findBySessionAndEtat(Session session, EtatProjet etat);
    @Query("SELECT p FROM Project p WHERE :etat MEMBER OF p.etats")
    List<Project> findByEtat(EtatProjet etat);

    Project findByIntituleProjet(String intituleProjet);

    boolean existsByIntituleProjet(String title);
    boolean existsByIntituleProjetAndIdprojetNot(String intituleProjet, Long id);




    // Méthode de requête personnalisée pour récupérer les noms de fichiers d'images pour un projet donné
    @Query(value = "SELECT scan_carte_etudiant FROM project_scan_carte_etudiant WHERE project_idprojet = ?1", nativeQuery = true)
    List<String> getImageFilenames(Long projectId);

    @Query("SELECT p FROM Project p WHERE p.email = :email AND :etat MEMBER OF p.etats")
    List<Project> findByEmailAndEtat(String email, EtatProjet etat);


    List<Project> findByStatus(EventStatus status);
    List<Project> findAllByStatusNotNull();

    List<Project> findByStatusIn(List<String> statuses);

    @Query("SELECT p FROM Project p WHERE p.status IN :statuses AND p.session.id_session = :sessionId")
    List<Project> findByStatusInAndSessionId(@Param("statuses") List<String> statuses, @Param("sessionId") Long sessionId);




    @Query("SELECT p.intituleProjet FROM Project p " +
            "WHERE p.session.dateDebut >= :startDate " +
            "AND p.session.dateFin <= :endDate " +
            "AND :etat MEMBER OF p.etats")
    List<String> findProjectTitlesBySessiondateDebutAnddateFinAndEtat(  @Param("startDate") LocalDate startDate,
                                                                        @Param("endDate") LocalDate endDate,
                                                                        @Param("etat") EtatProjet etat);

    @Query("SELECT p.intituleProjet FROM Project p " +
            "WHERE p.session.id_session = :sessionId " +
            "AND :etat MEMBER OF p.etats")
    List<String> findProjectTitlesBySessionIdAndEtat(@Param("sessionId") Long sessionId,
                                                     @Param("etat") EtatProjet etat);


    @Query("SELECT p FROM Project p WHERE p.session.id_session = :sessionId")
    List<Project> findBySessionId(Long sessionId);
}




