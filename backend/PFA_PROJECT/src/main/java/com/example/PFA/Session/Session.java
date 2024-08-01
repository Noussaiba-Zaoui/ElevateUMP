package com.example.PFA.Session;

import com.example.PFA.user.User;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table
public class Session {
    @Setter
    @Getter
    @Id
    @SequenceGenerator(
            name = "session_sequence",
            sequenceName = "session_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "session_sequence"
    )
    private Long id_session;

    @Getter
    @Setter
    @Column(name = "date_debut")
    private LocalDate dateDebut;

    @Setter
    @Getter
    @Column(name = "date_fin")
    private LocalDate dateFin;







    @Setter
    @Getter
    @JsonManagedReference
    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<User> users;

    public Session(Long id_session, LocalDate dateDebut, LocalDate dateFin) {
        this.id_session = id_session;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }

    public Session(LocalDate dateDebut, LocalDate dateFin) {
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }

    public Session() {
    }






    @Override
    public String toString() {
        return "Session{" +
                "id_session=" + id_session +
                ", dateDebut=" + dateDebut +
                ", dateFin=" + dateFin +
                '}';
    }


}