package com.example.PFA.project;


public enum

EtatProjet {
    CREE("Créé"),
    DEPOSE("Déposé"),
    CONVOQUE("CONVOQUE"),
    RETENU("RETENU");

    private final String typeProjet;

    EtatProjet(String typeProjet) {
        this.typeProjet = typeProjet;
    }

    public String getTypeProjet() {
        return typeProjet;
    }

    @Override
    public String toString() {
        return "EtatProjet{" +
                "typeProjet='" + typeProjet + '\'' +
                '}';
    }
}
