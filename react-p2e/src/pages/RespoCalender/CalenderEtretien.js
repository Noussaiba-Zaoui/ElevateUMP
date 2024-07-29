



import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

import AdminNavbar from '../../layouts/Navbar/AdminNavbar';
import "../../styles/SessionDetails.css";
import DetailsProjets from '../../services/DetailsProjets';
import Modal from 'react-modal';
import frLocale from '@fullcalendar/core/locales/fr'; // Import French locale
import '../../styles/calender.css'
import respCalenderService from '../../services/respCalenderService';
import CalenderEventService from '../../services/CalenderEventService';
import { Link,useParams } from 'react-router-dom';
import RespCalNavbar from './NavBars/RespCalNavbar';
Modal.setAppElement('#root');

const CalendarEntretion = () => {


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
  
  
  useEffect(() => {
    if (projects.length > 0 && !initialized) {
      initializeDraggable();
      setInitialized(true);
    }
  }, [projects, initialized]);

  const initializeDraggable = () => {
    const containerEl = document.getElementById('external-events');
    if (containerEl) {
      new Draggable(containerEl, {
        itemSelector: '.fc-event-main',
        eventData: function(eventEl) {
          return {
            title: eventEl.innerText.trim(),
            id: eventEl.getAttribute('data-id'),
          };
        },
      });
    }
  };

  const handleEventDoubleClick = (info) => {
    info.jsEvent.preventDefault();
    const project = projects.find(p => p.title === info.event.title);
    if (project) {
      setResponsibleName(project.nomPrenom);
     
    }
    setSelectedEvent(info.event);
    setIsModalOpen(true);
  };

  



  const handleEventRightClick = (info) => {
   
    info.jsEvent.preventDefault();
    setContextMenu({ visible: true, x: info.jsEvent.pageX, y: info.jsEvent.pageY, event: info.event });
  };

  const confirmPresenceInEntretien = async () => {

    if (!selectedEvent) return;

    // Assuming selectedEvent.title is in the format "ProjP2e\noussaiba zaoui"
    const titleWithUsername = selectedEvent.title;
    
    // Extracting the project title from the selectedEvent.title
    const title = titleWithUsername.split('\n')[0].trim(); // Assuming the title and username are separated by '\n'

    console.log(title); // Verify that only the project title is logged

    try {
      const response = await DetailsProjets.GetDetailsByTitle(title);
      const projectDetails = response.data;
     
   
        await CalenderEventService.confirmPresenceInEntretien(projectDetails.idprojet);
        
        // Update event status or any other necessary UI changes
        const updatedEvents = events.map(event => {
          if (event.id === projectDetails.idprojet) {
            return {
              ...event,
              status: 'PRESENT', // Update to confirmed status
            };
          }
          return event;
        });

        setEvents(updatedEvents);
        setIsModalOpen(false); // Close modal after confirming presence
      } catch (error) {
        console.error('Error confirming presence:', error);
      }
    
  };

 
  

  
  

 

  const  deletePresentEvent = async () => {
    if (contextMenu.event) {
      try {
        // Assuming contextMenu.event.id is available as a unique identifier
         CalenderEventService.deletePresentEvent(contextMenu.event.id);
        const updatedEvents = events.filter(event => event.id !== contextMenu.event.id);
        console.log(events.map(event=>event.id));
        console.log(contextMenu.event.id)
        console.log(updatedEvents)
        setEvents(updatedEvents);
        setContextMenu({ visible: false, x: 0, y: 0, event: null });
        window.location.reload()
        console.log('Event deleted from backend');
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  
  // const deleteEventFromUI = () => {
  //   if (contextMenu.event) {
  //     const updatedEvents = events.filter(event => event.id !== contextMenu.event.id);
  //     setEvents(updatedEvents);
  //     setContextMenu({ visible: false, x: 0, y: 0, event: null });
  //   }
  // };

  
  // const deleteEvent = () => {
  //   if (contextMenu.event) {
  //     if (contextMenu.event.status !== null) {
  //       // Event exists in backend, delete from backend
  //       deleteEventFromBackend();
  //     } else {
  //       // Event not yet created, delete from UI only
  //       deleteEventFromUI();
  //     }
  //   }
  // };
  


  const deleteEvent = () => {
    if (contextMenu.event) {
      // Remove the event from the backend or wherever it's stored
      // Assuming contextMenu.event.id is available as a unique identifier
      const updatedEvents = events.filter(event => event.idprojet !== contextMenu.event.id);
      setEvents(updatedEvents);
      setContextMenu({ visible: false, x: 0, y: 0, event: null });
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

  

  const eventDrop = (info) => {
    console.log('Dropped event:', info.event);
    // Your logic here
  };
  
  const eventResize = (info) => {
    console.log('Resized event:', info.event);
    // Your logic here
  };


  
 


  return (
    <>
     
      <RespCalNavbar   startDate={startDate} endDate={endDate} sessionId={id} />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Send Email Confirmation"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Confirmez vous la presence de l'equipe du projet</h2>
            <div className="flex justify-between">
              <button
                onClick={confirmPresenceInEntretien}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Oui
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Non
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className="max-w-xl mt-2 mx-auto text-center xl:max-w-2xl">
        <h2 className="text-3xl font-semibold leading-tight text-black sm:text-2xl xl:text-4xl mb-8">
          Calendrier d'Entretien <br />
          <span className="text-primary whitespace-nowrap">Session du {startDate} au {endDate}</span>
        </h2>
      </div>
      <div className="calendar-container flex justify-center">
       
        <div style={{ flexGrow: 1, zIndex: 1 }}>
        {events.length > 0 && (
        //    <FullCalendar
        //    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        //    initialView="timeGridDay"
        //    headerToolbar={{
        //      start: 'today prev,next',
        //      center: 'title',
        //      end: 'timeGridDay',
        //    }}
        //    locale={frLocale}
        //    editable={true}
        //    droppable={true}
        //    events={events} // Initialize with an empty array, events will be added dynamically
        //    height="90vh"
        //    eventClick={handleEventDoubleClick}
        //    eventDidMount={(info) => {
        //      info.el.addEventListener('contextmenu', (e) => {
        //        handleEventRightClick({ jsEvent: e, event: info.event });
        //      });
        //    }}
        //  />

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
        editable={true}
       selectable={true}
        selectMirror={true}
        droppable={true}
         eventDrop={(info) =>eventDrop (info)}
        // eventAllow={(info) =>eventAllow(info)}
        // allDaySlot={false}
        // slotMinTime="08:00:00"
        // slotMaxTime="18:00:00"
        eventClick={handleEventDoubleClick}
        eventResize={(info) => eventResize(info) }
        eventDidMount={(info) => {
          info.el.addEventListener('contextmenu', (e) => {
            handleEventRightClick({ jsEvent: e, event: info.event });
          });
        }}
        height="auto"
      
      />
          )}
        {events.length === 0 && (
          <>
          <p>Il n'y a pas encore d'événements. Veuillez en créer un.</p>
          <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridDay"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          locale={frLocale}
          editable={true}
          droppable={true}
          events={[
            

          ]} // Initialize with an empty array, events will be added dynamically
          height="90vh"
          eventClick={handleEventDoubleClick}
          eventDidMount={(info) => {
            info.el.addEventListener('contextmenu', (e) => {
              handleEventRightClick({ jsEvent: e, event: info.event });
            });
          }}
        />
          </>
         
        )}
              
        </div>
      </div>
      {contextMenu.visible && (
        <div
          style={{
            position: 'absolute',
            top: contextMenu.y,
            left: contextMenu.x,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            zIndex: 1000,
          }}
        >
          <button onClick={deletePresentEvent} className="p-2 w-full text-left">
            Revenir à l'état initial
          </button>
        </div>
      )}
    </>
  );
};

export default CalendarEntretion;




