

// Login.js

import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import {login} from "../../services/authService";
import getUserRoles from "../../services/getUserRoles";
import signup from "../../assets/website/signup.png"
import Typewriter from 'typewriter-effect';
const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    // useEffect(() => {
    //     localStorage.setItem("persist", persist);
    // }, [persist])

    useEffect(() => {
        // Set persist to true by default
        setPersist(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
           const { access_token: accessToken } = await login(email, password);
          
           //const response= await login(email, password);
            const userRoles = await getUserRoles(email);
            console.log(accessToken)
            localStorage.setItem("access_token",accessToken)
            setAuth({ email, password, userRoles, accessToken });
            if (persist) {
                localStorage.setItem("auth", JSON.stringify({ email,userRoles,accessToken }));
            }

            // Redirect the user based on their role
            if (userRoles.includes('ADMIN')) {
                navigate('/homeAdmin', { replace: true });
            } 
            else if (userRoles.includes('COMMISSION')) {
              navigate('/commissionHome', { replace: true });
          }

          else if (userRoles.includes('RESPCALENDER')) {
            navigate('/RespHome', { replace: true });
        }
            else if (userRoles.includes('CONDIDAT')) {
              navigate('/condidatHome', { replace: true });
          }
            else if (userRoles.includes('PARTICIPANT')) {
                navigate('/participantHome', { replace: true });
            } else if (userRoles.includes('USER')) {
                navigate('/userPage', { replace: true });
            } else {
                // Redirect to a default route if the role is unknown
                navigate(from, { replace: true });
            }

            setEmail('');
            setPassword('');
        } catch (err) {
            console.error(err);
            if (!err?.response) {
                setErrMsg('Aucune réponse du serveur');
            } else if (err.response?.status === 400) {
                setErrMsg("email ou mot de passe manquant");
            } else if (err.response?.status === 401) {
                setErrMsg("email ou mot de passe incorrect");
            } else {
                setErrMsg('La connexion a échoué');
            }
            errRef.current.focus();
        }
    };

    return (


        <div className="h-full w-full bg-white-900 ">

        <div className="mx-auto">
          <div className="flex justify-left ">
              <div className="w-full xl:w-3/4 lg:w-11/12 flex">

                  {/*<div className="typewriter-text hidden lg:block lg:w-5/12">*/}
                  {/*<Typewriter*/}
                  {/*options={{*/}
                  {/*    strings: ['Bienvenue', 'Chez','P2E'],*/}
                  {/*    autoStart: true,*/}
                  {/*    loop: true,*/}
                  {/*}}*/}
                  {/*/>*/}
                  {/*</div>*/}

                  <img className="w-full h-screen bg-white  lg:block ml-20 lg:w-5/12 bg-cover"
                       src={signup}/>

                  <div className="h-full w-full bg-white-900  flex ml-20 items-center justify-center">
                      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                      <form onSubmit={handleLogin} className="px-8 pt-6 pb-8 mb-4 bg-white  rounded">
                          <div className="mb-4">
                              <div className="py-4 text-4xl font-semibold text-center text-primary ">Se connecter</div>
                              <label className="block mb-2 text-sm font-bold text-gray-700 "
                                     htmlFor="email">Email:</label>
                              <input
                                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                  type="email"
                                  id="email"
                                  ref={emailRef}
                                  autoComplete="off"
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                  value={email}
                              />
                          </div>
                          <div className="mb-4">
                              <label className="block mb-2 text-sm font-bold text-gray-700 "
                                     htmlFor="password">
                                  Mot de passe:
                              </label>
                              <input
                                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                  type="password"
                                  id="password"
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                                  value={password}
                              />
                          </div>

                          <div className="mb-6 text-center">
                              <button
                                  type="submit"
                                  className="w-full px-4 py-2 font-bold text-white bg-primary rounded-full hover:bg-purple-700  focus:outline-none focus:shadow-outline">Se
                                  connecter
                              </button>
                          </div>
                          {/* <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Se rappeler de moi</label>
                </div> */}
                          <hr className="mb-6 border-t"/>
                          <div className="text-center">
                  <span className="inline-block text-sm align-baseline">
                      <p> Vous n'avez pas encore de compte?</p>
                      <p className="text-blue-500  hover:text-blue-800">
                        <Link to="/signup">Créer un compte</Link></p>
                  </span>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
        </div>
        </div>

        // <section>
        //     <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        //     <h1>Se connecter:</h1>
        //     <form onSubmit={handleLogin}>
        //         <label htmlFor="email">Email:</label>
        //         <input
        //             type="email"
        //             id="email"
        //             ref={emailRef}
        //             autoComplete="off"
        //             onChange={(e) => setEmail(e.target.value)}
        //             required
        //             value={email}
        //         />
        //         <label htmlFor="password">Mot de passe:</label>
        //         <input
        //             type="password"
        //             id="password"
        //             onChange={(e) => setPassword(e.target.value)}
        //             required
        //             value={password}
        //         />
        //         <button type="submit">Se connecter</button>
              
        //         <div className="persistCheck">
        //             <input
        //                 type="checkbox"
        //                 id="persist"
        //                 onChange={togglePersist}
        //                 checked={persist}
        //             />
        //             <label htmlFor="persist">Trust This Device</label>
        //         </div>
        //     </form>
        //     <p>
        //         Vous n'avez pas encore de compte?<br />
        //         <span className="line">
        //             <Link to="/signup">Créer un compte</Link>
        //         </span>
        //     </p>
          
        // </section>
    );
};

export default Login;