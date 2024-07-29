import AOS from "aos";
import "aos/dist/aos.css";
import './App.css';
import { Route, Routes } from "react-router-dom";
import React, { useEffect } from 'react';
import { isExpired } from "react-jwt";
import HomeAdmin from './pages/admin/HomeAdmin';
import GererSession from './pages/session/GererSession';
import SessionDetails from './pages/session/SessionDetails';

import Form from './pages/FormCandidate/index';
import FormP from './pages/UpdatePage/index';
import FormC from './pages/UpdatePage2/index';

import Signup from "./pages/User/Signup";
import Login from "./pages/User/Login";
import Layout from "./Layout";
import Home from "./Home";
import RequireAuth from "./Security/RequireAuth";
import ROLES from "./AppRoles/Roles";
import Unauthorized from "./pages/unauthorized";
import ParticipantPage from "./pages/Participant/index";
import CondidatPage from "./pages/Condidat/index";
import CondidatSpace from "./pages/Condidat/condidatSpace"
import HomePage from './pages/homePage/HomePage';
import Services from './components/Services/Services';
import DefP2E from './components/DefP2E/defP2e';
import PersistLogin from "./pages/User/PersistentLogin";
import ChangePasswordForm from "./pages/User/ChangePasswordForm";
import ListMembreCommition from './components/listMembreCommission';
import AddMemberCommission from './components/AddMemberCommission';
import EditMemberCommission from './components/EditMemberCommission';
import AddUser from './components/AddUser';
import UsersList from './components/UsersList';
import EditUser from './components/EditUser';
import ActivationPage from "./pages/User/ActivatePage";
import Espace from './pages/EspaceProject/index';
import Espace2 from './pages/EspaceProjet2/index';
import ProjetsDeposes from './pages/admin/ProjetDeposes';
import ProjetsConvoques from './pages/admin/ProjetConvoques';
import ProjetsRetenus from './pages/admin/ProjetRetenus';
import DetailDeposes from './pages/admin/DetailDeposes';
import DetailConvoques from './pages/admin/DetailConvoques';
import DetailRetenus from './pages/admin/DetailRetenus';
import Form3 from './pages/Form2/index';
import Pricing from "./components/Widgets/Pricing";
import HomeCommission from "./pages/commission/home/HomeCommission";


import VoirSessions from "./pages/commission/voirSessions/VoirSessions";
import DetailsSession from "./pages/commission/voirSessions/DetailsSession";
import ListUsers from "./pages/commission/VoirUsers/ListUsers";
import RespHome from "./pages/RespoCalender/RespHome";
import RespGererSession from "./pages/RespoCalender/RespSessions/RespGererSession";
import RespSessionDetails from "./pages/RespoCalender/RespSessions/RespSessionDetails";
import Calendar from "./pages/RespoCalender/Calender";
import CandidatSpace from "./pages/Condidat/condidatSpace";
import CalendarEntretion from "./pages/RespoCalender/CalenderEtretien";
import VoirCalenderPassage from "./pages/RespoCalender/VoirCalenderPassage";
import VoirCalendarEntretion from "./pages/RespoCalender/VoirCalenderEntretien";
import CommissionVoirCalenderPassage from "./pages/commission/Calender/CommissionVoirCalenderPassage";
import CommissionVoirCalenderEntretien from "./pages/commission/Calender/CommissionVoirCalenderEntretien";
import AdminVoirCalenderPassage from "./pages/admin/Calender/AdminVoirCalenderPassage";
import AdminVoirCalenderEntretien from "./pages/admin/Calender/AdminVoirCalenderEntretien";
import RespProjetDeposes from "./pages/RespoCalender/Projects/RespProjetDeposes";
import RespProjetConvoques from "./pages/RespoCalender/Projects/RespProjetConvoques";
import RespProjetRetenus from "./pages/RespoCalender/Projects/RespProjetRetenus";

import CommDetailDeposes from "./pages/commission/Projects/CommDetailDeposes";
import CommProjetDeposes from "./pages/commission/Projects/CommProjetDeposes";
import CommProjetConvoques from "./pages/commission/Projects/CommProjetConvoques";
import CommDetailConvoques from "./pages/commission/Projects/CommDetailConvoques";
import CommProjetRetenus from "./pages/commission/Projects/CommProjetRetenus";
import CommDetailRetenus from "./pages/commission/Projects/CommDetailRetenus";

const App = () => {


  

  useEffect(() => {
    AOS.init({
        offset: 100,
        duration: 800,
        easing: "ease-in",
        delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <>
   
    <Routes>
    
      <Route path="/" element={<Layout/>}> 
        {/* Public routes */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/Services" element={<Services />} />
        <Route path="/DefP2E" element={<DefP2E />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/unauthorized" element={<Unauthorized/>}/>
        <Route path="/ChangePasswordForm" element={<ChangePasswordForm/>}/>
        <Route path="/activation" element={<ActivationPage />} />
       
       
      
       

        <Route element={<PersistLogin/>}>

        {/* Admin routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path="/liste-membres-commissions" element={<ListMembreCommition />} />
          <Route path="/session/:startDate/:endDate/:sessionId/users" element={<UsersList />} />
          <Route path="/add-user/:startDate/:endDate/:sessionId" element={<AddUser/>} />
          <Route path="/add-Commission" element={<AddMemberCommission />} />
          <Route path="/users/:id" element={<EditMemberCommission/>} />
          <Route path="/users/:id/:startDate/:endDate/:sessionId" element={<EditUser/>}/>
          <Route path="/homeAdmin" element={<HomeAdmin/>}/> 
          <Route path="/GererSession" element={<GererSession/>}/>
          <Route path="/SessionDetails/:startDate/:endDate/:id" element={<SessionDetails/>}/>
          <Route path="/projets-deposes/:startDate/:endDate/:id/:etat" element={<ProjetsDeposes/>} />
          <Route path="/details-deposes/:startDate/:endDate/:title/:id" element={<DetailDeposes />} />
          <Route path="/projets-convoques/:startDate/:endDate/:id/:etat" element={<ProjetsConvoques/>} />
          <Route path="/details-convoques/:startDate/:endDate/:title/:id" element={<DetailConvoques />} />
          <Route path="/projets-retenus/:startDate/:endDate/:id/:etat" element={<ProjetsRetenus/>} />
          <Route path="/details-retenus/:startDate/:endDate/:title/:id" element={<DetailRetenus />} />
          <Route path="/AdminVoirCalenderPassage/:startDate/:endDate/:id" element={<AdminVoirCalenderPassage/>}/>
          <Route path="/AdminVoirCalenderEntretien/:startDate/:endDate/:id" element={<AdminVoirCalenderEntretien/>}/>
        </Route> 

        {/* Commission routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.commission]} />}>
          <Route path="/commissionHome" element={<HomeCommission/>}/> 
          <Route path="/VoirSession" element={<VoirSessions/>}/> 
          <Route path="/DetailsSessionCommission/:startDate/:endDate/:id" element={<DetailsSession/>}/> 
          <Route path="/VoirUsers/:startDate/:endDate/:id" element={<ListUsers/>}/>
          <Route path="/CommissionVoirCalenderPassage/:startDate/:endDate/:id" element={<CommissionVoirCalenderPassage />} />
          <Route path="/CommissionVoirCalenderEntretien/:startDate/:endDate/:id" element={<CommissionVoirCalenderEntretien />} />
          <Route path="/Commprojets-deposes/:startDate/:endDate/:id/:etat" element={<CommProjetDeposes/>} />
          <Route path="/Commdetails-deposes/:startDate/:endDate/:title/:id" element={<CommDetailDeposes />} />
          <Route path="/Commprojets-convoques/:startDate/:endDate/:id/:etat" element={<CommProjetConvoques/>} />
          <Route path="/Commdetails-convoques/:startDate/:endDate/:title/:id" element={<CommDetailConvoques />} />
          <Route path="/Commprojets-retenus/:startDate/:endDate/:id/:etat" element={<CommProjetRetenus/>} />
          <Route path="/Commdetails-retenus/:startDate/:endDate/:title/:id" element={<CommDetailRetenus />} />
        </Route>

        {/* Responsible Calendar routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.respCalender]} />}>
          <Route path="/RespHome" element={<RespHome/>}/> 
          <Route path="/RespSessions" element={<RespGererSession/>}/>  
          <Route path="/RespSessionDetails/:startDate/:endDate/:id" element={<RespSessionDetails/>}/> 
          <Route path="/Calender/:startDate/:endDate/:id" element={<Calendar/>}/>
          <Route path="/CalenderEntretien/:startDate/:endDate/:id" element={<CalendarEntretion/>}/>
          <Route path="/VoirCalenderPassage/:startDate/:endDate/:id" element={<VoirCalenderPassage />} />
          <Route path="/VoirCalenderEntretien/:startDate/:endDate/:id" element={<VoirCalendarEntretion />} />
          <Route path="/Respprojets-deposes/:startDate/:endDate/:id/:etat" element={<RespProjetDeposes/>} />
          <Route path="/Respdetails-deposes/:startDate/:endDate/:title/:id" element={<DetailDeposes/>}/>
          <Route path="/Respprojets-convoques/:startDate/:endDate/:id/:etat" element={<RespProjetConvoques/>} />
          <Route path="/Respdetails-convoques/:startDate/:endDate/:title/:id" element={<DetailConvoques />} />
          <Route path="/Respprojets-retenus/:startDate/:endDate/:id/:etat" element={<RespProjetRetenus/>} />
          <Route path="/Respdetails-retenus/:startDate/:endDate/:title/:id" element={<DetailRetenus />} />
        </Route> 

        {/* Participant routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.participant]} />}>
          <Route path="/participantHome" element={<ParticipantPage/>}/>
          <Route path="/deposer" element={<Espace/>}/>  {/* Change this later */}
          <Route path="/creer-projet" element={<Form />} />
          <Route path="/creer-projet/:projectId" element={<FormP />} />
        </Route>

        {/* Candidate routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.condidat]} />}>
          <Route path="/condidatHome" element={<CondidatPage/>}/>
          <Route path="/condidatSpace/:id" element={<CondidatSpace/>}/> {/* Change this later */}
          <Route path="/creer-projet2" element={<Form3 />} />
          <Route path="/creer-projet2/:projectId" element={<FormC />} />

          <Route path="/deposer2" element={<Espace2/>}/>
        </Route>

        </Route>
    


      </Route>  

    
    </Routes>
   
     <div id="popup-root"></div> {/* Root element for the popup */}
    </>
    
  );
}

export default App;
