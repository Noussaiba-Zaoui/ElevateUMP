



import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { Link,useParams } from 'react-router-dom';
import RespCalNavbar from './NavBars/RespCalNavbar';
import "../../styles/SessionDetails.css";
import DetailsProjets from '../../services/DetailsProjets';
import Modal from 'react-modal';
import frLocale from '@fullcalendar/core/locales/fr'; // Import French locale
import '../../styles/calender.css'
import respCalenderService from '../../services/respCalenderService';
import CalenderEventService from '../../services/CalenderEventService';

Modal.setAppElement('#root');

const Calendar = () => {


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

 
  

  
  

  // const deleteEvent = () => {
  //   if (contextMenu.event) {
  //     contextMenu.event.remove();
  //     setContextMenu({ visible: false, x: 0, y: 0, event: null });
  //   }
  // };

  const deleteEventFromBackend = async () => {
    if (contextMenu.event) {
      try {
        // Assuming contextMenu.event.id is available as a unique identifier
        await CalenderEventService.deleteEvent(contextMenu.event.id);
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
  
  const sendEmail = async () => {
    if (!selectedEvent) return;

    // Assuming selectedEvent.title is in the format "ProjP2e\noussaiba zaoui"
    const titleWithUsername = selectedEvent.title;
    
    // Extracting the project title from the selectedEvent.title
    const title = titleWithUsername.split('\n')[0].trim(); // Assuming the title and username are separated by '\n'

    console.log(title); // Verify that only the project title is logged

    try {
      const response = await DetailsProjets.GetDetailsByTitle(title);
      const projectDetails = response.data;
      console.log(response.data)
      const responsibleName = projectDetails.nomPrenom;
      const responsibleEmail = projectDetails.email;
      console.log(responsibleName)
      setResponsibleName(responsibleName);

    

      console.log(`Email sent to ${responsibleName} with email ${responsibleEmail} for project ${title}`);
      
      const eventRequest = {
        projectId: projectDetails.idprojet,
        startDate: selectedEvent.start.toISOString(), // Convert to ISO string
        endDate: selectedEvent.end ? selectedEvent.end.toISOString() : null // Convert to ISO string if end date exists
      };
  
       CalenderEventService.createEvent(eventRequest);

      console.log('Event created in backend');
     
      setIsModalOpen(false);
      window.location.reload()
    } catch (error) {
      console.error('Error sending email:', error);
    
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
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Send Email Confirmation"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Êtes-vous sûr(e) de vouloir envoyer l'email de confirmation de présence au porteur du projet ?</h2>
            <div className="flex justify-between">
              <button
                onClick={sendEmail}
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
      <RespCalNavbar   startDate={startDate} endDate={endDate} sessionId={id} />
      <div className="max-w-xl mt-2 mx-auto text-center xl:max-w-2xl">
        <h2 className="text-3xl font-semibold leading-tight text-black sm:text-2xl xl:text-4xl mb-8">
          Calendrier de passage <br />
          <span className="text-primary whitespace-nowrap">Session du {startDate} au {endDate}</span>
        </h2>
      </div>
      <div className="calendar-container flex justify-center">
        <div id="external-events" className="w-64 h-auto p-4 bg-primary rounded-lg ml-7 mr-7 z-10">
          <h3 className="text-white text-lg font-semibold mb-4">Projets déposés</h3>
          {projects.map((project, index) => (
            <div
              key={index}
              className="fc-event-main relative flex flex-col justify-between items-center w-full h-auto p-4 mb-4 bg-purple-500 shadow-lg rounded-lg cursor-pointer"
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
          <button onClick={deleteEventFromBackend} className="p-2 w-full text-left">
            Supprimer événement
          </button>
        </div>
      )}
    </>
  );
};

export default Calendar;




// import React, { useState, useEffect } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
// import AdminNavbar from '../../layouts/Navbar/AdminNavbar';
// import "../../styles/SessionDetails.css";
// import DetailsProjets from '../../services/DetailsProjets';
// import Modal from 'react-modal';
// import frLocale from '@fullcalendar/core/locales/fr'; // Import French locale
// import '../../styles/calender.css';
// import respCalenderService from '../../services/respCalenderService';
// import CalendarEventService from '../../services/CalenderEventService'; // Import the new service

// Modal.setAppElement('#root');

// const Calendar = () => {
//   const [projects, setProjects] = useState([]);
//   const [initialized, setInitialized] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, event: null });
//   const [newEventDetails, setNewEventDetails] = useState(null); // Store new event details
//    const [responsibleName, setResponsibleName] = useState('');
//   useEffect(() => {
//     fetchProjectTitles();
//   }, []);

//   const fetchProjectTitles = async () => {
//     try {
//       const response = await DetailsProjets.GetTitles('DEPOSE');
//       const titles = response.data;
//       console.log(response.data);

//       const projectDetails = await Promise.all(titles.map(async (title) => {
//         const detailsResponse = await DetailsProjets.GetDetailsByTitle(title);
//         return { title, ...detailsResponse.data };
//       }));

//       setProjects(projectDetails);
//       console.log(projectDetails);
//     } catch (error) {
//       console.error('Error fetching project titles:', error);
//     }
//   };

//   useEffect(() => {
//     if (projects.length > 0 && !initialized) {
//       initializeDraggable();
//       setInitialized(true);
//     }
//   }, [projects, initialized]);

//   const initializeDraggable = () => {
//     const containerEl = document.getElementById('external-events');
//     if (containerEl) {
//       new Draggable(containerEl, {
//         itemSelector: '.fc-event-main',
//         eventData: function(eventEl) {
//           return {
//             title: eventEl.innerText.trim(),
//             id: eventEl.getAttribute('data-id'),
//           };
//         },
//       });
//     }
//   };



//   const sendEmail = async () => {
//     if (!selectedEvent) return;

//     // Assuming selectedEvent.title is in the format "ProjP2e\noussaiba zaoui"
//     const titleWithUsername = selectedEvent.title;
    
//     // Extracting the project title from the selectedEvent.title
//     const title = titleWithUsername.split('\n')[0].trim(); // Assuming the title and username are separated by '\n'

//     console.log(title); // Verify that only the project title is logged

//     try {
//       const response = await DetailsProjets.GetDetailsByTitle(title);
//       const projectDetails = response.data;
//       console.log(response.data)
//       const responsibleName = projectDetails.nomPrenom;
//       const responsibleEmail = projectDetails.email;
//       console.log(responsibleName)
//       setResponsibleName(responsibleName);

//       // Call the email-sending endpoint
//       await respCalenderService.confirm(responsibleEmail, responsibleName, title);

//       console.log(`Email sent to ${responsibleName} with email ${responsibleEmail} for project ${title}`);

     
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error('Error sending email:', error);
    
//     }
//   };

//   const handleEventClick = (info) => {
//     setSelectedEvent(info.event);
//     setIsModalOpen(true);
//   };

//   const handleEventRightClick = (info) => {
//     info.jsEvent.preventDefault();
//     setContextMenu({ visible: true, x: info.jsEvent.pageX, y: info.jsEvent.pageY, event: info.event });
//   };

//   const deleteEvent = () => {
//     if (contextMenu.event) {
//       contextMenu.event.remove();
//       setContextMenu({ visible: false, x: 0, y: 0, event: null });
//     }
//   };

//   const confirmEventCreation = async () => {
//     if (!selectedEvent) return;

//      // Assuming selectedEvent.title is in the format "ProjP2e\noussaiba zaoui"
//      const titleWithUsername = selectedEvent.title;
    
//      // Extracting the project title from the selectedEvent.title
//      const title = titleWithUsername.split('\n')[0].trim(); // Assuming the title and username are separated by '\n'
 
//      console.log(title); // Verify that only the project title is logged

//     try {


//       const project = projects.find(p => p.title === title);
//       const eventDetails = {
//         start: selectedEvent.startDate,
//         end: selectedEvent.endDate,
//         title: selectedEvent.title,
//         status: 'PENDING',
//         project: { id: project.idproject },
//       };

//       const response = await CalendarEventService.createEvent(eventDetails);

//       selectedEvent.setProp('id', response.data.id);
//       selectedEvent.setExtendedProp('status', response.data.status);
//       selectedEvent.setExtendedProp('project', response.data.project);

//       sendEmail();

     

    
//       setSelectedEvent(null);
//     } catch (error) {
//       console.error('Error creating event or sending email:', error);
//     }
//   };

//   return (
//     <>
//       {isModalOpen && (
//         <Modal
//           isOpen={isModalOpen}
//           onRequestClose={() => setIsModalOpen(false)}
//           contentLabel="Confirm Event Creation"
//           className="modal-content"
//           overlayClassName="modal-overlay"
//         >
//           <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
//             <h2 className="text-2xl font-semibold mb-4">Êtes-vous sûr(e) de vouloir créer cet événement et envoyer un email à l'admin ?</h2>
//             <div className="flex justify-between">
//               <button
//                 onClick={confirmEventCreation}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               >
//                 Oui
//               </button>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               >
//                 Non
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}
//       <AdminNavbar />
//       <div className="max-w-xl mt-20 mx-auto text-center xl:max-w-2xl">
//         <h2 className="text-3xl font-semibold leading-tight text-black sm:text-2xl xl:text-4xl mb-6">
//           Calendrier de passage <br />
//           <span className="text-purple-700">Session du "" a ""</span>
//         </h2>
//       </div>
//       <div className="calendar-container flex justify-center">
//         <div id="external-events" className="w-64 h-auto p-4 bg-purple-600 rounded-lg ml-7 mr-7 z-10">
//           <h3 className="text-white text-lg font-semibold mb-4">Projets déposés</h3>
//           {projects.map((project, index) => (
//             <div
//               key={index}
//               className="fc-event-main relative flex flex-col justify-between items-center w-full h-auto p-4 mb-4 bg-purple-500 shadow-lg rounded-lg cursor-pointer"
//               data-id={index}
//             >
//               <div className="flex flex-col items-center w-full">
//                 <p className="font-bold text-center text-white mb-2">{project.title}</p>
//                 <p className="text-center text-white">{project.nomPrenom}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div style={{ flexGrow: 1, zIndex: 1 }}>
          // <FullCalendar
          //   plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          //   initialView="timeGridDay"
          //   headerToolbar={{
          //     start: 'today prev,next',
          //     center: 'title',
          //     end: 'timeGridDay',
          //   }}
          //   locale={frLocale}
          //   editable={true}
          //   droppable={true}
          //   events={[]} // Initialize with an empty array, events will be added dynamically
          //   height="90vh"
          //   eventClick={handleEventClick}
          //   eventDidMount={(info) => {
          //     info.el.addEventListener('contextmenu', (e) => {
          //       handleEventRightClick({ jsEvent: e, event: info.event });
          //     });
          //   }}
          // />
//         </div>
//       </div>
//       {contextMenu.visible && (
//         <div
//           style={{
//             position: 'absolute',
//             top: contextMenu.y,
//             left: contextMenu.x,
//             backgroundColor: 'white',
//             border: '1px solid #ccc',
//             borderRadius: '4px',
//             zIndex: 1000,
//           }}
//         >
//           <button onClick={deleteEvent} className="p-2 w-full text-left">
//             Supprimer événement
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default Calendar;



