import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../../layouts/Navbar/AdminNavbar';
import projetDeposer from '../../../assets/projects/projets-deposes.png';
import '../../../styles/SessionDetails.css';
import DetailsProjets from '../../../services/DetailsProjets';
import { Link, useParams } from 'react-router-dom';
import CommissionNavbar from '../CommissionNavBar';
const CommProjetDeposes = () => {
  const { startDate, endDate ,id} = useParams(); // Récupère les paramètres de l'URL
  const [projectTitles, setProjectTitles] = useState([]);

  useEffect(() => {
    fetchProjectTitles(startDate, endDate); // Passe les dates à la fonction
  }, [startDate, endDate]);

  const fetchProjectTitles = async (start, end) => {
    try {
      const response = await DetailsProjets.getProjectTitlesByDateAndState(start, end, 'DEPOSE');
      setProjectTitles(response);
    } catch (error) {
      console.error('Error fetching project titles:', error);
    }
  };

  return (
    <>
     <CommissionNavbar  startDate={startDate} endDate={endDate}  sessionId={id}/>
      <div className="max-w-xl mt-20 mx-auto text-center xl:max-w-2xl">
        <h2 className="text-3xl font-semibold leading-tight text-black sm:text-2xl xl:text-4xl mb-6">
          Visualisation des projets déposés
        </h2>
      </div>

      <div className="bg-white shadow-md ring-gray-900/5 flex flex-wrap justify-center mt-10">
        {projectTitles.map((title, index) => (
          <div key={index} className="w-64 h-80 relative flex flex-col justify-center overflow-hidden py-6 sm:py-12 card">
            <div
              className="group relative cursor-pointer overflow-hidden bg-white pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
              <span
                className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primary transition-all duration-300 group-hover:scale-[10]"></span>
              <div className="relative z-10 mx-auto max-w-md">
                <span
                  className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-secondary-300">
                  <img src={projetDeposer} alt="projetDepose" className="h-10 w-10 text-white transition-all" />
                </span>
                <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                  <p className="text-black group-hover:text-white font-bold">{title}</p>
                </div>
                <div className="pt-5 text-base font-semibold leading-7">
                  <p>
                  <Link to={`/Commdetails-deposes/${startDate}/${endDate}/${title}/${id}`} className="text-black transition-all duration-300 group-hover:text-white">Ouvrir &rarr;</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CommProjetDeposes;
