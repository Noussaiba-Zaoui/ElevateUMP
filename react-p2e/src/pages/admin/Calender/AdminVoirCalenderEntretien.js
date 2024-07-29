



import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

import AdminNavbar from '../../../layouts/Navbar/AdminNavbar';
import "../../../styles/SessionDetails.css";
import DetailsProjets from '../../../services/DetailsProjets';

import frLocale from '@fullcalendar/core/locales/fr'; // Import French locale
import '../../../styles/calender.css'

import CalenderEventService from '../../../services/CalenderEventService';
import { Link,useParams } from 'react-router-dom';



const AdminVoirCalenderEntretion = () => {


  const { startDate, endDate ,id} = useParams();
  
  const [projects, setProjects] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [responsibleName, setResponsibleName] = useState('');
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, event: null });
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetchProjectTitles(startDate, endDate);
    fetchCalendarConfirmedEvents(id); 
  }, []);
 
  const fetchCalendarConfirmedEvents = async (id) => {
    try {

      const response = await CalenderEventService.getConfirmedEvents(id);
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
     
      case 'CONFIRMED':
        return 'orange';
      case 'PRESENT':
        return 'green';
      default:
        return 'gray';
    }
  };

  

  


  
 


  return (
    <>
     
      <AdminNavbar home={"homeAdmin"}  startDate={startDate} endDate={endDate} sessionId={id} />
     
      <div className="max-w-xl mt-20 mx-auto text-center xl:max-w-2xl">
        <h2 className="text-3xl font-semibold leading-tight text-black sm:text-2xl xl:text-4xl mb-6">
          Calendrier de passage <br />
          <span className="text-purple-700 whitespace-nowrap">Session du Session du {startDate} au {endDate}</span>
        </h2>
      </div>
      <div className="calendar-container flex justify-center">
       
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

export default AdminVoirCalenderEntretion;




