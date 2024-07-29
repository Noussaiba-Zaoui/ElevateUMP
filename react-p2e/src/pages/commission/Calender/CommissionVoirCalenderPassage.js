
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Link,useParams } from 'react-router-dom';

import "../../../styles/SessionDetails.css";
import DetailsProjets from '../../../services/DetailsProjets';

import frLocale from '@fullcalendar/core/locales/fr'; // Import French locale
import '../../../styles/calender.css'
import CommissionNavbar from '../CommissionNavBar';
import CalenderEventService from '../../../services/CalenderEventService';




const CommissionVoirCalenderPassage = () => {


  const { startDate, endDate ,id} = useParams(); // Récupère les paramètres de l'URL
  const [projectTitles, setProjectTitles] = useState([]);
  
  const [projects, setProjects] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [responsibleName, setResponsibleName] = useState('');
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, event: null });
  const [events, setEvents] = useState([]);


  useEffect(() => {
    fetchProjectTitles(startDate, endDate);
    fetchCalendarEvents(id);  // Passe les dates à la fonction
  }, [startDate, endDate]);

  
  const fetchCalendarEvents = async (sessionId) => {
    try {
      const response = await CalenderEventService.getEvents(sessionId);
      const fetchedEvents = response.data.map(event => ({
        id: event.idprojet,
        title: event.intituleProjet,
        start: new Date(event.startDate[0], event.startDate[1] - 1, event.startDate[2], event.startDate[3], event.startDate[4]).toISOString(),
        end : event.endDate ? new Date(event.endDate[0], event.endDate[1] - 1, event.endDate[2], event.endDate[3], event.endDate[4]).toISOString() : null,
        status: event.status 
        // Add more properties if needed
      }));

      
      console.log(response.data)
  
       setEvents(fetchedEvents);
     
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    }
  };


 

 


  // const fetchProjectTitles = async (start, end) => {
  //   try {
  //     const response =  await DetailsProjets.getProjectTitlesByDateAndState(start, end, 'DEPOSE');
  //     const titles = response.data;
  //     console.log(response.data)

  //     const projectDetails = await Promise.all(titles.map(async (title) => {
  //       const detailsResponse = await DetailsProjets.GetDetailsByTitle(title);
  //       return { title, ...detailsResponse.data };
  //     }));

  //     setProjects(projectDetails);
  //     setResponsibleName(projectDetails.nomPrenom)
  //     console.log(projectDetails);

      


  //   } catch (error) {
  //     console.error('Error fetching project titles:', error);
  //   }
  // };

  const fetchProjectTitles = async (start, end) => {
    try {
      const response = await DetailsProjets.getProjectTitlesByDateAndState(start, end, 'DEPOSE');
      const titles = response;
      console.log(response);
  
      if (!titles || !Array.isArray(titles)) {
        throw new Error('Invalid response data: Expected an array of titles');
      }
  
      console.log(titles);
  
      const projectDetails = await Promise.all(
        titles.map(async (title) => {
          const detailsResponse = await DetailsProjets.GetDetailsByTitle(title);
          return { title, ...detailsResponse.data };
        })
      );
  
      setProjects(projectDetails);
  
      // // Assuming that projectDetails is an array and you want to set responsibleName based on the first project's nomPrenom
      // if (projectDetails.length > 0) {
      //   setResponsibleName(projectDetails[0].nomPrenom);
      // }
  
      console.log(projectDetails);
    } catch (error) {
      console.error('Error fetching project titles:', error);
    }
  };
  





 

  const getEventBackgroundColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'blue';
      case 'CONFIRMED':
        return 'orange';
      case 'REJECTED':
        return 'red';
      default:
        return 'gray';
    }
  };

  

  


  
 


  return (
    <>
     
      <CommissionNavbar startDate={startDate} endDate={endDate} sessionId={id} />
      <div className="max-w-xl mt-20 mx-auto text-center xl:max-w-2xl">
        <h2 className="text-3xl font-semibold leading-tight text-black sm:text-2xl xl:text-4xl mb-6">
          Calendrier de passage <br />
          <span className="text-purple-700  whitespace-nowrap">Session du {startDate} au {endDate}</span>
        </h2>
      </div>
      <div className="calendar-container flex justify-center">
        <div id="external-events" className="w-64 h-auto  p-4 bg-purple-600 rounded-lg ml-7 mr-7 z-10">
          <h3 className="text-white text-lg font-semibold mb-4">Projets déposés</h3>
          {projects.map((project, index) => (
            <div
              key={index}
              className=" fc-event-main relative flex flex-col justify-between items-center w-full h-auto p-4 mb-4 bg-purple-500 shadow-lg rounded-lg cursor-pointer"
              data-id={index}
            >
              <div className="flex flex-col items-center w-full">
                <p className="font-bold text-center text-white mb-2">{project.title}</p>
                <p className="text-center text-white">{project.nomPrenom}</p> {/* Display responsible user's name */}
              </div>
             
            </div>
          ))}
        </div>
        <div style={{ flexGrow: 1, zIndex: 1 }}>
        {events.length > 0 && (
        

        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        locale={frLocale}
        events={events.map(event => ({
          ...event,
          backgroundColor: getEventBackgroundColor(event.status),
        }))}
         editable={false}
        selectable={false}
        selectMirror={false}
        droppable={false}
        
       
        height="auto"
      
      />
          )}
        {events.length === 0 && (
          <>
         <p>Il n'y a pas encore d'événements. </p>
         
          </>
         
        )}
              
        </div>
      </div>
     
    </>
  );
};

export default CommissionVoirCalenderPassage;








