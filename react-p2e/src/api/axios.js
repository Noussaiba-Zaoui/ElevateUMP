
// import axios from 'axios';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import LogoutButton from '../layouts/LogoutBtn';



// const api =axios.create({
//   baseURL: "http://localhost:8080",
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });


// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 403) {
//       // Show popup for session expiration
//       showSessionExpiredPopup();
//     }
//     return Promise.reject(error);
//   }
// );

// function showSessionExpiredPopup() {
//   const popup = (
    
  
//     <div className="popup-overlay fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
//     <div className="bg-white p-8 rounded-md shadow-md h-70 w-96 relative flex flex-col justify-center items-center">
//         <h2 className="text-2xl font-bold mb-6 text-center">Votre session a expiré</h2>
//         <LogoutButton />
//     </div>
// </div>
//   );
//   ReactDOM.render(popup, document.getElementById('popup-root'));
// }





// export default api;



import axios from 'axios';
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import LogoutButton from '../layouts/LogoutBtn';

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    'Content-Type': 'application/json',
  },
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 403) {
//       // Show popup for session expiration
//       showSessionExpiredPopup();
//     }
//     return Promise.reject(error);
//   }
// );

// let popupRoot;

// export function showSessionExpiredPopup() {
//   const popup = (
//     <Router>
//       <div className="popup-overlay fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
//         <div className="bg-white p-8 rounded-md shadow-md h-70 w-96 relative flex flex-col justify-center items-center">
//           <h2 className="text-2xl font-bold mb-6 text-center">Votre session a expiré</h2>
//           <LogoutButton />
//         </div>
//       </div>
//     </Router>
//   );

//   const container = document.getElementById('popup-root');

//   if (!popupRoot) {
//     popupRoot = createRoot(container);
//   }

//   popupRoot.render(popup);
// }

export default api;

