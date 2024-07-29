import React, { useState, useEffect } from 'react';
import axios from "axios";
import { isExpired,useJwt } from "react-jwt";
import { Link } from 'react-router-dom'; 
import Headline from '../common/Headline';
import WidgetWrapper from '../common/WidgetWrapper';
import GetSessionStatus from '../../services/GetSessionStatus';
import EspaceProject from '../../services/EspaceProject';
import { getToken } from '../../services/tokenService';
import LogoutButton from '../../layouts/LogoutBtn';

const Pricing = ({ header,header2, id, hasBackground = false }) => {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [sessionOpen, setSessionOpen] = useState();
  const [projects, setProjects] = useState([]);
  const [projectTitles, setProjectTitles] = useState([]);
  const [deleteConfirmationTitle, setDeleteConfirmationTitle] = useState('');
  const [updateConfirmationTitle, setUpdateConfirmationTitle] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [showNoProjectSelectedAlert, setShowNoProjectSelectedAlert] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [deposerSuccess, setDeposerSuccess] = useState(false);
  const [deposerError, setDeposerError] = useState(false);
  const token = getToken();
  const { decodedToken } = useJwt(token);




  useEffect(() => {
    const getSessionStatus = async () => {
      try {
        const response = await GetSessionStatus.getSessionStatus();
        setSessionOpen(response.data);
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };

    getSessionStatus();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
        try {
            if (decodedToken && decodedToken.sub) {
                const response = await EspaceProject.GetProjectsCree(decodedToken.sub);
                setProjects(response.data);
            } else {
                console.error('Error fetching projects: Decoded token or sub is null');
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    fetchProjects();
}, [decodedToken]); // Ajoutez decodedToken comme dépendance du useEffect


useEffect(() => {
  const fetchProjectTitles = async () => {
      try {
          if (decodedToken && decodedToken.sub) {
              const response = await EspaceProject.GetTitles(decodedToken.sub);
              setProjectTitles(response.data);
          } else {
              console.error('Error fetching project titles: Decoded token or sub is null');
          }
      } catch (error) {
          console.error('Error fetching project titles:', error);
      }
  };

  fetchProjectTitles();
}, [decodedToken]);


  const handleProjectSelection = (index) => {
    const updatedProjects = [...projects];
    updatedProjects[index].isSelected = !updatedProjects[index].isSelected;
  
    const selectedProjectTitles = updatedProjects
      .filter(project => project.isSelected)
      .map((project, index) => projectTitles[index]);
  
    setSelectedProjects(selectedProjectTitles);
  };
  
  const confirmDelete = (title) => {
    setDeleteConfirmationTitle(title);
  };
  
  const confirmUpdate = (title) => {
    setUpdateConfirmationTitle(title);
  };
  
  const deleteProject = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/project/id?title=${deleteConfirmationTitle}`);
      const projectId = response.data;
  
      await EspaceProject.deleteProject(projectId);
      setDeleteSuccess(true);
      
      setProjects(projects.filter(project => project.id !== projectId));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting project:', error);
      setDeleteError(true);
    }
  };
  
  const UpdateProject = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/project/id?title=${updateConfirmationTitle}`);
      const projectId = response.data;
  
      const redirectUrl = EspaceProject.UpdateProject2(projectId);
  
      window.location.href = redirectUrl;
    } catch (error) {
      console.error('Error Updating project:', error);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmationTitle('');
  };
  
  const cancelUpdate = () => {
    setDeleteConfirmationTitle('');
  };

  const deposerProject = async () => {
    if (selectedProjects.length === 0) {
      setShowNoProjectSelectedAlert(true);
    } else {

         try {
           // Envoyer une requête POST avec le token décodé
           await EspaceProject.addRoleToUser(decodedToken.sub, 'CONDIDAT');
          setConfirmationModal(true); // Trigger deposit confirmation
        } catch (error) {
          console.error('Error adding role:', error);
        }
    }
  };

  const confirmDeposerProject = async () => {
    const projectIds = [];
  
    for (const title of selectedProjects) {
      try {
        const token = getToken()
        const response = await axios.get(`http://localhost:8080/api/v1/project/id?title=${title}`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        projectIds.push(response.data);
      } catch (error) {
        console.error(`Error fetching project ID for ${title}:`, error);
        setConfirmationModal(false);
        setDeposerError(true);
        return;
      }
    }
  
    try {
      for (const projectId of projectIds) {
        await EspaceProject.DeposerProject(projectId);
          // Fetch project details
          /*
          const projectDetails = await axios.get(`http://localhost:8080/api/v1/project/id/${projectId}`);
          const userEmail = projectDetails.data; 
   // on fait il existe un problem sur le condidat il me dit que ce role n'existe pas plus je doit assurer que le front aussi ça marche
          // Update user role
          await EspaceProject.UpdateUserRole(userEmail, 'CONDIDAT');*/
      }
   
    
      setConfirmationModal(false);
      setDeposerSuccess(true);

    
      window.location.reload(); // Recharge la page après le dépôt avec succès
    } catch (error) {
      console.error('Error depositing projects:', error);
      setConfirmationModal(false);
      setDeposerError(true);
    }
  };

  const cancelDeposerProject = () => {
    setConfirmationModal(false);
  };
  
  const cancelNoProjectAlert = () => {
    setShowNoProjectSelectedAlert(false);
  };

  return (
<>


<WidgetWrapper id={id ? id : ''} hasBackground={hasBackground} containerClass="">
      <p className="text-center text-lg mb-4">
        {sessionOpen ? 'La session est ouverte, déposez votre projet !' : 'La session est fermée Pour le moment.'}
      </p>

      <div className="flex items-center justify-center mb-40">
        <div className="space-x-8">
          <Link to="/creer-projet2" className="primary-btn btn-lg py-4 px-8">Créer Projet</Link>
          <button className={`primary-btn btn-lg py-4 px-8 ${!sessionOpen && 'disabled'}`} disabled={!sessionOpen} onClick={deposerProject}>
            Déposer Projet
          </button>
        </div>
      </div>

      <div className="text-center mb-8">
  {projects.length === 0 ? (
        <div>
        {header2 && ( // Utiliser header2 si défini
          <Headline
            header={header2} // Utiliser header2
            containerClass="max-w-5xl"
            titleClass="text-2xl sm:text-3xl mb-4"
          />
        )}
      </div>
  ) : (
    <div>
    {header && (
      <Headline
        header={header}
        containerClass="max-w-5xl"
        titleClass="text-2xl sm:text-3xl mb-4"
      />
    )}
  </div>
  )}
</div>




      <div className="flex items-stretch justify-center">
        {projects.length === 0 ? (
          <div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {projects.map((project, index) => (
              <div key={index} className="col-span-3 mx-auto flex w-full sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                <div className="card2 max-w-sm flex flex-col justify-between text-center">
                  <div className="px-4 py-8">
                    <h3 className="text-center text-xl font-semibold uppercase leading-6 tracking-wider mb-2">
                      {projectTitles[index]}
                    </h3>
                    <input type="checkbox" checked={project.isSelected} onChange={() => handleProjectSelection(index)} />
                  </div>
                  <div className="flex justify-center space-x-4 mb-4">
                    <button className=" primary-btn " onClick={() => confirmUpdate(projectTitles[index])}>Modifier</button>
                    <button className=" btn-danger p-2" onClick={() => confirmDelete(projectTitles[index])}>Supprimer</button>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals and Alerts */}
     {updateConfirmationTitle && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl mb-4">Confirmez-vous la modification du projet "{updateConfirmationTitle}" ?</p>
            <div className="flex justify-center">
              <button className="btn btn-danger mr-4" onClick={UpdateProject}>Confirmer</button>
              <button className="btn btn-secondary" onClick={cancelUpdate}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirmationTitle && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl mb-4">Confirmez-vous la suppression du projet "{deleteConfirmationTitle}" ?</p>
            <div className="flex justify-center">
              <button className="btn btn-danger mr-4" onClick={deleteProject}>Confirmer</button>
              <button className="btn btn-secondary" onClick={cancelDelete}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {deleteSuccess && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl mb-4">Projet supprimé avec succès !</p>
            <button className="btn btn-primary" onClick={() => setDeleteSuccess(false)}>OK</button>
          </div>
        </div>
      )}

      {deleteError && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl mb-4">Une erreur s'est produite lors de la suppression du projet.</p>
            <button className="btn btn-primary" onClick={() => setDeleteError(false)}>OK</button>
          </div>
        </div>
      )}
      
      {showNoProjectSelectedAlert && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl mb-4">Vous devez sélectionner au moins un projet.</p>
            <button className="primary-btn" onClick={cancelNoProjectAlert}>OK</button>
          </div>
        </div>
      )}
      
      {confirmationModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl mb-4">Confirmez-vous le dépôt des projets sélectionnés ?</p>
            <div className="flex justify-center">
              <button className="btn btn-danger mr-4" onClick={confirmDeposerProject}>Confirmer</button>
              <button className="btn btn-secondary" onClick={cancelDeposerProject}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {deposerSuccess && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl mb-4">Projets déposés avec succès !</p>
            <button className="primary-btn" onClick={() => setDeposerSuccess(false)}>OK</button>
          </div>
        </div>
      )}

      {deposerError && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl mb-4">Une erreur s'est produite lors du dépôt des projets.</p>
            <button className="primary-btn" onClick={() => setDeposerError(false)}>OK</button>
          </div>
        </div>
      )}
    </WidgetWrapper>
</>
    
  
   
  );
};

export default Pricing;


