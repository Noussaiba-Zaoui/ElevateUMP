import React, { useEffect, useState } from 'react';
import HomeAdminNav from '../../layouts/Navbar/HomeAdminNav';
import SessionCard from './SessionCard';
import { IoMdAddCircle } from "react-icons/io";
import {IoAlertCircle, IoClose} from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import SessionService from '../../services/SessionService';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import './animations.css'


function GererSession() {
    const navigate = useNavigate();
    const initialNewSessionState = { dateDebut: null, dateFin: null };

    const [showPopup, setShowPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [newSession, setNewSession] = useState({ dateDebut: '', dateFin: '' });
    const [sessions, setSessions] = useState([]);
    const [currentSessionId, setCurrentSessionId] = useState(null);


    const handleStartDateChange = (date) => {
        setNewSession({ ...newSession, dateDebut: date });
    };
    const handleEndDateChange = (date) => {
        setNewSession({ ...newSession, dateFin: date });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSession({ ...newSession, [name]: value });
    };

    const addSession = (event) => {
        event.preventDefault();

        if (newSession.dateDebut && newSession.dateFin && newSession.dateFin <= newSession.dateDebut) {
            setErrorMessage("La date de fin doit être ultérieure à la date de début.");
            setShowErrorPopup(true);
            return;
        }

        SessionService.createSession(newSession)
            .then(response => {
                setSessions([...sessions, response]);
                setShowPopup(false);
                setNewSession(initialNewSessionState);
                window.location.reload()
            })
            .catch(error => {
                setErrorMessage(error.response.data);
                setShowErrorPopup(true);
                console.error('Error creating session: ', error);
            });
    };

    useEffect(() => {
        SessionService.getSessions().then(response => {
            console.log('Fetched sessions:', response);
            const formattedSessions = response.map(session => {
                let formattedStartDate = session.dateDebut;
                let formattedEndDate = session.dateFin;

                if (!isNaN(Date.parse(session.dateDebut))) {
                    const dateDebut = new Date(session.dateDebut);
                    formattedStartDate = `${dateDebut.getFullYear()}-${String(dateDebut.getMonth() + 1).padStart(2, '0')}-${String(dateDebut.getDate()).padStart(2, '0')}`;
                }

                if (!isNaN(Date.parse(session.dateFin))) {
                    const dateFin = new Date(session.dateFin);
                    formattedEndDate = `${dateFin.getFullYear()}-${String(dateFin.getMonth() + 1).padStart(2, '0')}-${String(dateFin.getDate()).padStart(2, '0')}`;
                }

                return {
                    ...session,
                    dateDebut: formattedStartDate,
                    dateFin: formattedEndDate,
                };
            });
            setSessions(formattedSessions);
        }).catch(error => {
            console.error('Error fetching sessions:', error);
        });
        SessionService.getCurrentSessionId().then(id => {
            setCurrentSessionId(id);
        }).catch(error => {
            console.error('Error fetching current session ID:', error);
        });
    }, []);

    return (
        <>
            <HomeAdminNav home={"homeAdmin"} />
            <div className="duration-300 flex flex-col items-center justify-center h-screen">
                <div className="max-w-xl mx-auto text-center xl:max-w-2xl mt-0">
                    <h2 className="text-3xl font-bold leading-tight text-dark sm:text-4xl xl:text-5xl mb-8">
                        Listes des sessions
                    </h2>
                </div>
                <div className="flex flex-wrap justify-center mt-8">
                    {sessions.map((session, index) => (
                        <SessionCard
                            key={index}
                            id={session.id_session}
                            displayId={index + 1}
                            session={session}
                            startDate={session.dateDebut}
                            endDate={session.dateFin}
                            sessions={sessions}
                            setSessions={setSessions}
                            setShowPopup={setShowPopup}
                            setNewSession={setNewSession}
                            currentSessionId={currentSessionId}

                        />
                    ))}
                    <div className="flex justify-center mt-4">
                        <IoMdAddCircle size={60} className="text-primary hover:text-black cursor-pointer" onClick={() => setShowPopup(true)} />
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-70 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-md shadow-md h-96 w-96 relative">
                        <div className="absolute top-0 left-0">
                            <IoClose size={30} className="text-primary hover:text-secondary-300 cursor-pointer" onClick={() => setShowPopup(false)} />
                        </div>
                        <h2 className="text-2xl font-bold mb-6 text-center">Créer une nouvelle session</h2>
                        <form onSubmit={addSession}>
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
                                <button type="submit" className="primary-btn font-bold">Ajouter la session</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showErrorPopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-70 flex justify-center items-center animate-fadeIn">
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

export default GererSession;