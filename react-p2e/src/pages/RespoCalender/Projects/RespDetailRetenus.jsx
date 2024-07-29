import React, { useState } from 'react';

import projetRetenue from '../../../assets/projects/projets-retenus.png'

import '../../../styles/SessionDetails.css'
import DetailsProjets from '../../../services/DetailsProjets';
import { useEffect } from 'react';
import RespCalNavbar from '../NavBars/RespCalNavbar';
import { useParams } from 'react-router-dom';
const RespDetailRetenus = () => {
  const { title,id,startDate,endDate } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);


  

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  const fetchProjectDetails = async () => {
    try {
      const response = await DetailsProjets.GetDetailsByTitle(title);
      setProjectDetails(response.data);
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };


  return (
 <>
   
   <RespCalNavbar  stratDate={startDate} endDate={endDate} sessionId={id}/>
    <div className="max-w-xl mt-20 mx-auto text-center xl:max-w-2xl">
    <h2 className="text-3xl font-bold leading-tight text-black  sm:text-2xl xl:text-4xl mb-6">
          Détails du projet "{title}"
          </h2>
 
    </div>

    <div className="bg-white  shadow-md ring-gray-900/5 flex flex-wrap justify-center mt-10">
    {projectDetails && (
          <div className="w-120 h-120 relative flex flex-col justify-center overflow-hidden py-10 sm:py-30 cardDetail">
            <div className="group relative cursor-pointer overflow-hidden bg-white pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-sm2 sm:rounded-lg sm:px-35">
            <span
                  className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primary"></span>
              <div className="relative z-10 mx-auto max-w-md">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-primary">
                <img src={projetRetenue} alt="projetRetenue" className="h-10 w-10 text-white"/>
                </span>
                <div className="space-y-6 pt-5 text-base leading-7 text-gray-600">
                  <p><strong>Intitulé du Projet:</strong> {projectDetails.intituleProjet}</p>
                  <p><strong>Email:</strong> {projectDetails.email}</p>
                  <p><strong>Idee Entreprise:</strong> {projectDetails.ideeEntreprise}</p>
                  <p><strong>Nom et Prénom:</strong> {projectDetails.nomPrenom}</p>
                  <p><strong>Ville d'Origine:</strong> {projectDetails.villeOrigine}</p>
                  <p><strong>Téléphone Portable:</strong> {projectDetails.telephonePortable}</p>
                  <p><strong>Diplôme:</strong> {projectDetails.diplome}</p>
                  <p><strong>Membres:</strong> {projectDetails.members}</p>
                  <p><strong>Domaine du Projet:</strong> {projectDetails.domaineProjetEntreprise}</p>
                  <p><strong>Motivations:</strong> {projectDetails.motivations}</p>
                  <p><strong>Développez Votre Idée:</strong> {projectDetails.developpezVotreIdee}</p>
                  <p><strong>Innovation Technologique:</strong> {projectDetails.innovationTechnologique}</p>
                  <p><strong>Viabilité et Durabilité du Projet:</strong> {projectDetails.viabiliteDurableteProjet}</p>
                  <p><strong>Originalité:</strong> {projectDetails.originalite}</p>
                  <p><strong>Impact Economique:</strong> {projectDetails.impactEconomique}</p>
                  <p><strong>Responsabilités Sociales et Environnementales:</strong> {projectDetails.responsabilitesSocialesEnvironnementales}</p>
                  <p><strong>Pérennité et Potentiel de Développement:</strong> {projectDetails.perennitePotentielDeveloppement}</p>
                  <p><strong>Etablissement:</strong> {projectDetails.etablissement}</p>
                  <p><strong>Filière:</strong> {projectDetails.filiere}</p>
                  <div className="space-y-6 pt-5 text-base leading-7 text-gray-600">
                  <strong>Cartes Etudiants :</strong>
                    {/* Afficher les cartes étudiants comme des images si elles sont définies */}
                    {projectDetails.scanCarteEtudiant && projectDetails.scanCarteEtudiant.map((carte, index) => (
                      <img key={index} src={`http://localhost:8080/api/v1/project/${carte}`}   className="w-50 h-50" />
                    ))}
                  </div>
                </div>


               
                  
                </div>
              </div>
            </div>
         
        )}


</div>
   
 
  </> 
  );
}

export default RespDetailRetenus;