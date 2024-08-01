package com.example.PFA.user;

import java.util.List;
import java.util.Optional;

import com.example.PFA.project.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);


  List<User> findByEnabled(boolean b);


  @Query("SELECT u FROM User u WHERE u.session.id_session = :sessionId")
  List<User> findBySessionId(Long sessionId);





}
