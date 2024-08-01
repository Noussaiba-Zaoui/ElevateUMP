package com.example.PFA.role;

import com.example.PFA.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRoleRepository extends
        JpaRepository<UserRole,Integer> {
    Optional<UserRole> findByRole(Role role);

    @Query("SELECT DISTINCT ur.role FROM UserRole ur")
    List<Role> findAllRoles();
}