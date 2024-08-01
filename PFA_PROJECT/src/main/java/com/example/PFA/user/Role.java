package com.example.PFA.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Getter
@RequiredArgsConstructor
public enum Role {
    USER(Collections.emptySet()),




  ADMIN(
          Set.of(
                  Permission.ADMIN_READ,
                  Permission.ADMIN_UPDATE,
                  Permission.ADMIN_DELETE,
                  Permission.ADMIN_CREATE

          )
  ),


  PARTICIPANT(
          Set.of(
                  Permission.PARTICIPANT_UPDATE,
                  Permission.PARTICIPANT_CREATE,
                  Permission.PARTICIPANT_READ,
                  Permission.PARTICIPANT_DELETE
          )
  ),
  CONDIDAT(
          Set.of(



                  Permission.PARTICIPANT_UPDATE,
                  Permission.PARTICIPANT_CREATE,
                  Permission.PARTICIPANT_READ,
                  Permission.PARTICIPANT_DELETE,
                  Permission.CONDIDAT_CREATE,
                  Permission.CONDIDAT_READ

          )
  ),

  COMMISSION(
          Set.of(Permission.COMMISSION_READ
                  )
  ),

 JURY(
            Set.of(Permission.JURY_READ,
                    Permission.JURY_UPDATE,
                    Permission.JURY_CREATE,
                    Permission.JURY_DELETE


            )
    ),
    PRESIDENTJURY(
            Set.of(Permission.JURY_READ,
                    Permission.JURY_UPDATE,
                    Permission.JURY_CREATE,
                    Permission.JURY_DELETE,
                    Permission.PRESIDENTJURY_READ,
                    Permission.PRESIDENTJURY_UPDATE,
                    Permission.PRESIDENTJURY_CREATE,
                    Permission.PRESIDENTJURY_DELETE




                    )
    ),

    RESPCALENDER(
            Set.of(Permission.RESPCALENDER_READ,
                    Permission.RESPCALENDER_UPDATE,
                    Permission.RESPCALENDER_CREATE,
                    Permission.RESPCALENDER_DELETE


    )
    );




  private final Set<Permission> permissions;


  public List<SimpleGrantedAuthority> getAuthorities() {
    var authorities = getPermissions()
            .stream()
            .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
            .collect(Collectors.toList());
    authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
    return authorities;
  }
}
