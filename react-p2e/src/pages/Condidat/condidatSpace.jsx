


import React, { useState, useEffect } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../services/tokenService';
import '../../styles/candidatSpace.css'; // Import the CSS file for styling
import NavbarCondidat from '../../components/Navbar/NavbarCondidat';

import CondidatService from '../../services/condidatService';

const CandidatSpace = () => {
  const { id } = useParams();

  const [convocationDetails, setConvocationDetails] = useState(null);
  const [status, setStatus] = useState(null);
  const [messageToSend, setMessageToSend] = useState('');
  const [notification, setNotification] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [hasResponded, setHasResponded] = useState(false); // New state to track if the user has responded

  const handleNotificationChange = (event) => {
      console.log('handleNotificationChange', event.target.value); // Add this
      setNotification(event.target.value);
  };

  const handleNotificationSubmit = (event) => {
      event.preventDefault();
      
  };

 
  const handleSendNotification = () => {
      console.log("Message:", notification); // Ajoutez ceci pour vérifier le message
     
      console.log('handleSendNotification', notification);
      const condidatService = new CondidatService();
      condidatService.sendNotification(notification,id)
          .then(() => {
             
              setShowNotification(true);
              setNotification(''); // Clear the message field

          })
          .catch(error => {
              console.error('Erreur lors de l\'envoi de la notification :', error);
              if (error.response && error.response.data) {
                  console.log('Contenu de la réponse d\'erreur :', error.response.data);
              } else {
                  console.log('Erreur de réponse non traitée.');
              }
          });
  };



  const navigate = useNavigate();
  useEffect(() => {
    const fetchConvocationDetails = async () => {
      try {
        const token = getToken();
        const response = await axios.get(`http://localhost:8080/api/v1/project/convoquation/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setConvocationDetails(response.data);
        setStatus(response.data.status);
        console.log("start day:"+response.data.startDate);
        console.log("end day"+response.data.endDate);
        console.log(convocationDetails)
      } catch (error) {
        console.error('Error fetching convocation details:', error);
      }
    };

    fetchConvocationDetails();
  }, [id]);

  const handleConfirm = async () => {
    try {
      const token = getToken();
      const res = await axios.post(`http://localhost:8080/api/v1/project/confirm/${id}`,  {} , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setStatus(res.data.status);
      console.log(status)
      setHasResponded(true);
      navigate('/condidatHome');
    } catch (error) {
      console.error('Error sending response:', error);
    }
  };

  const handleReject = async () => {
    try {
      const token = getToken();
      const res = await axios.post(`http://localhost:8080/api/v1/project/reject/${id}`,  {} , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setStatus(res.data.status);
      setHasResponded(true);
      navigate('/condidatHome');
    } catch (error) {
      console.error('Error sending response:', error);
    }
  };

  const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length !== 5) return { dateString: 'N/A', timeString: 'N/A' };
    const [year, month, day, hour, minute] = dateArray;
    const date = new Date(year, month - 1, day, hour, minute);
    return {
      dateString: date.toLocaleDateString('fr-FR'),
      timeString: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const startDate =convocationDetails ? formatDate(convocationDetails.startDate):{};
  const endDate = convocationDetails ?formatDate(convocationDetails.endDate):{};



return (
    <>
    <NavbarCondidat/>
    <div className="max-w-xl  mx-auto text-center xl:max-w-2xl flex h-screen justify-center items-center ">
                

                <div className="bg-white p-8 rounded-md shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-primary">
                        Avez vous une remarque , question concernant la convoquation?
                    </h3>
                    <h5>Envoyer vos question au responsable de calendrier</h5>
                    {showNotification && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Notification envoyée !</strong>
                            <span className="block sm:inline">Votre notification a été bien envoyée par e-mail !</span>
                            {/* Bouton pour fermer la notification */}
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg onClick={() => setShowNotification(false)} className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <title>Close</title>
                                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.15a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.696z" />
                                </svg>
                            </span>
                        </div>
                    )}
                    <form onSubmit={handleNotificationSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Tapez votre message :</label>
                            <textarea className="w-full p-2 border border-gray-300 rounded-md" value={notification} onChange={handleNotificationChange}></textarea>
                        </div>
                        <div className="text-center">
                        <button onClick={handleSendNotification} className="bg-black text-white font-bold py-2 px-4 rounded-md mt-4">Envoyer la notification</button>
                        </div>
                    </form>
                </div>

                    
                </div>
            {/* <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="max-w-md p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Convocation Details</h2>
        {convocationDetails?.startDate == null ?(

         <p className="text-gray-500">
            La convocation n'est pas encore envoyée, nous allons vous informer par mail une fois qu'elle sera prête.
          </p>
        ):(
          <>
            <div className="details">
              {startDate.dateString !== 'N/A' || endDate.timeString !== 'N/A' ? (
                <>
             
                    <p>
                    <strong>Date de l'entretien :</strong> le {startDate.dateString} de {startDate.timeString} à {endDate.timeString}
                    </p>
                    <div className="project-details">
                        <p><strong>Intitulé du projet :</strong> {convocationDetails?.intituleProjet || 'N/A'}</p>
                        <p><strong>Porteur du projet :</strong> {convocationDetails?.nomPrenom || 'N/A'}</p>
                    </div>
                </>
              ) : (
                <p className="text-gray-500">Détails de la convocation indisponibles.</p>
              )}
            </div>
            
            {status === 'PENDING' ? (
                <div className="response-section">
                  <p className="text-lg">Serez-vous présent?</p>
                  <button className="btn confirm-btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleConfirm}>Oui</button>
                  <button className="btn reject-btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleReject}>Non</button>
                </div>
              ) : (
                <p className="text-gray-500">Vous avez déjà fourni une réponse à la convocation.</p>
              )}
           

          </>
        ) }
      </div>
            </div> */}

<div className="flex h-screen justify-center items-center bg-gray-100">
        <div className="max-w-md p-4 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Details de la Convocation</h2>
          {convocationDetails?.startDate == null ? (
            <p className="text-gray-500">
              La convocation n'est pas encore envoyée, nous allons vous informer par mail une fois qu'elle sera prête.
            </p>
          ) : (
            <>
              <div className="details">
                {endDate.timeString !== 'N/A' ? (
                  <>
                    <p>
                      <strong>Date de l'entretien :</strong> le {startDate.dateString} de {startDate.timeString} à {endDate.timeString}
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Date de l'entretien :</strong> le {startDate.dateString} à {startDate.timeString}
                    </p>
                  </>
                )}
                <div className="project-details">
                  <p><strong>Intitulé du projet :</strong> {convocationDetails?.intituleProjet || 'N/A'}</p>
                  <p><strong>Porteur du projet :</strong> {convocationDetails?.nomPrenom || 'N/A'}</p>
                </div>
              </div>
              {status === 'PENDING' ? (
                <div className="response-section">
                  <p className="text-lg">Serez-vous présent?</p>
                  <button className="btn confirm-btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleConfirm}>Oui</button>
                  <button className="btn reject-btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleReject}>Non</button>
                </div>
              ) : (
                <p className="text-gray-500">Vous avez déjà fourni une réponse à la convocation.</p>
              )}
            </>
          )}
        </div>
      </div>
    
    </>
    
  );

};

export default CandidatSpace;







   


  
        
           





