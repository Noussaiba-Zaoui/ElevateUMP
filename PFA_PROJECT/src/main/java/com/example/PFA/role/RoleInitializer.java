//package com.example.PFA.role;
//
//
//import jakarta.annotation.PostConstruct;
//import org.springframework.stereotype.Component;
//
//
//
//import static com.example.PFA.user.Role.USER;
//
//@Component
//public class RoleInitializer {
//
//    private final UserRoleRepository roleRepository;
//
//    public RoleInitializer(UserRoleRepository roleRepository) {
//        this.roleRepository = roleRepository;
//    }
//
//    @PostConstruct
//    public void initializeRoles() {
//        if(roleRepository. findByRole(USER).isEmpty()){
//            roleRepository.save(
//                    UserRole.builder().role(USER).build()
//            );
//
//        }
//    }
//
//
//
//}
