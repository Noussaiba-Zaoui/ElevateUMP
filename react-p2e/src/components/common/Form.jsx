import React, { useState , useEffect } from 'react';
import CreateProject from '../../services/CreateProject';
import GetVilles from '../../services/GetVilles'; // Importez votre service pour récupérer les villes
import { Modal } from 'antd';
import GetEtablissement from '../../services/GetEtablissement';
import { useNavigate } from "react-router-dom";
import { isExpired, useJwt } from 'react-jwt';
import { getToken } from '../../services/tokenService';
import LogoutButton from '../../layouts/LogoutBtn';

const Form = ({
  title,
  description,
  inputs,
  textareas,
  selectInputs,
  btn,
  btnPosition,
  containerClass,
  scanStudentCards,
}) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const [inputValues, setInputValues] = useState({});
  const [textareaValues, setTextareaValues] = useState(new Array(textareas?.length).fill(''));
  const [scanCarteEtudiantImages, setScanCarteEtudiantImages] = useState([]); // Nouvel état pour stocker les images sélectionnées
  const [selectValues, setSelectValues] = useState({});
  const [email,setEmail] = useState('');
  const [intituleProjet,setIntituleProjet] = useState('');
  const [ideeEntreprise,setIdeeEntreprise] = useState('');
  const [nomPrenom,setNomPrenom] = useState('');
  const [villeOrigine,setVilleOrigine] = useState('');
  const [telephonePortable,setTelephonePortable] = useState('');
  const [diplome,setDiplome] = useState('');
  const [members,setMembers] = useState('');
  const [domaineProjetEntreprise,setDomaineProjetEntreprise] = useState('');
  const [motivations,setMotivations] = useState('');
  const [developpezVotreIdee,setDeveloppezVotreIdee] = useState('');
  const [innovationTechnologique,setInnovationTechnologique] = useState('');
  const [viabiliteDurableteProjet,setViabiliteDurableteProjet] = useState('');
  const [originalite,setOriginalite] = useState('');
  const [impactEconomique,setImpactEconomique] = useState('');
  const [responsabilitesSocialesEnvironnementales,setResponsabilitesSocialesEnvironnementales] = useState('');
  const [perennitePotentielDeveloppement,setPerennitePotentielDeveloppement] = useState('');
  const [etablissement,setEtablissement] = useState('');
  const [filiere,setFiliere] = useState('');
  const [scanCarteEtudiantFile,setScanCarteEtudiantFile] = useState([]);
  const [villeOptions, setVilleOptions] = useState([]); // Ajoutez un état pour stocker les options de ville
  const [etablissementOptions, setEtablissementOptions] = useState([]); // Ajoutez un état pour stocker les options de ville
  const token = getToken();
  const { decodedToken } = useJwt(token);
  const loggedInUserEmail = decodedToken?.sub;




  
  useEffect(() => {
    const fetchEtablissements = async () => {
      try {
        const response = await GetEtablissement.getEtablissementsOrientalExceptUMP();
        setEtablissementOptions(response.data);
      } catch (error) {
        console.error('Error fetching etablissements:', error);
      }
    };

    fetchEtablissements();
  }, []);
  useEffect(() => {
    // Utilisez useEffect pour charger les options de ville lors du montage du composant
    const fetchVilles = async () => {
      try {
        const response = await GetVilles.getVillesOriental(); // Appelez la méthode pour récupérer les villes
        setVilleOptions(response.data); // Mettez à jour l'état avec les données reçues
      } catch (error) {
        console.error('Error fetching villes:', error);
      }
    };

    fetchVilles();
  }, []);

 const saveProject = (e) => {
  e.preventDefault();
  // Vérification de l'email
  if (!validateEmail(email)) {
    Modal.error({
      title: 'Erreur',
      content: 'Veuillez saisir une adresse e-mail valide.',
    });
    return;
  }
   // Vérification du numéro de téléphone portable
   if (!validatePhone(telephonePortable)) {
    Modal.error({
      title: 'Erreur',
      content: 'Veuillez saisir un numéro de téléphone portable valide.',
    });
    return;
  }
  const formData = new FormData();
  formData.append('email', email);
  formData.append('intituleProjet', intituleProjet);
  formData.append('ideeEntreprise', ideeEntreprise);
  formData.append('nomPrenom', nomPrenom);
  formData.append('villeOrigine', villeOrigine);
  formData.append('telephonePortable', telephonePortable);
  formData.append('diplome', diplome);
  formData.append('members', members);
  formData.append('domaineProjetEntreprise', domaineProjetEntreprise);
  formData.append('motivations', motivations);
  formData.append('developpezVotreIdee', developpezVotreIdee);
  formData.append('innovationTechnologique', innovationTechnologique);
  formData.append('viabiliteDurableteProjet', viabiliteDurableteProjet);
  formData.append('originalite', originalite);
  formData.append('impactEconomique', impactEconomique);
  formData.append('responsabilitesSocialesEnvironnementales', responsabilitesSocialesEnvironnementales);
  formData.append('perennitePotentielDeveloppement', perennitePotentielDeveloppement);
  formData.append('etablissement', etablissement);
  formData.append('filiere', filiere);

  for (let i = 0; i < scanCarteEtudiantFile.length; i++) {
    formData.append('scanCarteEtudiantFile', scanCarteEtudiantFile[i]);
  }



 // Vérification de l'unicité de l'intitulé du projet
 CreateProject.checkExistingProject(intituleProjet)
 .then((response) => {
  console.log(response.data);
     if (response.data) {
    
         // Si l'intitulé du projet existe déjà, afficher une erreur dans un modal
         Modal.error({
             title: 'Erreur',
             content: 'Un projet avec le même intitulé existe déjà.',
         });
     } else {
           // Enregistrer les fichiers dans le localStorage
           const uploadDir = 'uploads/';
           scanCarteEtudiantImages.forEach((fileURL, index) => {
             localStorage.setItem(`${uploadDir}${scanCarteEtudiantFile[index].name}`, fileURL);
           });

         CreateProject.createProject(formData)
             .then((response) => {
                 Modal.success({
                     title: 'Succès',
                     content: 'Projet créé avec succès !',
                     onOk: goBack, // Redirection to the previous page after modal is closed
                 });
             })
             .catch((error) => {
                 Modal.error({
                     title: 'Erreur',
                     content: `Erreur lors de la création du projet : ${error.message}`,
                 });
             });
     }
 })
 .catch((error) => {
     console.error('Error checking existing project:', error);
 });
 }

 const validateEmail = (email) => {
  // Expression régulière pour la validation de l'email
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
    return false;
  }
  if (email !== loggedInUserEmail) {
    Modal.error({
      title: 'Erreur',
      content: "L'email doit correspondre à l'email de l'utilisateur connecté.",
    });
    return false;
  }
  return true;
};


const validatePhone = (phone) => {
  // Expression régulière pour la validation du numéro de téléphone marocain
  const re = /^(?:(?:\+|00)212|0)[1-9]\d{8}$/;
  return re.test(phone);
};

const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  setScanCarteEtudiantFile(files);
  const files2 = e.target.files;
  if (files2) {
    // Stocker les fichiers localement en créant des URLs
    const fileURLs = [];

    // Pour chaque fichier, créer un objet URL et le stocker dans un tableau
    Array.from(files2).forEach((file) => {
      const fileURL = URL.createObjectURL(file);
      fileURLs.push(fileURL);
    });

    // Mettre à jour l'état avec les URLs des fichiers
    setScanCarteEtudiantImages(fileURLs);
  }
};
  // Update the value of the entry fields
  const changeInputValueHandler = (event, name) => {
    const { value } = event.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };



  // Update the textarea value
  const changeTextareaHandler = (value, index) => {
    setTextareaValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };



  // Function to handle value change in select inputs
  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setSelectValues({
      ...selectValues,
      [name]: value,
    });
  };

  // Function to handle file change for student card scanner
  const handleScanStudentCardChange = (event) => {
    const files = event.target.files;
    if (files) {
      setScanCarteEtudiantFile(files);
    }
  };
  

  return (
    <div>
    

<form id="contactForm" className={containerClass} onSubmit={saveProject} >
      <h2 className={`text-2xl font-bold ${description ? 'mb-2' : 'mb-4'}`}>Prêt à commencer ?</h2>
      <div className="mb-6">
        {/* Inputs */}
        <div className="mx-0 mb-1 sm:mb-4">
         
              <div key={`item-input`} className="mx-0 mb-1 sm:mb-4">
                <label className="pb-1 text-xs uppercase tracking-wider">
                  E-mail *
                </label>
                <input
                  type='text'
                  id='email'
                  name='email'
                  autoComplete='on'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Entrer votre email'
                  className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0"
                  required
                />
                <label className="pb-1 text-xs uppercase tracking-wider">
                  Intitule du projet *
                </label>
                <input
                  type='text'
                  id='intituleProjet'
                  name='intituleProjet'
                  autoComplete='on'
                  value={intituleProjet}
                  onChange={(e) => setIntituleProjet(e.target.value)}
                  placeholder='Intitule Projet'
                  className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0"
                  required
                />
                <label className="pb-1 text-xs uppercase tracking-wider">
                  Nom & prenom *
                </label>
                <input
                  type='text'
                  id='nomPrenom'
                  name='nomPrenom'
                  autoComplete='on'
                  value={nomPrenom}
                  onChange={(e) => setNomPrenom(e.target.value)}
                  placeholder='Nom Prenom'
                  className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0"
                  required
                />
                <label className="pb-1 text-xs uppercase tracking-wider">
                 Telephone portable *
                </label>
                <input
                  type='text'
                  id='telephonePortable'
                  name='telephonePortable'
                  autoComplete='on'
                  value={telephonePortable}
                  onChange={(e) => setTelephonePortable(e.target.value)}
                  placeholder='Numéro de Telephone'
                  className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0"
                  required
                />
                <label className="pb-1 text-xs uppercase tracking-wider">
                 Diplôme *
                </label>
                <input
                  type='text'
                  id='diplome'
                  name='diplome'
                  autoComplete='on'
                  value={diplome}
                  onChange={(e) => setDiplome(e.target.value)}
                  placeholder='Diplome'
                  className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0"
                  required
                />
                <label className="pb-1 text-xs uppercase tracking-wider">
                  Originalité *
                </label>
                <input
                  type='text'
                  id='originalite'
                  name='originalite'
                  autoComplete='on'
                  value={originalite}
                  onChange={(e) => setOriginalite(e.target.value)}
                  placeholder='Originalité'
                  className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0"
                  required
                />
                <label className="pb-1 text-xs uppercase tracking-wider">
                  Filiere *
                </label>
                <input
                  type='text'
                  id='filiere'
                  name='filiere'
                  autoComplete='on'
                  value={filiere}
                  onChange={(e) => setFiliere(e.target.value)}
                  placeholder='Filiere'
                  className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0"
                  required
                />
                
              </div>
        </div>
       

            <div key={`select`} className="mb-4">
              <label className="pb-1 text-xs uppercase tracking-wider block">
               Ville d’origine *
              </label>
              <select
                id='villeOrigine'
                name='villeOrigine'
                value={villeOrigine}
                onChange={(e) => setVilleOrigine(e.target.value)}
                className="w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md "
                required
              >
                <option value="" disabled>
                  Select...
                </option>
                {villeOptions.map((ville) => (
              <option key={ville.id} value={ville.nom}>
                {ville.nom}
              </option>
            ))}
              </select>
              <br />
              <br />
              <label className="pb-1 text-xs uppercase tracking-wider block">
               Etablissement *
              </label>
              <select
                id='etablissement'
                name='etablissement'
                value={etablissement}
                onChange={(e) => setEtablissement(e.target.value)}
                className="w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md "
                required
              >
                <option value="" disabled>
                  Select...
                </option>
                {etablissementOptions.map((etablissement) => (
              <option key={etablissement.id} value={etablissement.nom}>
                {etablissement.nom}
              </option>
            ))}
              </select>
            </div>
      
            <div key={`textarea`} className="mb-4">
              <label className="pb-1 text-xs uppercase tracking-wider block">
              l'idée de l'entreprise *
              </label>
              <textarea
                id='ideeEntreprise'
                name='ideeEntreprise'
                cols='30'
                rows='5'
                value={ideeEntreprise}
                onChange={(e) => setIdeeEntreprise(e.target.value)}
                placeholder='Idée Entreprise...'
                className="w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md "
                required
              />
              
            </div>
            <div key={`textarea`} className="mb-4">
              <label className="pb-1 text-xs uppercase tracking-wider block">
              Noms & Prénoms autres *
              </label>
              <textarea
                id='members'
                name='members'
                cols='30'
                rows='5'
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                placeholder='Noms & Prénoms...'
                className="w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md "
                required
              />
              
            </div>
            <div key={`textarea`} className="mb-4">
              <label className="pb-1 text-xs uppercase tracking-wider block">
              Domaine du projet de l'entreprise *
              </label>
              <textarea
                id='domaineProjetEntreprise'
                name='domaineProjetEntreprise'
                cols='30'
                rows='5'
                value={domaineProjetEntreprise}
                onChange={(e) => setDomaineProjetEntreprise(e.target.value)}
                placeholder='Domaine du projet...'
                className="w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md "
                required
              />
              
            </div>
            <div key={`textarea`} className="mb-4">
              <label className="pb-1 text-xs uppercase tracking-wider block">
              Motivations *
              </label>
              <textarea
                id='motivations'
                name='motivations'
                cols='30'
                rows='5'
                value={motivations}
                onChange={(e) => setMotivations(e.target.value)}
                placeholder='Motivations...'
                className="w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md "
                required
              />
              
            </div>
            <div key={`textarea`} className="mb-4">
              <label className="pb-1 text-xs uppercase tracking-wider block">
              Développez votre idée *
              </label>
              <textarea
                id='developpezVotreIdee'
                name='developpezVotreIdee'
                cols='30'
                rows='5'
                value={developpezVotreIdee}
                onChange={(e) => setDeveloppezVotreIdee(e.target.value)}
                placeholder='Idée...'
                className="w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md "
                required
              />
              
            </div>
            <div key={`textarea`} className="mb-4">
              <label className="pb-1 text-xs uppercase tracking-wider block">
              Innovation technologique et/ou dans les services offerts *
              </label>
              <textarea
                id='innovationTechnologique'
                name='innovationTechnologique'
                cols='30'
                rows='5'
                value={innovationTechnologique}
                onChange={(e) => setInnovationTechnologique(e.target.value)}
                placeholder='Innovation...'
                className="w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md "
                required
              />
              
            </div>
            <div key={`textarea`} className="mb-4">
              <label className="pb-1 text-xs uppercase tracking-wider block">
              Viabilité et durabilité du projet *
              </label>
              <textarea
                id='viabiliteDurableteProjet'
                name='viabiliteDurableteProjet'
                cols='30'
                rows='5'
                value={viabiliteDurableteProjet}
                onChange={(e) => setViabiliteDurableteProjet(e.target.value)}
                placeholder='Viabilité...'
                className="w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md "
                required
              />
              
            </div>
            <div key={`textarea`} className="mb-4">
              <label className="pb-1 text-xs uppercase tracking-wider block">
              Impact économique du projet *
              </label>
              <textarea
                id='impactEconomique'
                name='impactEconomique'
                cols='30'
                rows='5'
                value={impactEconomique}
                onChange={(e) => setImpactEconomique(e.target.value)}
                placeholder='Impact...'
                className="w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md "
                required
              />
              
            </div>
            <div key={`textarea`} className="mb-4">
              <label className="pb-1 text-xs uppercase tracking-wider block">
              Responsabilités sociale et environnementale *
              </label>
              <textarea
                id='responsabilitesSocialesEnvironnementales'
                name='responsabilitesSocialesEnvironnementales'
                cols='30'
                rows='5'
                value={responsabilitesSocialesEnvironnementales}
                onChange={(e) => setResponsabilitesSocialesEnvironnementales(e.target.value)}
                placeholder='Responsabilités...'
                className="w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md "
                required
              />
              
            </div>
            <div key={`textarea`} className="mb-4">
              <label className="pb-1 text-xs uppercase tracking-wider block">
               Pérennité : potentiel de développement *
              </label>
              <textarea
                id='perennitePotentielDeveloppement'
                name='perennitePotentielDeveloppement'
                cols='30'
                rows='5'
                value={perennitePotentielDeveloppement}
                onChange={(e) => setPerennitePotentielDeveloppement(e.target.value)}
                placeholder='Pérennité...'
                className="w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md "
                required
              />
              
            </div>
          
       
      
          <div className="mx-0 mb-1 sm:mb-4">
            <label  className="scan-card-label">
             Enregistrer vos carte d'étudiant *
            </label>
            <input
              type="file"
              id='scanCarteEtudiantFile'
              name='scanCarteEtudiantFile'
              //value={scanCarteEtudiant}
              accept="image/*" 
              onChange={handleFileChange}
              multiple // Permet la sélection multiple de fichiers
              className="input-file"
              required
            />
          </div>
      </div>
        <div className={`${btnPosition === 'left' ? 'text-left' : btnPosition === 'right' ? 'text-right' : 'text-center'}`}>
          <button
            type='submit'
            className="btn-custom inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg sm:mb-0"
          >
            Enregistrer
          </button>
        </div>
    </form>
    </div>
  
  );
};

export default Form;
