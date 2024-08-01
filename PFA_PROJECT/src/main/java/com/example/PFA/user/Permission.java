package com.example.PFA.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {


    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    COMMISSION_READ("commission:read"),

    JURY_READ("jury:read"),
    JURY_CREATE("jury:create"),
    JURY_UPDATE("jury:update"),
    JURY_DELETE("jury:delete"),
    PRESIDENTJURY_READ("president_jury:read"),
    PRESIDENTJURY_CREATE("president_jury:create"),
    PRESIDENTJURY_UPDATE("president_jury:update"),
    PRESIDENTJURY_DELETE("president_jury:delete"),

    RESPCALENDER_READ("resp_calender:read"),
    RESPCALENDER_CREATE("resp_calender:create"),
    RESPCALENDER_UPDATE("resp_calender:update"),
    RESPCALENDER_DELETE("resp_calender:delete"),



    PARTICIPANT_READ("participant:read"),
    PARTICIPANT_CREATE("participant:create"),
    PARTICIPANT_UPDATE("participant:update"),
    PARTICIPANT_DELETE("participant:delete"),
    CONDIDAT_READ("condidat:read"),
    CONDIDAT_CREATE("condidat:create");





    @Getter
    private final String permission;
}
