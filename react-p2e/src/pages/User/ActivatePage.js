// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import VerificationInput from "react-verification-input";
// import "./ActivationPage.css";
// import api from "../../api/axios";
// import { getToken } from "../../services/tokenService.js";
// import {useJwt} from 'react-jwt';


// const ActivationPage = () => {
//     const navigate = useNavigate();
//     const [verificationCode, setVerificationCode] = useState('');
//     const [resend, setResend] = useState(false);
//     const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds


   

//     const token = getToken();
  
   

//   const { decodedToken } = useJwt(token);

//   useEffect(() => {
//       if (decodedToken) {
//           console.log('Decoded token:', decodedToken); // Debugging line
//       } else {
//           console.error("Failed to decode token or token is missing.");
//       }
//   }, [decodedToken]);

//   // useEffect(() => {
//   //   console.log("Extracted email:", email); // Debugging line
//   // }, [email]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.get(`/api/v1/auth/activate-account?token=${verificationCode}`);

//       navigate("/login");
//     } catch (error) {
//       console.error("Error activating account:", error);
//     }
//   };

//   const handleResend = async () => {

//     if (!decodedToken || !decodedToken.sub) {
//       console.error("Decoded token or email is not available.");
//       return;
//   }
//     try {
//       console.log(decodedToken?.sub)
//       setResend(true);
     
//       await api.get(`/api/v1/auth/resend-code?email=${decodedToken?.sub}`);
//       setResend(false);
//       setTimeLeft(900); // Reset timer
//     } catch (error) {
//       console.error("Error resending code:", error);
//       setResend(false);
//     }
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   return (
//     <>
     
   
//     {/* <div className="activation-container">
//       <h1>Merci d'entrer le code de vérification reçu par email pour activer votre compte</h1>
//       <form onSubmit={handleSubmit} className="verification-form">
//         <VerificationInput
//           length={6}
//           onComplete={(value) => setVerificationCode(value)}
//         />
//         <button type="submit" className="activate-button">Activez mon compte</button>
//       </form>
//        <div className="timer">Le code va expirer dans : {formatTime(timeLeft)}</div> 
//       <button onClick={handleResend} className="resend-button" disabled={resend}>
//         {resend ? "Envoi en cours..." : "Renvoyer un code"}
//       </button>
//     </div> */}


// <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
// <div className="mt-7 bg-white  rounded-xl shadow-lg   border-2 border-purple-400">
//   <div className="p-4 sm:p-7">
//     <div className="text-center">
//       <h1 className="block text-md font-bold text-gray-800 mb-10 ">Merci d'entrer le code de vérification reçu par email pour activer votre compte</h1>
      
//     </div>

//     <div className="mt-5">
//       <form onSubmit={handleSubmit}>
    
//         <div className="grid gap-y-4">
//           <div className="inline-flex justify-center items-center gap-2 mb-30 ">
        
//               <VerificationInput
//               length={6}
//               onComplete={(value) => setVerificationCode(value)}
//             />
//           </div>

         

          
    
//         <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#7654a7] text-white hover:bg-[#9f71df] focus:outline-none focus:ring-2  focus:ring-offset-2 transition-all text-sm">Activez mon compte</button>
//           <button onClick={handleResend} className="resend-button" disabled={resend}>
//            {resend ? "Envoi en cours..." : "Renvoyer un code"}
//          </button>
//          <p className="py-3 px-4 inline-flex justify-center items-center gap-2   text-sm">Le code va expirer dans 15 minutes.</p>
      
        
//         </div>
//       </form>
      
     
//       {/* {error && <div className="text-red-500">{error}</div>} */}
    
     
                   
//     </div>
//   </div>
// </div>


// </main>
//     </>
//   );
// }

// export default ActivationPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VerificationInput from "react-verification-input";
import "./ActivationPage.css";
import api from "../../api/axios";
import { getToken } from "../../services/tokenService.js";
import { useJwt} from 'react-jwt';

const ActivationPage = () => {
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState('');
    const [resend, setResend] = useState(false);
    


    const token = getToken();
    const { decodedToken } = useJwt(token);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [timeLeft, setTimeLeft] = useState(0);
   


    useEffect(() => {
      const timer = setInterval(() => {
          setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
  }, []);


  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.get(`/api/v1/auth/activate-account?token=${verificationCode}`);
            setErrorMessage('');
            setSuccessMessage("Compte activé avec succès");
            navigate("/login");
        } catch (error) {
          console.error("Error activating account:", error);
          if (error.response && error.response.data) {
              setErrorMessage(error.response.data);
          } else {
              setErrorMessage("Une erreur inattendue s'est produite.");
          }
        }
    };

    const handleResend = async () => {
        if (!decodedToken || !decodedToken.sub) {
            console.error("Decoded token or email is not available.");
            return;
        }
        try {
            console.log(decodedToken?.sub);
            setResend(true);
            await api.get(`/api/v1/auth/resend-code?email=${decodedToken?.sub}`);
            setResend(false);
          
        } catch (error) {
            console.error("Error resending code:", error);
            setResend(false);
        }
    };

 
    return (
        <>
            <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
                <div className="mt-7 bg-white rounded-xl shadow-lg border-2 border-purple-400">
                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                            <h1 className="block text-md font-bold text-gray-800 mb-10">
                                Merci d'entrer le code de vérification reçu par email pour activer votre compte
                            </h1>
                        </div>

                        <div className="mt-5">
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-y-4">
                                    <div className="inline-flex justify-center items-center gap-2 mb-30">
                                        <VerificationInput length={6} onComplete={(value) => setVerificationCode(value)} />
                                    </div>
                                    <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#7654a7] text-white hover:bg-[#9f71df] focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm">
                                        Activez mon compte
                                    </button>
                                    <button type="button" onClick={handleResend} className="resend-button" disabled={resend}>
                                        {resend ? "Envoi en cours..." : "Renvoyer un code"}
                                    </button>
                                    {/* <p className="py-3 px-4 inline-flex justify-center items-center gap-2 text-sm">
                                        Le code va expirer dans : {formatTime(timeLeft)}
                                    </p> */}
                                   
                                   {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ActivationPage;
