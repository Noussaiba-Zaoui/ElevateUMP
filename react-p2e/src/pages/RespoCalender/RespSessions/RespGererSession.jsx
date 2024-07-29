import React, { useEffect, useState } from 'react';
import HomeAdminNav from '../../../layouts/Navbar/HomeAdminNav';
import RespSessionCard from './RespSessionCard';
import { IoMdAddCircle } from "react-icons/io";
import {IoAlertCircle, IoClose} from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import SessionService from '../../../services/SessionService';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import './animations.css'

function RespGererSession() {
    const navigate = useNavigate();
    const initialNewSessionState = { dateDebut: null, dateFin: null };

    const [showPopup, setShowPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [newSession, setNewSession] = useState({ dateDebut: '', dateFin: '' });
    const [sessions, setSessions] = useState([]);
    const [currentSessionId, setCurrentSessionId] = useState(null);
    
    

   

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
            <HomeAdminNav  home="RespHome"/>
            <div className="duration-300 flex flex-col items-center justify-center h-screen">
                <div className="max-w-xl mx-auto text-center xl:max-w-2xl mt-0">
                    <h2 className="text-3xl font-bold leading-tight text-dark sm:text-4xl xl:text-5xl mb-8">
                        Listes les sessions
                    </h2>
                </div>
                <div className="flex flex-wrap justify-center mt-8">
                    {sessions.map((session, index) => (
                        <RespSessionCard
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
                   
                </div>
            </div>
           

        </>
    );
}

export default RespGererSession;
