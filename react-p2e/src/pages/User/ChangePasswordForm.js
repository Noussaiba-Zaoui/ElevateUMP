import React, { useState ,useEffect } from "react";
import changePassword from "../../services/changePassword";
import { useNavigate } from "react-router-dom";
import '../../styles/Signup.css';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChangePasswordForm = () => {

    //Regular expression for validating password
 const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmationPassword: ""
  });

  const [validPassword, setValidPassword] = useState(false);
  const [PasswordFocus, setPasswordFocus] = useState(false);
 
  const [errMsg, setErrMsg] = useState('');
 const [validMatch, setValidMatch] = useState(false);
 const [matchFocus, setMatchFocus] = useState(false);

  const [error, setError] = useState("");
  const [success,setSuccess] =useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    
    setValidPassword(PWD_REGEX.test(formData.newPassword));
    setValidMatch(formData.newPassword === formData.confirmationPassword);
  
  
}, [formData.newPassword,formData.confirmationPassword]);

useEffect(() => {
  setErrMsg('');
}, [formData.currentPassword,formData.newPassword,formData.confirmationPassword]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = PWD_REGEX.test(formData.newPassword);
    const v2 = formData.newPassword === formData.confirmationPassword;
    if (!v1 || !v2) {
      setErrMsg("Entrée invalide");
      return;
    }
    try {
      await changePassword(formData);
      // Password changed successfully, you can handle redirection or show a success message here
      setSuccess(true)
      setTimeout(() => {
        // Redirect to previous page after 3 seconds
        navigate(-1);
      }, 3000);
      console.log("Password changed successfully");
    } catch (err) {
      setError("une erreur est survenue , veuillez ressayer");
    }
  };

  return (

   
  <>

 
<main id="content" role="main" className="w-full  max-w-md mx-auto p-3 justify-center ">
<div className="mt-7 bg-white  rounded-xl shadow-lg   border-2 border-purple-400">
  <div className="p-4 sm:p-7">
    <div className="text-center">
      <h1 className="block text-2xl font-bold text-gray-800 ">Changer votre mot de passe</h1>
      
    </div>

    <div className="mt-5">
      <form onSubmit={handleSubmit}>
    
        <div className="grid gap-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-bold ml-1 mb-2 ">mot de passe actuelle</label>
            <div className="relative">
              <input
               type="password"
               id="currentPassword"
               name="currentPassword"
               value={formData.currentPassword}
               onChange={handleChange}
               required
               className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" />
            </div>
          
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-bold ml-1 mb-2 ">
              Nouveau mot de passe
    
                        <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validPassword || !formData.newPassword ? "hide" : "invalid"} />
              </label>
            <div className="relative">
              <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              onChange={handleChange}
              required
              className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"/>
            </div>
            <p id="pwdnote" className={PasswordFocus && !validPassword ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        De 8 à 24 caractères.<br />
                         Doit inclure des lettres majuscules et minuscules, un chiffre et un caractère spécial.<br />
                        Caractères spéciaux autorisés : <span aria-label="point d'exclamation">!</span> <span aria-label="arobase">@</span> <span aria-label="hashtag">#</span> <span aria-label="signe dollar">$</span> <span aria-label="pourcentage">%</span>
                        </p>
          
          </div>

          <div>
            <label htmlFor="confirmationPassword"  className="block text-sm font-bold ml-1 mb-2 ">
              Confirmer le nouveau mot de passe
              <FontAwesomeIcon icon={faCheck} className={validMatch ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validMatch || !formData.confirmationPassword ? "hide" : "invalid"} />
              </label>
            <div className="relative">
              <input
              type="password"
              id="confirmationPassword"
              name="confirmationPassword"
              value={formData.confirmationPassword}
              onChange={handleChange}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              required
               className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                 aria-describedby="email-error"/>
            </div>
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Doit correspondre au mot de passe saisie.
                            </p>
          
          </div>
          <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-[#9f71df] focus:outline-none focus:ring-2  focus:ring-offset-2 transition-all text-sm ">Changer le mot de passe</button>
        </div>
      </form>
      {success && 
      <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50  " role="alert">
           <span class="font-medium">Mot de passe changer avec succès</span> 
      </div>}
     
      {error && <div className="text-red-500">{error}</div>}
    
     
                   
    </div>
  </div>
</div>


</main>
  </>
   
  );
};

export default ChangePasswordForm;
