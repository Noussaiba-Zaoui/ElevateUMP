import React, { useState } from 'react';
import projetDeposer from '../../../assets/projects/projets-deposes.png';
import projetConvoquer from '../../../assets/projects/projets-convoques.png';
import projetRetenue from '../../../assets/projects/projets-retenus.png';
import pv from '../../../assets/projects/pv.png';
import LuCalendarSearch  from "./calnd.png";
import '../../../styles/SessionDetails.css';
import { Link, useParams } from 'react-router-dom';
import RespCalNavbar from '../NavBars/RespCalNavbar';

const RespSessionDetails = () => {
    const { startDate, endDate, id } = useParams();
    const [notification, setNotification] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [showRoles, setShowRoles] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState([]);

    return (
        <>
            <RespCalNavbar startDate={startDate} endDate={endDate} home="RespHome" sessionId={id} />
            <div className="max-w-xl mt-20 mx-auto text-center xl:max-w-2xl">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-2xl xl:text-4xl mb-6 whitespace-nowrap">
                    Session du {startDate} au {endDate}
                </h2>
            </div>

            <div className="bg-white shadow-md ring-gray-900/5

             flex flex-wrap justify-center mt-10">

                <div className="w-64 h-80 relative flex flex-col justify-center overflow-hidden py-6 sm:py-12 card">
                    {/* First Card */}
                    <div className="group relative cursor-pointer overflow-hidden bg-white pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primary transition-all duration-300 group-hover:scale-[10]"></span>
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-secondary-300">
                                <img src={projetDeposer} alt="projetDepose" className="h-10 w-10 text-white transition-all" />
                            </span>
                            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                                <p className="text-black group-hover:text-white font-bold">Projets déposés</p>
                            </div>
                            <div className="pt-5 text-base font-semibold leading-7">
                                <p>
                                    <Link to={`/Respprojets-deposes/${startDate}/${endDate}/${id}/depose`} className="text-black transition-all duration-300 group-hover:text-white">Voir
                                    détails &rarr;</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Card */}
                <div className="w-64 h-80 relative flex flex-col justify-center overflow-hidden py-6 sm:py-12 card">
                    <div className="group relative cursor-pointer overflow-hidden bg-white pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primary transition-all duration-300 group-hover:scale-[10]"></span>
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-secondary-300">
                                <img src={projetConvoquer} alt="projetConvoque" className="h-10 w-10 text-white transition-all" />
                            </span>
                            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                                <p className="text-black group-hover:text-white font-bold">Projets Convoqués</p>
                            </div>
                            <div className="pt-5 text-base font-semibold leading-7">
                                <p>
                                    <Link to={`/Respprojets-convoques/${startDate}/${endDate}/${id}/convoque`} className="text-black transition-all duration-300 group-hover:text-white">Voir
                                    détails &rarr;</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Third Card */}
                <div className="w-64 h-80 relative flex flex-col justify-center overflow-hidden py-6 sm:py-12 card">
                    <div className="group relative cursor-pointer overflow-hidden bg-white pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primary transition-all duration-300 group-hover:scale-[10]"></span>
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-secondary-300">
                                <img src={projetRetenue} alt="projetRetenu" className="h-10 w-10 text-white transition-all" />
                            </span>
                            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                                <p className="text-black group-hover:text-white font-bold">Projets Retenus</p>
                            </div>
                            <div className="pt-5 text-base font-semibold leading-7">
                                <p>
                                    <Link to={`/Respprojets-retenus/${startDate}/${endDate}/${id}/retenu`} className="text-black transition-all duration-300 group-hover:text-white">Voir
                                    détails &rarr;</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fourth Card */}
                <div className="w-64 h-80 relative flex flex-col justify-center overflow-hidden py-6 sm:py-12 card">
                    <div className="group relative cursor-pointer overflow-hidden bg-white pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primary transition-all duration-300 group-hover:scale-[10]"></span>
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-secondary-300">
                                <img src={pv} alt="pv" className="h-10 w-10 text-white transition-all" />
                            </span>
                            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                                <p className="text-black group-hover:text-white font-bold">PV</p>
                            </div>
                            <div className="pt-5 text-base font-semibold leading-7">
                                <p>
                                    <a href="#" className="text-black transition-all duration-300 group-hover:text-white">Voir
                                    détails &rarr;</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fifth Card */}
                <div className="w-65 h-85 relative flex flex-col justify-center overflow-hidden py-6 sm:py-12 card">
                    <div className="group relative cursor-pointer overflow-hidden bg-white pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primary transition-all duration-300 group-hover:scale-[10]"></span>
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-secondary-300">
                                <img src={LuCalendarSearch} alt="pv" className="h-10 w-10 text-white transition-all" />
                            </span>
                            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                                <p className="text-black group-hover:text-white font-bold">Créer Calendrier de passages</p>
                            </div>
                            <div className="pt-5 text-base font-semibold leading-7">
                                <p>
                                    <Link to={`/Calender/${startDate}/${endDate}/${id}`} className="text-black transition-all duration-300 group-hover:text-white">Voir
                                    détails &rarr;</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sixth Card */}
                <div className="w-65 h-85 relative flex flex-col justify-center overflow-hidden py-6 sm:py-12 card ml-6">
                    <div className="group relative cursor-pointer overflow-hidden bg-white pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primary transition-all duration-300 group-hover:scale-[10]"></span>
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-secondary-300">
                                <img src={LuCalendarSearch} alt="pv" className="h-10 w-10 text-white transition-all" />
                            </span>
                            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                                <p className="text-black group-hover:text-white font-bold">Créer Calendrier d'entretiens</p>
                            </div>
                            <div className="pt-5 text-base font-semibold leading-7">
                                <p>
                                    <Link to={`/CalenderEntretien/${startDate}/${endDate}/${id}`} className="text-black transition-all duration-300 group-hover:text-white">Voir
                                    détails &rarr;</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RespSessionDetails;


