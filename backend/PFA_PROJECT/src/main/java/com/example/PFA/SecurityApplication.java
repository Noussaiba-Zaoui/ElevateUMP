package com.example.PFA;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class SecurityApplication {

	public static void main(String[] args) {

		SpringApplication.run(SecurityApplication.class, args);

	}




//	@Bean
//	public CommandLineRunner commandLineRunner(
//			AuthenticationService service,
//			UserRoleRepository userRoleRepository
//	) {
//		return args -> {
//			// Create UserRole instances and save them
//			UserRole adminRole = userRoleRepository.save(new UserRole(Role.ADMIN));
//			UserRole managerRole = userRoleRepository.save(new UserRole(Role.MANAGER));
//
//			var roles = Arrays.asList(adminRole, managerRole);
//			var admin = RegisterRequest.builder()
//					.firstname("Admin")
//					.lastname("Admin")
//					.email("admin@mail.com")
//					.password("password")
//					.roles(roles)
//					.build();
//			System.out.println("Admin token: " + service.register(admin).getAccessToken());
//
//
//		};
//	}
}
