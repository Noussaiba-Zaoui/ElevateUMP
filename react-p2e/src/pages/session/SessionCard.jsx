

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import SessionService from '../../services/SessionService';
import {IoAlertCircle, IoClose} from "react-icons/io5";
import DatePicker from "react-datepicker";

function SessionCard({ displayId, id, startDate, endDate, sessions, setSessions,currentSessionId }) {
    const [endingDate, setEndingDate] = useState(endDate);
    const [isEditing, setIsEditing] = useState(false);
    const [newSession, setNewSession] = useState({ dateDebut: startDate, dateFin: endDate });
    const [showPopupModif, setShowPopupModif] = useState(false);
    const isCurrentSession = id === currentSessionId;
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);




    const deleteSession = () => {
        SessionService.deleteSession(id)
            .then(() => {
                const updatedSessions = sessions.filter((session) => session.id_session !== id);
                setSessions(updatedSessions);
            })
            .catch(error => {
                console.error('Error deleting session: ', error);
            });
    };

    const updateSession = (event) => {
        event.preventDefault();

        if (newSession.dateDebut && newSession.dateFin && newSession.dateFin <= newSession.dateDebut) {
            setErrorMessage("La date de fin doit être ultérieure à la date de début!");
            setShowErrorPopup(true);
            return;
        }

        SessionService.updateSession(id, newSession)
            .then(response => {
                const updatedSessions = sessions.map(session =>
                    session.id_session === id ? response : session
                );
                setSessions(updatedSessions);
                setIsEditing(false);
                setShowPopupModif(false);
            })
            .catch(error => {
                setErrorMessage(error.response.data);
                setShowErrorPopup(true);
                console.error('Error updating session: ', error);
            });
    };


    const handleStartDateChange = (date) => {
        setNewSession({ ...newSession, dateDebut: date });
    };
    const handleEndDateChange = (date) => {
        setNewSession({ ...newSession, dateFin: date });
    };

    return (
        <>
            <div data-aos="zoom-in" className="p-4 session-card">
                <div className={`flex rounded-lg h-full  text-gray-800 p-8 flex-col border shadow-2xl rounded-lg ${isCurrentSession ? ' bg-green-200' : 'bg-white'}`}>
                    <div className="flex items-center mb-3">
                        <h2 className="text-primary text-lg font-bold">Session {displayId}</h2>
                    </div>
                    <div className="flex flex-col justify-between flex-grow">
                        <p className="leading-relaxed text-base text-black font-medium">
                            <span className="font-bold italic">Date de début:</span>
                            <span className="text-gray-800 ml-2">{startDate}</span>
                            <br />
                            <span className="font-bold italic">Date de fin:</span>
                            <span className="text-gray-800 ml-2">{endDate}</span>
                        </p>

                        <Link to={`/SessionDetails/${startDate}/${endDate}/${id}`}
                              className="mt-3 primary-btn inline-flex items-center text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 ease-in-out">
                            Voir détails
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>

                        <div className="flex justify-center flex-row">
                            <Link
                                onClick={() => setShowPopupModif(true)}
                                className="mt-3 mr-4 border-primary border inline-flex text-sm items-center text-primary font-medium py-2 px-4 rounded-md transition-colors duration-300 ease-in-out w-full"
                                style={{ color: 'primary', borderColor: 'primary' }}
                            >
                                <span className="flex-grow text-center">Modifier</span>
                            </Link>

                            <Link onClick={deleteSession} className="mt-3 border-primary border inline-flex text-sm items-center text-primary font-medium py-2 px-4 rounded-md transition-colors duration-300 ease-in-out w-full" style={{ color: 'primary', borderColor: 'primary' }}>
                                <span className="flex-grow text-center">Supprimer</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {showPopupModif && (
                <div className="fixed bg-overlay flex justify-center items-center">
                    <div className="bg-white p-8 rounded-md shadow-md h-96 w-96 relative">
                        <div className="absolute top-0 left-0">
                            <IoClose size={30} className="text-primary hover:text-secondary-300 cursor-pointer"
                                     onClick={() => setShowPopupModif(false)}/>
                        </div>
                        <h2 className="text-2xl font-bold mb-6 text-center">Modifier le champs désiré</h2>
                        <form onSubmit={updateSession}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Date de Début:</label>
                                <DatePicker
                                    selected={newSession.dateDebut}
                                    onChange={handleStartDateChange}
                                    dateFormat="yyyy-MM-dd"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Date de fin:</label>
                                <DatePicker
                                    selected={newSession.dateFin}
                                    onChange={handleEndDateChange}
                                    dateFormat="yyyy-MM-dd"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="primary-btn font-bold">Modifier la session</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showErrorPopup && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-70 flex justify-center items-center animate-fadeIn">
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-8 rounded-md shadow-lg relative max-w-lg mx-auto animate-slideIn">
                        <div className="absolute top-0 right-0 mt-4 mr-4">
                            <IoClose size={30} className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => setShowErrorPopup(false)} />
                        </div>
                        <div className="flex items-center mb-6">
                            <IoAlertCircle size={40} className="text-red-500 mr-3"/>
                            <h2 className="text-2xl font-bold">Erreur</h2>
                        </div>
                        <p className="text-center mb-6">{errorMessage}</p>
                        <div className="text-center mt-4">
                            <button onClick={() => setShowErrorPopup(false)} className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-300">Fermer</button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}

export default SessionCard;