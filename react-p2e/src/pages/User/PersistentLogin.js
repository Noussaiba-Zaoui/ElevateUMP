// import { Outlet , useLocation} from "react-router-dom";
// import { useState, useEffect } from "react";
// import { isExpired,useJwt } from "react-jwt";
// import useAuth from "../../hooks/useAuth";
// import LogoutButton from "../../layouts/LogoutBtn";
// import "../../styles/PersistentLogin.css"
// const PersistLogin = () => {
//     const [isLoading, setIsLoading] = useState(true);
//     const { auth, persist } = useAuth();
 
//     const [showPopup, setShowPopup] = useState(false); 
//     const location = useLocation();

//     // useEffect(() => {

//     //     if(isExpired(auth.accessToken)){
//     //         console.log("token expired");
           
//     //             setShowPopup(true);
                
           
//     //     }


    
//     //     if (!auth?.accessToken && persist) {
//     //         console.log(auth?.accessToken)
//     //         // If there is no access token and the user wants to persist, set isLoading to false
//     //         setIsLoading(true);
//     //     } else {
//     //         // Otherwise, there is either an access token or the user does not want to persist, so also set isLoading to false
//     //         setIsLoading(false);
//     //     }
//     // }, [auth, persist]);


//     useEffect(() => {
//         const handleExpirationCheck = () => {
//             if (isExpired(auth.accessToken)) {
//                 console.log("token expired");
//                 setShowPopup(true);
//             }
//         };

//         // Trigger expiration check when location changes
//         handleExpirationCheck();
//     }, [auth.accessToken, location]);

    
//       useEffect(() => {
//         if (!auth?.accessToken && persist) {
//           setIsLoading(true);
//         } else {
//           setIsLoading(false);
//         }
//       }, [auth, persist]);

   

//     return (
//         <>
//             {!persist
//                 ? <Outlet />
//                 : isLoading
//                     ? <p>Loading...</p>
//                     : <Outlet />
//             }
//             {/* Popup */}
//             {showPopup && (
//                 <div className="popup-overlay fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white p-8 rounded-md shadow-md h-70 w-96 relative flex flex-col justify-center items-center">
//                         <h2 className="text-2xl font-bold mb-6 text-center">Votre session a expiré</h2>
//                         <LogoutButton/>
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

// export default PersistLogin;

// import { Outlet, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { isExpired } from "react-jwt";
// import useAuth from "../../hooks/useAuth";
// import LogoutButton from "../../layouts/LogoutBtn";
// import "../../styles/PersistentLogin.css";

// const PersistLogin = () => {
//     const [isLoading, setIsLoading] = useState(true);
//     const { auth, persist } = useAuth();
//     const [showPopup, setShowPopup] = useState(false);
//     const location = useLocation();

//     useEffect(() => {
//         // Check token expiration periodically (e.g., every minute)
//         const intervalId = setInterval(() => {
//             if (auth.accessToken && isExpired(auth.accessToken)) {
//                 console.log("token expired");
//                 setShowPopup(true);
//             }
//         }, 60000); // 1 minute interval

//         return () => clearInterval(intervalId);
//     }, [auth.accessToken]);

//     useEffect(() => {
//         if (!auth?.accessToken && persist) {
//             setIsLoading(true);
//         } else {
//             setIsLoading(false);
//         }
//     }, [auth, persist]);

//     return (
//         <>
//             {!persist
//                 ? <Outlet />
//                 : isLoading
//                     ? <p>Loading...</p>
//                     : <Outlet />
//             }
//             {/* Popup */}
//             {showPopup && (
//                 <div className="popup-overlay fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white p-8 rounded-md shadow-md h-70 w-96 relative flex flex-col justify-center items-center">
//                         <h2 className="text-2xl font-bold mb-6 text-center">Votre session a expiré</h2>
//                         <LogoutButton />
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// export default PersistLogin;



import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { isExpired } from "react-jwt";
import useAuth from "../../hooks/useAuth";
import LogoutButton from "../../layouts/LogoutBtn";
import "../../styles/PersistentLogin.css";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { auth, persist } = useAuth();
    const [showPopup, setShowPopup] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Function to check if the token is expired
        const checkTokenExpiration = () => {
            if (auth.accessToken && isExpired(auth.accessToken)) {
                console.log("token expired");
                setShowPopup(true);
            }
        };

        // Check token expiration immediately on component mount
        checkTokenExpiration();

        // Check token expiration periodically (e.g., every minute)
        const intervalId = setInterval(checkTokenExpiration, 60000); // 1 minute interval

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [auth.accessToken]);

    useEffect(() => {
        if (!auth?.accessToken && persist) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [auth, persist]);

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
            {/* Popup */}
            {showPopup && (
                <div className="z-50 popup-overlay fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-md shadow-md h-70 w-96 relative flex flex-col justify-center items-center">
                        <h2 className="text-2xl font-bold mb-6 text-center">Votre session a expiré</h2>
                        <LogoutButton />
                    </div>
                </div>
            )}
        </>
    );
}

export default PersistLogin;
