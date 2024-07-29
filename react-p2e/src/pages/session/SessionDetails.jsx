
import React, { useState } from 'react';
import AdminNavbar from '../../layouts/Navbar/AdminNavbar';
import projetDeposer from '../../assets/projects/projets-deposes.png'
import projetConvoquer from '../../assets/projects/projets-convoques.png'
import projetRetenue from '../../assets/projects/projets-retenus.png'
import pv from '../../assets/projects/pv.png'
import '../../styles/SessionDetails.css'
import SessionService from '../../services/SessionService';

import { Link,useParams } from 'react-router-dom';
const SessionDetails = () => {
    const [notification, setNotification] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [showRoles, setShowRoles] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const { startDate, endDate,id } = useParams();

    const handleNotificationChange = (event) => {
        console.log('handleNotificationChange', event.target.value); // Add this
        setNotification(event.target.value);
    };

    const handleNotificationSubmit = (event) => {
        event.preventDefault();
        setShowRoles(true);
    };

    const handleRoleChange = (event) => {
        const roleName = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedRoles([...selectedRoles, roleName]);
        } else {
            setSelectedRoles(selectedRoles.filter(role => role !== roleName));
        }
    };

    const handleSendNotification = () => {
        console.log("Message:", notification); // Ajoutez ceci pour vérifier le message
        console.log("Roles:", selectedRoles);  // Ajoutez ceci pour vérifier les rôles
        console.log('handleSendNotification', notification);

        SessionService.sendNotification(notification, selectedRoles)
            .then(() => {
                setShowRoles(false);
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


    return (
        <>
            <AdminNavbar startDate={startDate} endDate={endDate} home={"homeAdmin"} sessionId={id}/>
            <div className="max-w-xl mt-20 mx-auto text-center xl:max-w-2xl">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-2xl xl:text-4xl mb-6 whitespace-nowrap">
                    Session du {startDate} au {endDate}
                </h2>

                <div className="bg-white p-8 rounded-md shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-primary">
                        Notification
                    </h3>
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
                            <button className="bg-black text-white font-bold py-2 px-4 rounded-md">Envoyer la notification</button>
                        </div>
                    </form>
                </div>

                    {showRoles && (
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Choisissez les rôles :</label>
                            <div className="flex flex-col ">
                                {/* Exemple de labels de rôles plus explicites */}
                                <label><input type="checkbox" value="RESPCALENDER" onChange={handleRoleChange}/> Responsable de Calendrier </label>
                                <label><input type="checkbox" value="COMMISSION" onChange={handleRoleChange}/>Membre de
                                    la commission</label>
                                <label><input type="checkbox" value="PARTICIPANT" onChange={handleRoleChange}/>Participant
                                </label>
                                <label><input type="checkbox" value="CONDIDAT" onChange={handleRoleChange}/>Candidat
                                </label>

                            </div>
                            <button onClick={handleSendNotification}
                                    className="bg-black text-white font-bold py-2 px-4 rounded-md mt-4">Confirmer et envoyer la notification</button>
                        </div>
                    )}
                </div>




<div className="bg-white  shadow-md ring-gray-900/5 flex flex-wrap justify-center mt-10">
                      <div className="w-64 h-80 relative flex flex-col justify-center overflow-hidden py-6 sm:py-12 card">

                          {/* First Card */}
                          <div
                              className="group relative cursor-pointer overflow-hidden bg-white pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                      <span
                          className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primary transition-all duration-300 group-hover:scale-[10]"></span>
                      <div className="relative z-10 mx-auto max-w-md">
                <span
                    className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-secondary-300">
                  <img src={projetDeposer} alt="projetDepose" className="h-10 w-10 text-white transition-all"/>
                </span>
                        <div
                            className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                          <p className="text-black group-hover:text-white font-bold">Projets deposés</p>
                        </div>
                        <div className="pt-5 text-base font-semibold leading-7">
                          <p>
                          <Link to={`/projets-deposes/${startDate}/${endDate}/${id}/depose`} className="text-black transition-all duration-300 group-hover:text-white">Voir
                              details &rarr;</Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Second Card */}
                  <div className="w-64 h-80 relative flex flex-col justify-center overflow-hidden py-6 sm:py-12 card">
                    <div
                        className="group relative cursor-pointer overflow-hidden bg-white pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                      <span
                          className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primary transition-all duration-300 group-hover:scale-[10]"></span>
                      <div className="relative z-10 mx-auto max-w-md">
                <span
                    className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-secondary-300">
                  <img src={projetConvoquer} alt="yourImageAlt" className="h-10 w-10 text-white transition-all"/>
                </span>
                        <div
                            className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                          <p className="text-black group-hover:text-white font-bold">Projet Convoqués</p>
                        </div>
                        <div className="pt-5 text-base font-semibold leading-7">
                          <p>
                          <Link to={`/projets-convoques/${startDate}/${endDate}/${id}/convoque`} className="text-black transition-all duration-300 group-hover:text-white">Voir
                              details &rarr;</Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Third Card */}
                  <div className="w-64 h-80 relative flex flex-col justify-center overflow-hidden py-6 sm:py-12 card">
                    <div
                        className="group relative cursor-pointer overflow-hidden bg-white pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                      <span
                          className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primary transition-all duration-300 group-hover:scale-[10]"></span>
                      <div className="relative z-10 mx-auto max-w-md">
                <span
                    className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-secondary-300">
                  <img src={projetRetenue} alt="yourImageAlt" className="h-10 w-10 text-white transition-all"/>
                </span>
                        <div
                            className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                          <p className="text-black group-hover:text-white font-bold">Projet Retenue</p>
                        </div>
                        <div className="pt-5 text-base font-semibold leading-7">
                          <p>
                          <Link to={`/projets-retenus/${startDate}/${endDate}/${id}/retenu`} className="text-black transition-all duration-300 group-hover:text-white">Voir
                              details &rarr;</Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fourth Card */}
                  <div className="w-64 h-80 relative flex flex-col justify-center overflow-hidden py-6 sm:py-12 card">
                    <div
                        className="group relative cursor-pointer overflow-hidden bg-white pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                      <span
                          className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primary transition-all duration-300 group-hover:scale-[10]"></span>
                      <div className="relative z-10 mx-auto max-w-md">
                <span
                    className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-secondary-300">
                  <img src={pv} alt="yourImageAlt" className="h-10 w-10 text-white transition-all"/>
                </span>
                        <div
                            className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                          <p className="text-black group-hover:text-white font-bold">PV</p>
                        </div>
                        <div className="pt-5 text-base font-semibold leading-7">
                          <p>
                            <a href="#" className="text-black transition-all duration-300 group-hover:text-white">Voir
                              details &rarr;</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


      </>
  );
}

export default SessionDetails;



