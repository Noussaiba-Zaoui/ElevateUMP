 import { useRef, useState, useEffect} from "react";
 import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import '../../styles/Signup.css'
 import { Link } from "react-router-dom";
 import api from "../../api/axios";
 import login from "../../assets/website/login.png"
 import { TailSpin } from 'react-loader-spinner';
import './ActivationPage.css';
 //Regular expression for validating the username
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
 //Regular expression for validating password
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
 //Regular expression for validating the email address 
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



const Signup =() =>{

      //Refs for DOM elements 
     const firstnameRef = useRef();
     const lastnameRef = useRef();
     const emailRef = useRef();
     const emailAcadRef = useRef();
     const errRef = useRef();

      //State variables for form fields and their validity
     //firstname:
     const [firstname, setfirstname] = useState('');
     const [validfirstname, setValidfirstname] = useState(false);
     const [firstnameFocus,setfirstnameFocus] = useState(false);

     //lastname:
     const [lastname, setlastname] = useState('');
     const [validlastname, setValidlastname] = useState(false);
     const [lastnameFocus,setlastnameFocus] = useState(false);

     //Email:
     const [email, setEmail] = useState('');
     const [validEmail, setValidEmail] = useState(false);
     const [EmailFocus,setEmailFocus] = useState(false);

     //Academic Email:
     const [emailAcad, setemailAcad] =useState('')
     const [validemailAcad, setValidemailAcad] = useState(false);
     const [emailAcadFocus,setemailAcadFocus] = useState(false);

     const [password, setPassword] = useState('');
     const [validPassword, setValidPassword] = useState(false);
     const [PasswordFocus, setPasswordFocus] = useState(false);
    
    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [loading, setLoading] = useState(false); // New loading state
    useEffect(() => {
        emailRef.current.focus();
    }, [])

  

    useEffect(() => {
      
        setValidfirstname(USER_REGEX.test(firstname));
    }, [firstname]);
   
    useEffect(() => {
      
        setValidlastname(USER_REGEX.test(lastname));
    }, [lastname]);
   
    useEffect(() => {
       
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);
   

    useEffect(() => {
       
        setValidemailAcad(EMAIL_REGEX.test(emailAcad));
    }, [emailAcad]);
   
    useEffect(() => {
   
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPassword);
      
      
    }, [password,matchPassword]);
   

  
    useEffect(() => {
        setErrMsg('');
    }, [firstname, lastname, email, emailAcad, password, matchPassword]);




    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("handle submit called")
        const v1 = USER_REGEX.test(firstname);
        const v2 = USER_REGEX.test(lastname);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = EMAIL_REGEX.test(emailAcad);
        const v5 = PWD_REGEX.test(password);
        const v6 = password === matchPassword;
        if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6) {
          setErrMsg("Entree invalide");
          return;
        }
        setLoading(true); // Set loading to true
        try {
          const response = await api.post("/api/v1/auth/register", {
            firstname,
            lastname,
            email,
            emailAcad,
            password,
          });
          console.log(response.data.access_token)
          localStorage.setItem("access_token",response.data.access_token)
         
          setSuccess(true);
        
        } catch (err) {
          if (!err?.response) {
            setErrMsg("Aucune réponse du serveur");
          } else if (err.response?.status === 409) {
            setErrMsg("email existe déjà");
          } else {
            setErrMsg("Échec de l'inscription");
          }
          errRef.current.focus();
        }finally {
         setLoading(false); // Set loading to false
        }
      };

    return(

       
         <>
             {success && (
                 <div className="popup-overlay fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center animate-fadeIn">
                     <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-8 rounded-md shadow-lg h-auto w-96 relative flex flex-col justify-center items-center animate-slideInUp text-white">
                         <div className="flex flex-col items-center">
                             <svg className="w-16 h-16 mb-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 2L18 2M12 2V22M6 22H18M6 2L18 22" />
                             </svg>
                             <h2 className="text-3xl text-white font-bold mb-4 text-center">
                                 Merci de vous être inscrit!
                             </h2>
                             <p className="text-center text-lg mb-6">
                                 Votre demande est en cours de traitement. Nous vous informerons par email du résultat dans les plus brefs délais.
                             </p>
                         </div>
                         <button className="bg-white hover:bg-gray-200 text-purple-500 font-semibold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
                             <Link to="/" className="text-purple-500 hover:text-purple-700">Page d'accueil</Link>
                         </button>
                     </div>
                 </div>
             )}




             {loading && (
       <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
         <TailSpin color="#00BFFF" height={80} width={80} />
       </div>
     )}

     <div className="h-full bg-white-900 ">
   
   <div className="mx-auto">
     <div className="flex justify-left ">
       <div className="w-full xl:w-3/4 lg:w-12/12 flex">


            <img className="w-full h-screen bg-white  hidden lg:block ml-20 lg:w-9/12 bg-cover"
                 src={login}/>

            <div className="w-full lg:ml-40 lg:w-11/12 bg-white  p-5 rounded-lg lg:rounded-l-none">
          <p ref={errRef} className={errMsg?"errmsg":
          "offscreen"} aria-live="assertive">{errMsg}</p>

            <h3 className="py-4 text-4xl font-semibold text-center text-primary ">Créer un compte</h3>
            <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white  rounded">
              <div className="mb-2 md:flex md:justify-between">
                <div className="mb-2 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-bold text-gray-700 " htmlFor="firstname">
                  Prénom:<span className="text-red-500">*</span>
                  <FontAwesomeIcon icon={faCheck} className={validfirstname ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validfirstname || !firstname ? "hide" : "invalid"} />
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                  id="firstname"
                  ref={firstnameRef}
                  autoComplete="off"
                  onChange={(e) => setfirstname(e.target.value)}
                  required
                  aria-invalid={validfirstname ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setfirstnameFocus(true)}
                  onBlur={() => setfirstnameFocus(false)}
                    placeholder="First Name"
                  />
                   <p id="uidnote" className={firstnameFocus && firstname && !validfirstname ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                           De 4 à 24 caractères.<br />
                          Doit commencer par une lettre.<br />
                          Lettres, chiffres, traits de soulignement, tirets autorisés.
                      </p>
                </div>
                <div className="md:ml-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700 " htmlFor="lastname">
                  Nom:<span className="text-red-500">*</span>
                  <FontAwesomeIcon icon={faCheck} className={validlastname ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validlastname || !lastname ? "hide" : "invalid"} />
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                  id="lastname"
                  ref={lastnameRef}
                  autoComplete="off"
                  onChange={(e) => setlastname(e.target.value)}
                  required
                  aria-invalid={validlastname ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setlastnameFocus(true)}
                  onBlur={() => setlastnameFocus(false)}
                    placeholder="Last Name"
                  />
                  <p id="uidnote" className={lastnameFocus && lastname && !validlastname ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                           De 4 à 24 caractères.<br />
                          Doit commencer par une lettre.<br />
                          Lettres, chiffres, traits de soulignement, tirets autorisés.
                      </p>
                </div>
              </div>
              <div className="mb-2">
           
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                Email:<span className="text-red-500">*</span>
                  <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  ref={emailRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  placeholder="nom@gmail.com"
                />
                <p id="uidnote" className={EmailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          Adresse e-mail valide.<br />
                          Ne doit pas contenir d'espaces.<br />
                          Doit contenir un @ suivi d'un domaine valide."
                      </p>
             
             
              </div>

              <div className="mb-2">
           
             <label className="block mb-2 text-sm font-bold text-gray-700 " htmlFor="emailAcad">
             Email académique:
                  <FontAwesomeIcon icon={faCheck} className={validemailAcad ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validemailAcad || !emailAcad ? "hide" : "invalid"} />
             </label>
             <input
               className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
               type="email"
              id="emailAcad"
              ref={emailAcadRef}
              autoComplete="off"
              onChange={(e) => setemailAcad(e.target.value)}
              
              aria-invalid={validemailAcad ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setemailAcadFocus(true)}
              onBlur={() => setemailAcadFocus(false)}
               placeholder="nom@ump.ac.ma"
             />
             <p id="uidnote" className={emailAcadFocus && emailAcad && !validemailAcad ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          Adresse e-mail académique valide.<br />
                          Ne doit pas contenir d'espaces.<br />
                          Doit contenir un @ suivi d'un domaine valide."
                      </p>
          
          
           </div>
              <div className="mb-2">
  <label className="block mb-2 text-sm font-bold text-gray-700 " htmlFor="password" >
    Mot de passe:<span className="text-red-500">*</span>
    <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
    <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
  </label>
  <input
    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    type="password"
    id="password"
    onChange={(e) => setPassword(e.target.value)}
    required
    aria-invalid={validPassword ? "false" : "true"}
    aria-describedby="pwdnote"
    onFocus={() => setPasswordFocus(true)}
    onBlur={() => setPasswordFocus(false)}
    placeholder="******************"
  />
  <p id="pwdnote" className={PasswordFocus && !validPassword ? "instructions" : "offscreen"}>
    <FontAwesomeIcon icon={faInfoCircle} />
    De 8 à 24 caractères.<br />
    Doit inclure des lettres majuscules et minuscules, un chiffre et un caractère spécial.<br />
    Caractères spéciaux autorisés : <span aria-label="point d'exclamation">!</span> <span aria-label="arobase">@</span> <span aria-label="hashtag">#</span> <span aria-label="signe dollar">$</span> <span aria-label="pourcentage">%</span>
  </p>
</div>
<div className="mb-2">
  <label className="block mb-2 text-sm font-bold text-gray-700 " htmlFor="confirm_pwd">
    Confirmer le mot de passe:
    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
  </label>
  <input
    className="w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    type="password"
    id="confirm_pwd"
    onChange={(e) => setMatchPassword(e.target.value)}
    required
    aria-invalid={validMatch ? "false" : "true"}
    aria-describedby="confirmnote"
    onFocus={() => setMatchFocus(true)}
    onBlur={() => setMatchFocus(false)}
    placeholder="******************"
  />
  <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
    <FontAwesomeIcon icon={faInfoCircle} />
    Doit correspondre au mot de passe saisie.
  </p>
</div>

              <div className="mb-4 text-center">
                <button 
                  type="submit"
                  disabled={!validfirstname || !validlastname || !validEmail || !validemailAcad || !validPassword || !validMatch}
                  className="w-full px-4 py-2 font-bold text-white bg-primary rounded-full hover:bg-purple-700  focus:outline-none focus:shadow-outline"
                >
                  Sign Up
                </button>
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center">
              <span className="inline-block text-sm align-baseline">
                  <p>Avez vous déjà un compte?</p>
                  <p className="text-blue-500 hover:text-blue-800"><Link to="/login">Se connecter</Link></p>
              </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
          </>
         
     )
 }

export default  Signup;