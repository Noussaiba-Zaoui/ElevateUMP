package com.example.PFA.email;


import com.example.PFA.Session.Session;
import com.example.PFA.config.JwtService;
import com.example.PFA.project.Project;
import com.example.PFA.project.ProjectRepository;
import com.example.PFA.role.UserRole;
import com.example.PFA.role.UserRoleRepository;
import com.example.PFA.user.Role;
import com.example.PFA.user.User;
import com.example.PFA.user.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.springframework.mail.javamail.MimeMessageHelper.MULTIPART_MODE_MIXED;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;
    private final UserRepository repository;
    private final JwtService jwtService;
    private final ProjectRepository projectRepository;
    private final UserRoleRepository userRoleRepository;

    @Async
    public void sendEmail(
            String to,
            String username,
            EmailTemplateName emailTemplate,
            String activationCode,
            String subject
    ) throws MessagingException {
        String templateName;
        if (emailTemplate == null) {
            templateName = "confirm-email";
        } else {
            templateName = emailTemplate.name();
        }

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                mimeMessage,
                MULTIPART_MODE_MIXED,
                StandardCharsets.UTF_8.name()
        );
        Map<String, Object> properties = new HashMap<>();


        properties.put("username", username);
        properties.put("activation_code", activationCode);
        properties.put("ActivationURL","http://localhost:3000/activation");

        Context context = new Context();
        context.setVariables(properties);

        helper.setFrom("hajabrk@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);

        String template = templateEngine.process(templateName, context);
        helper.setText(template, true);
        mailSender.send(mimeMessage);

    }



    public void sendEmailConvoquation(String email, String reponsibleName,String projectTitle

        ) throws MessagingException {
            try{

                MimeMessage mimeMessage = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                helper.setTo(email);
                helper.setSubject("Convoquation d'entretien");

                Context context = new Context();
                context.setVariable("username", email);
                context.setVariable(" projectTitle", projectTitle);
                context.setVariable("reponsibleName", reponsibleName);

                Project project =  projectRepository.findByIntituleProjet(projectTitle);
                if(project!=null) {

                    long id = project.getIdprojet();
                    context.setVariable("ReActivationURL", "http://localhost:3000/condidatSpace/"+id);

                    String htmlContent = templateEngine.process("ConvoquationEntretien", context);
                    helper.setText(htmlContent, true);
                    mailSender.send(mimeMessage);
                }
            } catch (Exception e) {
                System.out.println("message : " + e.getMessage());
                System.out.println("cause : " + e.getCause());
            }


    }



 //notifier les condidat et participant lors de la creation d'une nouvelle session par l'admin
 @Async
 public void sendSessionEmail(String to,
                              String username) {
     try {
         MimeMessage mimeMessage = mailSender.createMimeMessage();
         MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

         Context context = new Context();
         context.setVariable("username", username);
         String htmlContent = templateEngine.process("sessionEmail", context);

         helper.setTo(to);
         helper.setSubject("La Session est Ouverte ! ");
         helper.setText(htmlContent, true);

         mailSender.send(mimeMessage);
         System.out.println("Email sent successfully to " + to);
     } catch (MessagingException e) {
         System.err.println("Failed to create email message: " + e.getMessage());
         // Handle the specific error
     } catch (MailException e) {
         System.err.println("Failed to send email to " + to + ": " + e.getMessage());
         // Handle the specific error
     } catch (Exception e) {
         System.err.println("Unexpected error occurred while sending email to " + to + ": " + e.getMessage());
         // Handle the specific error
     }
 }

 //notifiction par admin en envoyant un message
 @Async
 public void sendFromCondidatToRespCalNotification(String to, String username, String message,Long id) throws MessagingException {

      Optional<Project> projetOpional = projectRepository.findById(id) ;
      if(projetOpional.isPresent()){
          Project projet = projetOpional.get();
          String responsable = projet.getNomPrenom();

          MimeMessage mimeMessage = mailSender.createMimeMessage();
          MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

          Context context = new Context();
          context.setVariable("username", username);
          context.setVariable("message", message);
          context.setVariable("responsable", responsable);
          String htmlContent = templateEngine.process("notificationEmailtoRespCal", context);

          helper.setTo(to);
          helper.setSubject("Notification depuis un condidat");
          helper.setText(htmlContent, true);

          mailSender.send(mimeMessage);
      }
      else {
          throw new MessagingException("no project with id :"+id);
      }

 }

    @Async
    public void sendCustomNotification(String to, String username, String message) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        Context context = new Context();
        context.setVariable("username", username);
        context.setVariable("message", message);
        String htmlContent = templateEngine.process("notificationEmail", context);

        helper.setTo(to);
        helper.setSubject("Notification depuis l'Admin");
        helper.setText(htmlContent, true);

        mailSender.send(mimeMessage);
    }



    @Async
    public void resendEmail(
            String to,
            String username,
            String recendedCode
    ) throws MessagingException {
        try{
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject("Nouveau code de vérification");

            Context context = new Context();
            context.setVariable("username", username);
            context.setVariable("newCode", recendedCode);
            context.setVariable("ReActivationURL", "http://localhost:3000/activation");

            String htmlContent = templateEngine.process("RecendVerificationCode", context);
            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);
        } catch (Exception e) {
            System.out.println("message : " + e.getMessage());
            System.out.println("cause : " + e.getCause());
        }
    }







    public void sendInformationEmailToUser(String name, Role role, String password, String to){
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("Alerte");

            Context context = new Context();
            context.setVariable("name", name);
            context.setVariable("role", role);
            context.setVariable("password", password);


            String htmlContent = templateEngine.process("informUserWithRole", context);
            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);

        } catch (Exception e) {
            System.out.println("message : " + e.getMessage());
            System.out.println("cause : " + e.getCause());
        }


    }





    public void sendNotificationEmailToAdmin(User Admin , User newUser) {

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,
                    true, "UTF-8");
            helper.setTo(Admin.getEmail());
            helper.setSubject("New User Notification");
            Context context = new Context();

            context.setVariable("Admin", Admin.getFirstname());

//            context.setVariable("userName", newUser.fullName());

//
            context.setVariable("email", newUser.getEmail());
//            context.setVariable("emailAcad", newUser.getEmailAcad());


            //context.setVariable("acceptURL", "http://localhost:8080/api/v1/admin/accept?email=" + newUser.getEmail());
//            context.setVariable("rejectURL", "http://localhost:8080/api/v1/admin/reject?email=" + newUser.getEmail());
            context.setVariable("pendingURL", "http://localhost:3000/homeAdmin");
            String htmlContent = templateEngine.process("emailNotificationToAdmin", context);

            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);

        } catch (MessagingException e) {
            throw new RuntimeException(e);

        }
    }


    public void sendRefuseEmail(String name, String to) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject("rejet");
            Context context = new Context();
            context.setVariable("name", name);


            String htmlContent = templateEngine.process("emailRejectTemplate", context);
            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);

        } catch (Exception e) {
            System.out.println("message : " + e.getMessage());
            System.out.println("cause : " + e.getCause());
        }

    }

    public void sendActivationSuccess(User user ) {

        String name = user.fullName(); // Assuming you have a method to get the user's full name
        String userEmail = user.getEmail();
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(userEmail);
            helper.setSubject("Compte Accepté");

            Context context = new Context();
            context.setVariable("name", name);




            String htmlContent = templateEngine.process("emailActivationReussite", context);

            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);

        } catch (Exception e) {
            System.out.println("message : " + e.getMessage());
            System.out.println("cause : " + e.getCause());
        }



    }


    public void sendEmailConfirmationtoResp(User respUser, long id) {

        try {


            Optional<Project> projectOptional = projectRepository.findById(id);
            if (projectOptional.isPresent()) {
                Project p = projectOptional.get();


                MimeMessage mimeMessage = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

                helper.setTo(respUser.getEmail());
                helper.setSubject("Confirmation de presence");

                Context context = new Context();

                context.setVariable("responsableProjet", p.getNomPrenom());
                context.setVariable("title", p.getIntituleProjet());


                String htmlContent = templateEngine.process("ConfirmationConvoquation", context);

                helper.setText(htmlContent, true);
                mailSender.send(mimeMessage);

            }

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

    }

    public void sendEmailRefusetoResp(User respUser,long id) {

        try {

            Optional<Project> projectOptional = projectRepository.findById(id);
            if (projectOptional.isPresent()) {
                Project p = projectOptional.get();


                MimeMessage mimeMessage = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

                helper.setTo(respUser.getEmail());
                helper.setSubject("Refus");

                Context context = new Context();

                context.setVariable("responsableCal", respUser.getFullName());
                context.setVariable("responsableProjet", p.getNomPrenom());
                context.setVariable("title", p.getIntituleProjet());


                String htmlContent = templateEngine.process("RefusConvoquatio", context);

                helper.setText(htmlContent, true);
                mailSender.send(mimeMessage);

            }

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

    }
}

