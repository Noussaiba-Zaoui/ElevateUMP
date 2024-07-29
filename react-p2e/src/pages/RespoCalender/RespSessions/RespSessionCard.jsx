

import React, { useState } from 'react';
import { Link } from "react-router-dom";



function RespSessionCard({ displayId, id, startDate, endDate, sessions, setSessions,currentSessionId }) {
  
  
   
    const isCurrentSession = id === currentSessionId;
    

   
   

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

                        <Link to={`/RespSessionDetails/${startDate}/${endDate}/${id}`}
                              className="mt-3 primary-btn inline-flex items-center text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 ease-in-out">
                            Voir détails
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>

                        
                    </div>
                </div>
            </div>

         
        </>
    );
}  

export default RespSessionCard;