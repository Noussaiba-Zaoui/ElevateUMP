import React, {useEffect, useState} from 'react';
import HomeAdminNav from '../../../layouts/Navbar/HomeAdminNav';
import CardSession from './CardSession';

import SessionService from '../../../services/SessionService';
import "react-datepicker/dist/react-datepicker.css";



function VoirSessions() {


    const [showPopup, setShowPopup] = useState(false);
    const [newSession, setNewSession] = useState({ dateDebut: '', dateFin: '' });
    const [sessions, setSessions] = useState([]);







    useEffect(() => {
        SessionService.getSessions().then(response => {
            console.log(response);
            const formattedSessions = response.map(session => {
                let formattedStartDate = session.dateDebut;
                let formattedEndDate = session.dateFin;

                // Vérifiez si la date peut être analysée par l'objet Date
                if (!isNaN(Date.parse(session.dateDebut))) {
                    const dateDebut = new Date(session.dateDebut);
                    formattedStartDate = `${dateDebut.getFullYear()}-${String(dateDebut.getMonth() + 1).padStart(2, '0')}-${String(dateDebut.getDate()).padStart(2, '0')}`;
                }

                if (!isNaN(Date.parse(session.dateFin))) {
                    const dateFin = new Date(session.dateFin);
                    formattedEndDate = `${dateFin.getFullYear()}-${String(dateFin.getMonth() + 1).padStart(2, '0')}-${String(dateFin.getDate()).padStart(2, '0')}`;
                }

                return { ...session, dateDebut: formattedStartDate, dateFin: formattedEndDate };
            });

            setSessions(formattedSessions); // Change this line
            console.log('Sessions fetched: ', formattedSessions);
        })
            .catch(error => {
                console.error('Error fetching sessions: ', error);
            });
    }, []);
    return (
        <>
            <HomeAdminNav  home="commissionHome"/>
            <div
                className=" duration-300 flex flex-col items-center justify-center h-screen">
                <div className="max-w-xl mx-auto text-center xl:max-w-2xl">
                    <h2 className="text-3xl font-bold leading-tight  sm:text-4xl xl:text-5xl mb-6">
                        Listes des sessions
                    </h2>
                </div>
                <div className="flex flex-wrap justify-center mt-10">
                    {sessions.map((session,index) => (
                        <CardSession
                            key={index}
                            id={session.id_session}
                            displayId={index + 1}
                            session={session}
                            startDate={session.dateDebut}
                            endDate={session.dateFin}
                            sessions={sessions}


                        />
                    ))}

                </div>
            </div>



        </>
    );
}

export default VoirSessions;