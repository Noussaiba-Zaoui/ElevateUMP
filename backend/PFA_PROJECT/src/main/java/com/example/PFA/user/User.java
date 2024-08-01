package com.example.PFA.user;

import com.example.PFA.Session.Session;
import com.example.PFA.role.UserRole;
import com.example.PFA.token.Token;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "_user")
@EntityListeners(AuditingEntityListener.class)
public class User implements UserDetails, Principal {

  @Id
  @SequenceGenerator(
          name = "user_sequence",
          sequenceName = "user_sequence",
          allocationSize = 1

  )
  @GeneratedValue(
          strategy = GenerationType.SEQUENCE,
          generator = "user_sequence"
  )
  private Integer id;
  private String firstname;
  private String lastname;
  @Column(unique = true)
  private String email;
  private String EmailAcad;
  private String password;
  private boolean accountLocked;
  private boolean enabled;

  private String status = "Pending";

  @Setter
  @Getter
  @JsonBackReference
  @ManyToOne
  @JoinColumn(name = "session_id")
  private Session session;

  @JsonIgnore
  @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
  private List<UserRole> roles = new ArrayList<>();


  @CreatedDate
  @Column(nullable = false , updatable = false)
  private LocalDateTime createDate;
  @LastModifiedDate
  @Column(insertable = false)
  private LocalDateTime lastModifiedDate;


  @JsonIgnore
  @OneToMany(mappedBy = "user")
  private List<Token> tokens;



  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    List<GrantedAuthority> authorities = new ArrayList<>();
    for (UserRole userRole : roles) {
      authorities.addAll(userRole.getRole().getAuthorities());
    }
    return authorities;
  }
  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return enabled;
  }

  public String fullName(){
    return firstname + " " + lastname;
  }

  public String getFullName() {
    return firstname + " " + lastname;
  }

  @Override
  public String getName() {
    return email;
  }
}